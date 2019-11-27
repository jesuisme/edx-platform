"""
Student Views
"""

import datetime
import json
import logging
import uuid
import warnings
from collections import namedtuple
from django.contrib.sites.models import Site
import analytics
import dogstats_wrapper as dog_stats_api
from bulk_email.models import Optout
from courseware.courses import get_courses, sort_by_announcement, sort_by_start_date
from django.conf import settings
from django.contrib import messages
from django.contrib.auth import login as django_login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import AnonymousUser, User
from django.contrib.auth.views import password_reset_confirm
from django.core import mail
from django.urls import reverse
from django.core.validators import ValidationError, validate_email
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import Signal, receiver
from django.http import Http404, HttpResponse, HttpResponseBadRequest, HttpResponseForbidden, HttpResponseRedirect
from django.shortcuts import redirect
from django.template.context_processors import csrf
from django.template.response import TemplateResponse
from django.utils.encoding import force_bytes, force_text
from django.utils.http import base36_to_int, urlsafe_base64_encode
from django.utils.translation import get_language, ungettext
from django.utils.translation import ugettext as _
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_POST
from eventtracking import tracker
from ipware.ip import get_ip
# Note that this lives in LMS, so this dependency should be refactored.
from notification_prefs.views import enable_notifications
from opaque_keys import InvalidKeyError
from opaque_keys.edx.keys import CourseKey
from pytz import UTC
from requests import HTTPError
from six import text_type, iteritems
from social_core.exceptions import AuthAlreadyAssociated, AuthException
from social_django import utils as social_utils
from xmodule.modulestore.django import modulestore
from django.contrib.auth import logout
import openedx.core.djangoapps.external_auth.views
import third_party_auth
import track.views
from course_modes.models import CourseMode
from edxmako.shortcuts import render_to_response, render_to_string
from entitlements.models import CourseEntitlement
from openedx.core.djangoapps import monitoring_utils
from openedx.core.djangoapps.catalog.utils import (
    get_programs_with_type,
)
from openedx.core.djangoapps.ace_common.template_context import get_base_template_context
from openedx.core.djangoapps.embargo import api as embargo_api
from openedx.core.djangoapps.external_auth.login_and_register import register as external_auth_register
from openedx.core.djangoapps.lang_pref import LANGUAGE_KEY
from openedx.core.djangoapps.user_api.accounts.utils import is_secondary_email_feature_enabled
from openedx.core.djangoapps.programs.models import ProgramsApiConfig
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers
from openedx.core.djangoapps.theming import helpers as theming_helpers
from openedx.core.djangoapps.user_api import accounts as accounts_settings
from openedx.core.djangoapps.user_api.accounts.utils import generate_password
from openedx.core.djangoapps.user_api.models import UserRetirementRequest, UserRetirementStatus
from openedx.core.djangoapps.user_api.preferences import api as preferences_api
from openedx.core.djangoapps.user_api.config.waffle import PREVENT_AUTH_USER_WRITES, SYSTEM_MAINTENANCE_MSG, waffle
from openedx.core.djangolib.markup import HTML, Text
from student.cookies import set_logged_in_cookies
from student.forms import AccountCreationForm, PasswordResetFormNoActive, get_registration_extension_form
from student.helpers import (
    DISABLE_UNENROLL_CERT_STATES,
    AccountValidationError,
    auth_pipeline_urls,
    authenticate_new_user,
    cert_info,
    create_or_set_user_attribute_created_on_site,
    destroy_oauth_tokens,
    do_create_account,
    generate_activation_email_context,
    get_next_url_for_login_page
)
from student.message_types import EmailChange, RecoveryEmailCreate
from student.models import (
    CourseEnrollment,
    AccountRecovery,
    PasswordHistory,
    PendingEmailChange,
    PendingSecondaryEmailChange,
    Registration,
    RegistrationCookieConfiguration,
    UserAttribute,
    UserProfile,
    UserSignupSource,
    UserStanding,
    create_comments_service_user,
    email_exists_or_retired,
    OrganizationRegistration,
    ManualEnrollmentAudit
)
from student.signals import REFUND_ORDER
from student.forms import OrganizationRegistrationForm
from student.tasks import send_activation_email
from student.text_me_the_app import TextMeTheAppFragmentView
from third_party_auth import pipeline, provider
from third_party_auth.saml import SAP_SUCCESSFACTORS_SAML_KEY
from util.bad_request_rate_limiter import BadRequestRateLimiter
from util.db import outer_atomic
from util.json_request import JsonResponse
from util.password_policy_validators import SecurityPolicyError, validate_password
from student.tokens import account_activation_token
from django.views.decorators.csrf import csrf_protect
from django.shortcuts import render
from edx_ace import ace
from edx_ace.recipient import Recipient
from random import choice
from string import ascii_lowercase, digits
lmslog = logging.getLogger(__name__)
log = logging.getLogger("edx.student")

AUDIT_LOG = logging.getLogger("audit")
ReverifyInfo = namedtuple(
    'ReverifyInfo',
    'course_id course_name course_number date status display'
)
SETTING_CHANGE_INITIATED = 'edx.user.settings.change_initiated'
# Used as the name of the user attribute for tracking affiliate registrations
REGISTRATION_AFFILIATE_ID = 'registration_affiliate_id'
REGISTRATION_UTM_PARAMETERS = {
    'utm_source': 'registration_utm_source',
    'utm_medium': 'registration_utm_medium',
    'utm_campaign': 'registration_utm_campaign',
    'utm_term': 'registration_utm_term',
    'utm_content': 'registration_utm_content',
}
REGISTRATION_UTM_CREATED_AT = 'registration_utm_created_at'
# used to announce a registration
REGISTER_USER = Signal(providing_args=["user", "registration"])

from django.shortcuts import get_object_or_404
from paypal.standard.forms import PayPalPaymentsForm
from paypal.standard.ipn.signals import valid_ipn_received
from django.views.decorators.csrf import csrf_exempt
from student.hooks import show_me_the_money
import uuid
from django.core.mail import EmailMessage, EmailMultiAlternatives



def payment_process(request):
    org_email = request.session.get('organization_email')
    org = get_object_or_404(OrganizationRegistration, organization_email=org_email) 
   
    new_user = request.session.get('new_user')
    request.session['new_user'] = new_user

    host = request.get_host()
    paypal_dict = {                
        'business': settings.PAYPAL_RECEIVER_EMAIL,        
        'amount': str(org.package_total_price),
        'item_name': "Organization Registration",        
        'invoice': str(org.invoice_id),
        'currency_code': 'USD',
        'notify_url': 'http://{}{}'.format(host, reverse('paypal-ipn')),
        'return_url': 'http://{}{}'.format(host, reverse('payment_done')),
        'cancel_return': 'http://{}{}'.format(host, reverse('payment_canceled')),

    }
    form = PayPalPaymentsForm(initial=paypal_dict)
    # request.session['form-submitted'] = False
    request.session['invoice'] = paypal_dict['invoice']
   
    valid_ipn_received.connect(show_me_the_money)
    return render(request, 'payment_process.html', {'form': form, 'org': org })


@csrf_exempt
def payment_done(request):   
    data = request.POST       
    invoice = request.session.get('invoice')

    new_user = request.session.get('new_user') 
    password_data = request.session.get('password') 
 

    order = get_object_or_404(OrganizationRegistration, invoice_id=int(invoice))
         
    token = account_activation_token.make_token(order)
    current_site = configuration_helpers.get_value('LMS_ROOT_URL', settings.LMS_ROOT_URL)
    mail_subject = 'Activate your organization account.'
    

    context = {
        'organization': order,
        'domain': current_site,
        # 'password_data': password_data,
        'org_username': order.user.username,
        'org_email': order.organization_email,
        'uid': urlsafe_base64_encode(force_bytes(order.pk)),
        'token': token,
        'item_name': "Organization Registration",
        'amount': order.package_total_price,
        'payment_status': 'Completed'
    }
    
    to_email = order.organization_email

    from_address = configuration_helpers.get_value(
            'email_from_address',
            settings.DEFAULT_FROM_EMAIL
        )

    message_for_activation = render_to_string('emails/acc_active_email.txt', context)

    email = EmailMultiAlternatives(mail_subject,message_for_activation,from_email=from_address,to=[to_email])

    email.attach_alternative(message_for_activation, "text/html")

    email.mixed_subtype = 'related'

    email.attach(logo_data())
    
    email.send() 
    
    django_login(request, new_user)
    string_msg = "Order Placed Successfully."
    messages.add_message(request, messages.SUCCESS, string_msg)

    return HttpResponseRedirect('/dashboard')



@csrf_exempt
def payment_canceled(request):
    new_user = request.session.get('new_user')
    order = get_object_or_404(OrganizationRegistration, invoice_id=int(request.session.get('invoice')))
    if order.paid == False:
        #new_user.delete()
        string_msg = "Payment failed."
        messages.add_message(request, messages.ERROR, string_msg)        
        return HttpResponseRedirect('/organization_register') 


def csrf_token(context):
    """
    A csrf token that can be included in a form.
    """
    token = context.get('csrf_token', '')
    if token == 'NOTPROVIDED':
        return ''
    return (u'<div style="display:none"><input type="hidden"'
            ' name="csrfmiddlewaretoken" value="{}" /></div>'.format(token))


# NOTE: This view is not linked to directly--it is called from
# branding/views.py:index(), which is cached for anonymous users.
# This means that it should always return the same thing for anon
# users. (in particular, no switching based on query params allowed)
def index(request, extra_context=None, user=AnonymousUser()):
    """
    Render the edX main page.

    extra_context is used to allow immediate display of certain modal windows, eg signup,
    as used by external_auth.
    """
    if extra_context is None:
        extra_context = {}

    courses = get_courses(user)

    if configuration_helpers.get_value(
            "ENABLE_COURSE_SORTING_BY_START_DATE",
            settings.FEATURES["ENABLE_COURSE_SORTING_BY_START_DATE"],
    ):
        courses = sort_by_start_date(courses)
    else:
        courses = sort_by_announcement(courses)

    context = {'courses': courses}

    context['homepage_overlay_html'] = configuration_helpers.get_value('homepage_overlay_html')

    # This appears to be an unused context parameter, at least for the master templates...
    context['show_partners'] = configuration_helpers.get_value('show_partners', True)

    # TO DISPLAY A YOUTUBE WELCOME VIDEO
    # 1) Change False to True
    context['show_homepage_promo_video'] = configuration_helpers.get_value('show_homepage_promo_video', False)

    # Maximum number of courses to display on the homepage.
    context['homepage_course_max'] = configuration_helpers.get_value(
        'HOMEPAGE_COURSE_MAX', settings.HOMEPAGE_COURSE_MAX
    )

    # 2) Add your video's YouTube ID (11 chars, eg "123456789xX"), or specify via site configuration
    # Note: This value should be moved into a configuration setting and plumbed-through to the
    # context via the site configuration workflow, versus living here
    youtube_video_id = configuration_helpers.get_value('homepage_promo_video_youtube_id', "your-youtube-id")
    context['homepage_promo_video_youtube_id'] = youtube_video_id

    # allow for theme override of the courses list
    context['courses_list'] = theming_helpers.get_template_path('courses_list.html')

    # Insert additional context for use in the template
    context.update(extra_context)

    # Add marketable programs to the context.
    context['programs_list'] = get_programs_with_type(request.site, include_hidden=False)


    return render_to_response('index.html', context)


@csrf_protect
def organization_register(request):
    if request.method == 'POST':

        form = OrganizationRegistrationForm(request.POST or None)
        try:
            password = request.POST.get('password')
            country = request.POST.get('country')
            state = request.POST.get('state')
            city = request.POST.get('city')

            if form.is_valid():
                post = form.save(commit = False)
                post.is_active = False

                organization_email = form.cleaned_data.get('organization_email')



                org_username = (str(post.organization_email)).split("@")[0]
                chars=ascii_lowercase+digits
                default_username = ''.join([choice(chars) for i in range(10)])
                set_default_username = "{}{}".format(org_username,default_username)
                password_data = password

                
                user = User(
                    username=set_default_username,
                    email= organization_email,
                    is_active=True,
                    is_staff=True,
                    )

                user.set_password(password_data)
                try:
                    user.save()
                except Exception as e:
                    log.info("Exception Occured....!! While saving in user save---%s----"% e)
                    string_msg = "User Already Exists."
                    messages.add_message(request, messages.ERROR, string_msg)
                    return HttpResponseRedirect("/organization_register")
                registration = Registration()


                new_user = authenticate_new_user(request, user.username, password_data)

                post.user = user

                # post.invoice_id = uuid.uuid1().int>>64                                

                # post.package_total_price = 500 * 20

                post.country = country

                post.state = state

                post.city = city

                post.payment_status = 'registered'

                post.save()


                # current_site = configuration_helpers.get_value('LMS_ROOT_URL', settings.LMS_ROOT_URL)
                order = get_object_or_404(OrganizationRegistration, user=post.user)

                token = account_activation_token.make_token(order)
                current_site = configuration_helpers.get_value('LMS_ROOT_URL', settings.LMS_ROOT_URL)
                mail_subject = 'Activate your organization account.'
                

                context = {
                    'organization': order,
                    'domain': current_site,
                    # 'password_data': password_data,
                    'org_username': order.user.username,
                    'org_email': order.organization_email,
                    'org_name': order.organization_name,
                    # 'uid': urlsafe_base64_encode(force_bytes(order.pk)),
                    # 'token': token,
                    'item_name': "Organization Registration",
                }

                try:                    
                    to_email = order.organization_email

                    from_address = configuration_helpers.get_value(
                            'email_from_address',
                            settings.DEFAULT_FROM_EMAIL
                        )

                    message_for_activation = render_to_string('emails/acc_active_email.txt', context)

                    email = EmailMultiAlternatives(mail_subject,message_for_activation,from_email=from_address,to=[to_email])

                    email.attach_alternative(message_for_activation, "text/html")

                    email.mixed_subtype = 'related'

                    email.attach(logo_data())
                    
                    email.send()                     
                except:
                    log.info('Error Occured while the sending email to Organization Admin.')
                    pass   
               

                user_prof = UserProfile(
                    user=user,
                    organization=post.organization_name,
                )
                
                user_prof.save()

                # string_msg = _('Registration Details Sent to Site-Admin.')

                # messages.add_message(request, messages.SUCCESS, string_msg)
                request.session['new_user'] = new_user
                request.session['password'] = password_data
                request.session['username'] = user.username
                request.session['post'] = post
                request.session['user'] = user
                request.session['user_prof'] = user_prof
                request.session['organization_email'] = post.organization_email
                # ut_txshop_link = 'http://qual.its.utexas.edu/txshop/list.WBX?component=0&application_name=DMSCHOOL&cat_seq_chosen=02&subcategory_seq_chosen=000'
                return render(request, "payment_buy_now.html", {'new_user': post.organization_email})
            else:
                return render(request, "organization_register.html", {'form':form})
        except (KeyError, ValueError, IndexError) as ex:
            log.exception("Unknown organization: %s" % ex)
            string_msg = "Error is : %s" % ex
            messages.add_message(request, messages.ERROR, string_msg)
    else:
        form = OrganizationRegistrationForm()
    user_email_validation = User.objects.all().values_list('email',flat=True)
    user_email_list = [str(email_list) for email_list in list(user_email_validation)]
    return render(request,'organization_register.html',{'form':form, 'email_obj': user_email_list })

def cancel_order(request):
    if request.method == 'POST':
        email_user = request.POST.get('new_user')
        cancel = request.POST.get('cancel')
        buy = request.POST.get('buy')
        try:
            order = OrganizationRegistration.objects.get(organization_email=email_user)
        except OrganizationRegistration.DoesNotExist:
            log.info("OrganizationRegistration User Does Not Exist.")
            order = None

        if cancel:  
            if order:
                order.payment_status = 'cancelled'
                order.save()
                string_msg = "Order Canceled."
                messages.add_message(request, messages.ERROR, string_msg)
            else:
                string_msg = "User not Registered."
                messages.add_message(request, messages.ERROR, string_msg)

            logout(request)
            return HttpResponseRedirect('/organization_register')
        elif buy:
            if order:
                order.payment_status = 'Pending'
                order.save()                
            else:
                string_msg = "User not Registered."
                messages.add_message(request, messages.ERROR, string_msg)
            return HttpResponseRedirect('http://qual.its.utexas.edu/txshop/list.WBX?component=0&application_name=DMSCHOOL&cat_seq_chosen=02&subcategory_seq_chosen=000')
        else:
            string_msg = "Order Canceled."
            messages.add_message(request, messages.ERROR, string_msg)
            logout(request)
            return HttpResponseRedirect('/organization_register')
    else:
        user = request.user
        user_email = user.email
        return render(request, "payment_buy_now.html", {'new_user': user_email})


def get_success_url():
    return reverse('register_user')

from django.utils.http import urlsafe_base64_decode


def activate(request, uid, token):
    try:    
        uid = force_text(urlsafe_base64_decode(uid))
        post = OrganizationRegistration.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, OrganizationRegistration.DoesNotExist):
        post = None
    except Exception as e:
        log.info("exception %s-------" % e)

    if post is not None and account_activation_token.check_token(post, token):

        post.is_active = True
        
        post.save()

        string_msg = _('Successfully Registered')
        messages.add_message(request, messages.SUCCESS, string_msg)

        return HttpResponseRedirect('/dashboard')
    else:
        return HttpResponse('<h2>Activation link is invalid!</h2>')


    
     
@ensure_csrf_cookie
def register_user(request, extra_context=None):
    """
    Deprecated. To be replaced by :class:`student_account.views.login_and_registration_form`.
    """
    # Determine the URL to redirect to following login:
    redirect_to = get_next_url_for_login_page(request)
    if request.user.is_authenticated:
        return redirect(redirect_to)

    external_auth_response = external_auth_register(request)
    if external_auth_response is not None:
        return external_auth_response


    active_organization_list = []
    student_list = []
    organization_obj = OrganizationRegistration.objects.all()
    for row in organization_obj.iterator():
        if row.is_active:
            active_organization_list.append(row.organization_name)

    student_list.append('Student')

    context = {
        'organization_list': active_organization_list,
        'student_list': student_list,
        'login_redirect_url': redirect_to,  # This gets added to the query string of the "Sign In" button in the header
        'email': '',
        'name': '',
        'organization_list': active_organization_list,
        'student_list': student_list,
        'running_pipeline': None,
        'pipeline_urls': auth_pipeline_urls(pipeline.AUTH_ENTRY_REGISTER, redirect_url=redirect_to),
        'platform_name': configuration_helpers.get_value(
            'platform_name',
            settings.PLATFORM_NAME
        ),
        'selected_provider': '',
        'username': '',
        'platform_name_1': configuration_helpers.get_value(
            'platform_name_1',
            settings.PLATFORM_NAME_1
        ),
    }

    if extra_context is not None:
        context.update(extra_context)

    if context.get("extauth_domain", '').startswith(
            openedx.core.djangoapps.external_auth.views.SHIBBOLETH_DOMAIN_PREFIX
    ):
        return render_to_response('register-shib.html', context)

    # If third-party auth is enabled, prepopulate the form with data from the
    # selected provider.
    if third_party_auth.is_enabled() and pipeline.running(request):
        running_pipeline = pipeline.get(request)
        current_provider = provider.Registry.get_from_pipeline(running_pipeline)
        if current_provider is not None:
            overrides = current_provider.get_register_form_data(running_pipeline.get('kwargs'))
            overrides['running_pipeline'] = running_pipeline
            overrides['selected_provider'] = current_provider.name
            context.update(overrides)



    return render_to_response('register.html', context)



def compose_and_send_activation_email(user, profile, user_registration=None):
    """
    Construct all the required params and send the activation email
    through celery task

    Arguments:
        user: current logged-in user
        profile: profile object of the current logged-in user
        user_registration: registration of the current logged-in user
    """
    dest_addr = user.email
    if user_registration is None:
        user_registration = Registration.objects.get(user=user)
    context = generate_activation_email_context(user, user_registration)
    subject = render_to_string('emails/activation_email_subject.txt', context)
    # Email subject *must not* contain newlines
    subject = ''.join(subject.splitlines())
    message_for_activation = render_to_string('emails/activation_email.txt', context)
    from_address = configuration_helpers.get_value('email_from_address', settings.DEFAULT_FROM_EMAIL)
    from_address = configuration_helpers.get_value('ACTIVATION_EMAIL_FROM_ADDRESS', from_address)
    if settings.FEATURES.get('REROUTE_ACTIVATION_EMAIL'):
        dest_addr = settings.FEATURES['REROUTE_ACTIVATION_EMAIL']
        message_for_activation = ("Activation for %s (%s): %s\n" % (user, user.email, profile.name) +
                                  '-' * 80 + '\n\n' + message_for_activation)
    
    email = EmailMultiAlternatives(subject,message_for_activation,from_email=from_address,to=[dest_addr])

    email.attach_alternative(message_for_activation, "text/html")

    email.mixed_subtype = 'related'

    email.attach(logo_data())

    email.send()

    # send_activation_email.delay(subject, message_for_activation, from_address, dest_addr)


from email.mime.image import MIMEImage

from django.contrib.staticfiles import finders

import os
from django.contrib.staticfiles.storage import staticfiles_storage
from os.path import dirname, abspath

def logo_data(): 
    #file_path = staticfiles_storage.url('images/logo_ut.jpg')
    file_path = settings.STATIC_ROOT_BASE + '/images/logo_ut.jpg'
    f = 'logo_ut.jpg'
    fp = open(file_path, 'rb')
    msg_img = MIMEImage(fp.read())
    fp.close()
    msg_img.add_header('Content-ID', '<{}>'.format(f))
    return msg_img




@login_required
def course_run_refund_status(request, course_id):
    """
    Get Refundable status for a course.

    Arguments:
        request: The request object.
        course_id (str): The unique identifier for the course.

    Returns:
        Json response.

    """

    try:
        course_key = CourseKey.from_string(course_id)
        course_enrollment = CourseEnrollment.get_enrollment(request.user, course_key)

    except InvalidKeyError:
        logging.exception("The course key used to get refund status caused InvalidKeyError during look up.")

        return JsonResponse({'course_refundable_status': ''}, status=406)

    refundable_status = course_enrollment.refundable()
    logging.info("Course refund status for course {0} is {1}".format(course_id, refundable_status))

    return JsonResponse({'course_refundable_status': refundable_status}, status=200)


def _update_email_opt_in(request, org):
    """
    Helper function used to hit the profile API if email opt-in is enabled.
    """

    email_opt_in = request.POST.get('email_opt_in')
    if email_opt_in is not None:
        email_opt_in_boolean = email_opt_in == 'true'
        preferences_api.update_email_opt_in(request.user, org, email_opt_in_boolean)


def admin_about(request):
    return render(request, 'admin_about.html',{})

@transaction.non_atomic_requests
@require_POST
@outer_atomic(read_committed=True)
def change_enrollment(request, check_access=True):
    """
    Modify the enrollment status for the logged-in user.

    TODO: This is lms specific and does not belong in common code.

    The request parameter must be a POST request (other methods return 405)
    that specifies course_id and enrollment_action parameters. If course_id or
    enrollment_action is not specified, if course_id is not valid, if
    enrollment_action is something other than "enroll" or "unenroll", if
    enrollment_action is "enroll" and enrollment is closed for the course, or
    if enrollment_action is "unenroll" and the user is not enrolled in the
    course, a 400 error will be returned. If the user is not logged in, 403
    will be returned; it is important that only this case return 403 so the
    front end can redirect the user to a registration or login page when this
    happens. This function should only be called from an AJAX request, so
    the error messages in the responses should never actually be user-visible.

    Args:
        request (`Request`): The Django request object

    Keyword Args:
        check_access (boolean): If True, we check that an accessible course actually
            exists for the given course_key before we enroll the student.
            The default is set to False to avoid breaking legacy code or
            code with non-standard flows (ex. beta tester invitations), but
            for any standard enrollment flow you probably want this to be True.

    Returns:
        Response

    """
    # Get the user
    user = request.user

    # Ensure the user is authenticated
    if not user.is_authenticated:
        return HttpResponseForbidden()

    # Ensure we received a course_id
    action = request.POST.get("enrollment_action")
    if 'course_id' not in request.POST:
        return HttpResponseBadRequest(_("Course id not specified"))

    try:
        course_id = CourseKey.from_string(request.POST.get("course_id"))
    except InvalidKeyError:
        log.warning(
            u"User %s tried to %s with invalid course id: %s",
            user.username,
            action,
            request.POST.get("course_id"),
        )
        return HttpResponseBadRequest(_("Invalid course id"))

    # Allow us to monitor performance of this transaction on a per-course basis since we often roll-out features
    # on a per-course basis.
    monitoring_utils.set_custom_metric('course_id', text_type(course_id))

    if action == "enroll":
        # Make sure the course exists
        # We don't do this check on unenroll, or a bad course id can't be unenrolled from
        if not modulestore().has_course(course_id):
            log.warning(
                u"User %s tried to enroll in non-existent course %s",
                user.username,
                course_id
            )
            return HttpResponseBadRequest(_("Course id is invalid"))

        # Record the user's email opt-in preference
        if settings.FEATURES.get('ENABLE_MKTG_EMAIL_OPT_IN'):
            _update_email_opt_in(request, course_id.org)

        available_modes = CourseMode.modes_for_course_dict(course_id)

        # Check whether the user is blocked from enrolling in this course
        # This can occur if the user's IP is on a global blacklist
        # or if the user is enrolling in a country in which the course
        # is not available.
        redirect_url = embargo_api.redirect_if_blocked(
            course_id, user=user, ip_address=get_ip(request),
            url=request.path
        )
        if redirect_url:
            return HttpResponse(redirect_url)

        if CourseEntitlement.check_for_existing_entitlement_and_enroll(user=user, course_run_key=course_id):
            return HttpResponse(reverse('courseware', args=[unicode(course_id)]))

        # Check that auto enrollment is allowed for this course
        # (= the course is NOT behind a paywall)
        if CourseMode.can_auto_enroll(course_id):
            # Enroll the user using the default mode (audit)
            # We're assuming that users of the course enrollment table
            # will NOT try to look up the course enrollment model
            # by its slug.  If they do, it's possible (based on the state of the database)
            # for no such model to exist, even though we've set the enrollment type
            # to "audit".
            try:
                enroll_mode = CourseMode.auto_enroll_mode(course_id, available_modes)
                if enroll_mode:
                    CourseEnrollment.enroll(user, course_id, check_access=check_access, mode=enroll_mode)
            except Exception:  # pylint: disable=broad-except
                return HttpResponseBadRequest(_("Could not enroll"))

        # If we have more than one course mode or professional ed is enabled,
        # then send the user to the choose your track page.
        # (In the case of no-id-professional/professional ed, this will redirect to a page that
        # funnels users directly into the verification / payment flow)
        if CourseMode.has_verified_mode(available_modes) or CourseMode.has_professional_mode(available_modes):
            return HttpResponse(
                reverse("course_modes_choose", kwargs={'course_id': text_type(course_id)})
            )

        # Otherwise, there is only one mode available (the default)
        return HttpResponse()
    elif action == "unenroll":
        enrollment = CourseEnrollment.get_enrollment(user, course_id)
        if not enrollment:
            return HttpResponseBadRequest(_("You are not enrolled in this course"))

        certificate_info = cert_info(user, enrollment.course_overview)
        if certificate_info.get('status') in DISABLE_UNENROLL_CERT_STATES:
            return HttpResponseBadRequest(_("Your certificate prevents you from unenrolling from this course"))

        CourseEnrollment.unenroll(user, course_id)
        REFUND_ORDER.send(sender=None, course_enrollment=enrollment)
        return HttpResponse()
    else:
        return HttpResponseBadRequest(_("Enrollment action is invalid"))


@require_GET
@login_required
@ensure_csrf_cookie
def manage_user_standing(request):
    """
    Renders the view used to manage user standing. Also displays a table
    of user accounts that have been disabled and who disabled them.
    """
    if not request.user.is_staff:
        raise Http404
    all_disabled_accounts = UserStanding.objects.filter(
        account_status=UserStanding.ACCOUNT_DISABLED
    )

    all_disabled_users = [standing.user for standing in all_disabled_accounts]

    headers = ['username', 'account_changed_by']
    rows = []
    for user in all_disabled_users:
        row = [user.username, user.standing.changed_by]
        rows.append(row)

    context = {'headers': headers, 'rows': rows}

    return render_to_response("manage_user_standing.html", context)


@require_POST
@login_required
@ensure_csrf_cookie
def disable_account_ajax(request):
    """
    Ajax call to change user standing. Endpoint of the form
    in manage_user_standing.html
    """
    if not request.user.is_staff:
        raise Http404
    username = request.POST.get('username')
    context = {}
    if username is None or username.strip() == '':
        context['message'] = _('Please enter a username')
        return JsonResponse(context, status=400)

    account_action = request.POST.get('account_action')
    if account_action is None:
        context['message'] = _('Please choose an option')
        return JsonResponse(context, status=400)

    username = username.strip()
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        context['message'] = _("User with username {} does not exist").format(username)
        return JsonResponse(context, status=400)
    else:
        user_account, _success = UserStanding.objects.get_or_create(
            user=user, defaults={'changed_by': request.user},
        )
        if account_action == 'disable':
            user_account.account_status = UserStanding.ACCOUNT_DISABLED
            context['message'] = _("Successfully disabled {}'s account").format(username)
            log.info(u"%s disabled %s's account", request.user, username)
        elif account_action == 'reenable':
            user_account.account_status = UserStanding.ACCOUNT_ENABLED
            context['message'] = _("Successfully reenabled {}'s account").format(username)
            log.info(u"%s reenabled %s's account", request.user, username)
        else:
            context['message'] = _("Unexpected account status")
            return JsonResponse(context, status=400)
        user_account.changed_by = request.user
        user_account.standing_last_changed_at = datetime.datetime.now(UTC)
        user_account.save()

    return JsonResponse(context)


@login_required
@ensure_csrf_cookie
def change_setting(request):
    """
    JSON call to change a profile setting: Right now, location
    """
    # TODO (vshnayder): location is no longer used
    u_prof = UserProfile.objects.get(user=request.user)  # request.user.profile_cache
    if 'location' in request.POST:
        u_prof.location = request.POST['location']
    u_prof.save()

    return JsonResponse({
        "success": True,
        "location": u_prof.location,
    })


@receiver(post_save, sender=User)
def user_signup_handler(sender, **kwargs):  # pylint: disable=unused-argument
    """
    Handler that saves the user Signup Source when the user is created
    """
    if 'created' in kwargs and kwargs['created']:
        site = configuration_helpers.get_value('SITE_NAME')
        if site:
            user_signup_source = UserSignupSource(user=kwargs['instance'], site=site)
            user_signup_source.save()
            log.info(u'user {} originated from a white labeled "Microsite"'.format(kwargs['instance'].id))


@transaction.non_atomic_requests
def create_account_with_params(request, params):
    """
    Given a request and a dict of parameters (which may or may not have come
    from the request), create an account for the requesting user, including
    creating a comments service user object and sending an activation email.
    This also takes external/third-party auth into account, updates that as
    necessary, and authenticates the user for the request's session.

    Does not return anything.

    Raises AccountValidationError if an account with the username or email
    specified by params already exists, or ValidationError if any of the given
    parameters is invalid for any other reason.

    Issues with this code:
    * It is non-transactional except where explicitly wrapped in atomic to
      alleviate deadlocks and improve performance. This means failures at
      different places in registration can leave users in inconsistent
      states.
    * Third-party auth passwords are not verified. There is a comment that
      they are unused, but it would be helpful to have a sanity check that
      they are sane.
    * The user-facing text is rather unfriendly (e.g. "Username must be a
      minimum of two characters long" rather than "Please use a username of
      at least two characters").
    * Duplicate email raises a ValidationError (rather than the expected
      AccountValidationError). Duplicate username returns an inconsistent
      user message (i.e. "An account with the Public Username '{username}'
      already exists." rather than "It looks like {username} belongs to an
      existing account. Try again with a different username.") The two checks
      occur at different places in the code; as a result, registering with
      both a duplicate username and email raises only a ValidationError for
      email only.
    """
    # Copy params so we can modify it; we can't just do dict(params) because if
    # params is request.POST, that results in a dict containing lists of values
    params = dict(params.items())

    # allow to define custom set of required/optional/hidden fields via configuration
    extra_fields = configuration_helpers.get_value(
        'REGISTRATION_EXTRA_FIELDS',
        getattr(settings, 'REGISTRATION_EXTRA_FIELDS', {})
    )
    # registration via third party (Google, Facebook) using mobile application
    # doesn't use social auth pipeline (no redirect uri(s) etc involved).
    # In this case all related info (required for account linking)
    # is sent in params.
    # `third_party_auth_credentials_in_api` essentially means 'request
    # is made from mobile application'
    third_party_auth_credentials_in_api = 'provider' in params

    is_third_party_auth_enabled = third_party_auth.is_enabled()

    if is_third_party_auth_enabled and (pipeline.running(request) or third_party_auth_credentials_in_api):
        params["password"] = generate_password()

    # in case user is registering via third party (Google, Facebook) and pipeline has expired, show appropriate
    # error message
    if is_third_party_auth_enabled and ('social_auth_provider' in params and not pipeline.running(request)):
        raise ValidationError(
            {'session_expired': [
                _(u"Registration using {provider} has timed out.").format(
                    provider=params.get('social_auth_provider'))
            ]}
        )

    # if doing signup for an external authorization, then get email, password, name from the eamap
    # don't use the ones from the form, since the user could have hacked those
    # unless originally we didn't get a valid email or name from the external auth
    # TODO: We do not check whether these values meet all necessary criteria, such as email length
    do_external_auth = 'ExternalAuthMap' in request.session
    if do_external_auth:
        eamap = request.session['ExternalAuthMap']
        try:
            validate_email(eamap.external_email)
            params["email"] = eamap.external_email
        except ValidationError:
            pass
        if len(eamap.external_name.strip()) >= accounts_settings.NAME_MIN_LENGTH:
            params["name"] = eamap.external_name
        params["password"] = eamap.internal_password
        log.debug(u'In create_account with external_auth: user = %s, email=%s', params["name"], params["email"])

    extended_profile_fields = configuration_helpers.get_value('extended_profile_fields', [])
    enforce_password_policy = not do_external_auth
    # Can't have terms of service for certain SHIB users, like at Stanford
    registration_fields = getattr(settings, 'REGISTRATION_EXTRA_FIELDS', {})
    tos_required = (
        registration_fields.get('terms_of_service') != 'hidden' or
        registration_fields.get('honor_code') != 'hidden'
    ) and (
        not settings.FEATURES.get("AUTH_USE_SHIB") or
        not settings.FEATURES.get("SHIB_DISABLE_TOS") or
        not do_external_auth or
        not eamap.external_domain.startswith(openedx.core.djangoapps.external_auth.views.SHIBBOLETH_DOMAIN_PREFIX)
    )

    form = AccountCreationForm(
        data=params,
        extra_fields=extra_fields,
        extended_profile_fields=extended_profile_fields,
        enforce_password_policy=enforce_password_policy,
        tos_required=tos_required,
    )
    custom_form = get_registration_extension_form(data=params)

    third_party_provider = None
    running_pipeline = None
    new_user = None

    # Perform operations within a transaction that are critical to account creation
    with outer_atomic(read_committed=True):
        # first, create the account
        (user, profile, registration) = do_create_account(form, custom_form)

        # If a 3rd party auth provider and credentials were provided in the API, link the account with social auth
        # (If the user is using the normal register page, the social auth pipeline does the linking, not this code)

        # Note: this is orthogonal to the 3rd party authentication pipeline that occurs
        # when the account is created via the browser and redirect URLs.

        if is_third_party_auth_enabled and third_party_auth_credentials_in_api:
            backend_name = params['provider']
            request.social_strategy = social_utils.load_strategy(request)
            redirect_uri = reverse('social:complete', args=(backend_name, ))
            request.backend = social_utils.load_backend(request.social_strategy, backend_name, redirect_uri)
            social_access_token = params.get('access_token')
            if not social_access_token:
                raise ValidationError({
                    'access_token': [
                        _("An access_token is required when passing value ({}) for provider.").format(
                            params['provider']
                        )
                    ]
                })
            request.session[pipeline.AUTH_ENTRY_KEY] = pipeline.AUTH_ENTRY_REGISTER_API
            pipeline_user = None
            error_message = ""
            try:
                pipeline_user = request.backend.do_auth(social_access_token, user=user)
            except AuthAlreadyAssociated:
                error_message = _("The provided access_token is already associated with another user.")
            except (HTTPError, AuthException):
                error_message = _("The provided access_token is not valid.")
            if not pipeline_user or not isinstance(pipeline_user, User):
                # Ensure user does not re-enter the pipeline
                request.social_strategy.clean_partial_pipeline(social_access_token)
                raise ValidationError({'access_token': [error_message]})

        # If the user is registering via 3rd party auth, track which provider they use
        if is_third_party_auth_enabled and pipeline.running(request):
            running_pipeline = pipeline.get(request)
            third_party_provider = provider.Registry.get_from_pipeline(running_pipeline)

        new_user = authenticate_new_user(request, user.username, params['password'])
        django_login(request, new_user)
        request.session.set_expiry(0)

        if do_external_auth:
            eamap.user = new_user
            eamap.dtsignup = datetime.datetime.now(UTC)
            eamap.save()
            AUDIT_LOG.info(u"User registered with external_auth %s", new_user.username)
            AUDIT_LOG.info(u'Updated ExternalAuthMap for %s to be %s', new_user.username, eamap)

            if settings.FEATURES.get('BYPASS_ACTIVATION_EMAIL_FOR_EXTAUTH'):
                log.info('bypassing activation email')
                new_user.is_active = True
                new_user.save()
                AUDIT_LOG.info(
                    u"Login activated on extauth account - {0} ({1})".format(new_user.username, new_user.email))

    # Check if system is configured to skip activation email for the current user.
    # skip_email = skip_activation_email(
    #     user, do_external_auth, running_pipeline, third_party_provider,
    # )

    running_pipeline = third_party_auth.pipeline.get(request)

    if bool(running_pipeline):
        skip_email = True
    else:
        skip_email = False

    if skip_email:
        registration.activate()
    else:
        compose_and_send_activation_email(user, profile, registration)

    # Perform operations that are non-critical parts of account creation
    create_or_set_user_attribute_created_on_site(user, request.site)

    preferences_api.set_user_preference(user, LANGUAGE_KEY, get_language())

    if settings.FEATURES.get('ENABLE_DISCUSSION_EMAIL_DIGEST'):
        try:
            enable_notifications(user)
        except Exception:  # pylint: disable=broad-except
            log.exception("Enable discussion notifications failed for user {id}.".format(id=user.id))

    dog_stats_api.increment("common.student.account_created")

    # Track the user's registration
    if hasattr(settings, 'LMS_SEGMENT_KEY') and settings.LMS_SEGMENT_KEY:
        tracking_context = tracker.get_tracker().resolve_context()
        identity_args = [
            user.id,
            {
                'email': user.email,
                'username': user.username,
                'name': profile.name,
                # Mailchimp requires the age & yearOfBirth to be integers, we send a sane integer default if falsey.
                'age': profile.age or -1,
                'yearOfBirth': profile.year_of_birth or datetime.datetime.now(UTC).year,
                'education': profile.level_of_education_display,
                'address': profile.mailing_address,
                'gender': profile.gender_display,
                'country': text_type(profile.country),
            }
        ]

        if hasattr(settings, 'MAILCHIMP_NEW_USER_LIST_ID'):
            identity_args.append({
                "MailChimp": {
                    "listId": settings.MAILCHIMP_NEW_USER_LIST_ID
                }
            })

        analytics.identify(*identity_args)

        analytics.track(
            user.id,
            "edx.bi.user.account.registered",
            {
                'category': 'conversion',
                'label': params.get('course_id'),
                'provider': third_party_provider.name if third_party_provider else None
            },
            context={
                'ip': tracking_context.get('ip'),
                'Google Analytics': {
                    'clientId': tracking_context.get('client_id')
                }
            }
        )

    # Announce registration
    REGISTER_USER.send(sender=None, user=user, registration=registration)

    create_comments_service_user(user)

    try:
        record_registration_attributions(request, new_user)
    # Don't prevent a user from registering due to attribution errors.
    except Exception:   # pylint: disable=broad-except
        log.exception('Error while attributing cookies to user registration.')

    # TODO: there is no error checking here to see that the user actually logged in successfully,
    # and is not yet an active user.
    if new_user is not None:
        AUDIT_LOG.info(u"Login success on new account creation - {0}".format(new_user.username))

    return new_user


def skip_activation_email(user, do_external_auth, running_pipeline, third_party_provider):
    """
    Return `True` if activation email should be skipped.

    Skip email if we are:
        1. Doing load testing.
        2. Random user generation for other forms of testing.
        3. External auth bypassing activation.
        4. Have the platform configured to not require e-mail activation.
        5. Registering a new user using a trusted third party provider (with skip_email_verification=True)

    Note that this feature is only tested as a flag set one way or
    the other for *new* systems. we need to be careful about
    changing settings on a running system to make sure no users are
    left in an inconsistent state (or doing a migration if they are).

    Arguments:
        user (User): Django User object for the current user.
        do_external_auth (bool): True if external authentication is in progress.
        running_pipeline (dict): Dictionary containing user and pipeline data for third party authentication.
        third_party_provider (ProviderConfig): An instance of third party provider configuration.

    Returns:
        (bool): `True` if account activation email should be skipped, `False` if account activation email should be
            sent.
    """
    sso_pipeline_email = running_pipeline and running_pipeline['kwargs'].get('details', {}).get('email')

    # Email is valid if the SAML assertion email matches the user account email or
    # no email was provided in the SAML assertion. Some IdP's use a callback
    # to retrieve additional user account information (including email) after the
    # initial account creation.
    valid_email = (
        sso_pipeline_email == user.email or (
            sso_pipeline_email is None and
            third_party_provider and
            getattr(third_party_provider, "identity_provider_type", None) == SAP_SUCCESSFACTORS_SAML_KEY
        )
    )

    # log the cases where skip activation email flag is set, but email validity check fails
    if third_party_provider and third_party_provider.skip_email_verification and not valid_email:
        log.info(
            '[skip_email_verification=True][user=%s][pipeline-email=%s][identity_provider=%s][provider_type=%s] '
            'Account activation email sent as user\'s system email differs from SSO email.',
            user.email,
            sso_pipeline_email,
            getattr(third_party_provider, "provider_id", None),
            getattr(third_party_provider, "identity_provider_type", None)
        )

    return (
        settings.FEATURES.get('SKIP_EMAIL_VALIDATION', None) or
        settings.FEATURES.get('AUTOMATIC_AUTH_FOR_TESTING') or
        (settings.FEATURES.get('BYPASS_ACTIVATION_EMAIL_FOR_EXTAUTH') and do_external_auth) or
        (third_party_provider and third_party_provider.skip_email_verification and valid_email)
    )


def record_affiliate_registration_attribution(request, user):
    """
    Attribute this user's registration to the referring affiliate, if
    applicable.
    """
    affiliate_id = request.COOKIES.get(settings.AFFILIATE_COOKIE_NAME)
    if user and affiliate_id:
        UserAttribute.set_user_attribute(user, REGISTRATION_AFFILIATE_ID, affiliate_id)


def record_utm_registration_attribution(request, user):
    """
    Attribute this user's registration to the latest UTM referrer, if
    applicable.
    """
    utm_cookie_name = RegistrationCookieConfiguration.current().utm_cookie_name
    utm_cookie = request.COOKIES.get(utm_cookie_name)
    if user and utm_cookie:
        utm = json.loads(utm_cookie)
        for utm_parameter_name in REGISTRATION_UTM_PARAMETERS:
            utm_parameter = utm.get(utm_parameter_name)
            if utm_parameter:
                UserAttribute.set_user_attribute(
                    user,
                    REGISTRATION_UTM_PARAMETERS.get(utm_parameter_name),
                    utm_parameter
                )
        created_at_unixtime = utm.get('created_at')
        if created_at_unixtime:
            # We divide by 1000 here because the javascript timestamp generated is in milliseconds not seconds.
            # PYTHON: time.time()      => 1475590280.823698
            # JS: new Date().getTime() => 1475590280823
            created_at_datetime = datetime.datetime.fromtimestamp(int(created_at_unixtime) / float(1000), tz=UTC)
            UserAttribute.set_user_attribute(
                user,
                REGISTRATION_UTM_CREATED_AT,
                created_at_datetime
            )


def record_registration_attributions(request, user):
    """
    Attribute this user's registration based on referrer cookies.
    """
    record_affiliate_registration_attribution(request, user)
    record_utm_registration_attribution(request, user)



from random import choice
from string import ascii_lowercase, digits
from django.contrib.auth.models import User


def default_username(first_name):
    """
    set default username for register user
    """
    set_default_username = ""
    chars=ascii_lowercase+digits
    for a in range(5):
        default_username = ''.join([choice(chars) for i in range(10)])
        set_default_username = "{}{}".format(first_name,default_username)
        if User.objects.filter(username=set_default_username).count():
            pass
        else:
            break
    return set_default_username





@csrf_exempt
@transaction.non_atomic_requests
def create_account(request, post_override=None):    
    """
    Deprecated. Use RegistrationView instead.
    JSON call to create new edX account.
    Used by form in signup_modal.html, which is included into header.html
    """
    # Check if ALLOW_PUBLIC_ACCOUNT_CREATION flag turned off to restrict user account creation
    if not configuration_helpers.get_value(
            'ALLOW_PUBLIC_ACCOUNT_CREATION',
            settings.FEATURES.get('ALLOW_PUBLIC_ACCOUNT_CREATION', True)
    ):
        return HttpResponseForbidden(_("Account creation not allowed."))

    if waffle().is_enabled(PREVENT_AUTH_USER_WRITES):
        return HttpResponseForbidden(SYSTEM_MAINTENANCE_MSG)


    #get_l = request.POST.getlist('reason_for_registration')
    # username_changes = request.POST.getlist('username')
    #display_name_add = request.POST.getlist('display_name')
    #first_name = request.POST.getlist('first_name')
    #last_name = request.POST.getlist('last_name')
    #password_n = request.POST.getlist('password')
    #last_name_initial = last_name[0][0]
    #reason_for_registration = []
    #reason_for_registration.extend(get_l)
    #if not request.POST._mutable:
    #    request.POST._mutable = True
    #if display_name_add[0] == "full_name":
    #    request.POST['display_name'] = "{} {}".format(first_name[0], last_name[0])
    #if display_name_add[0] == "firstname_last_initial":
    #    request.POST['display_name'] = "{} {}".format(first_name[0], last_name_initial)


    # from random import choice
    # from string import ascii_lowercase, digits
    # from django.contrib.auth.models import User
    # chars=ascii_lowercase+digits
    # default_username = ''.join([choice(chars) for i in range(10)])

    # set_default_username = "{}{}".format(first_name[0],default_username)

    # if User.objects.filter(username=set_default_username).count():



    #request.POST['username'] = default_username(first_name[0])
    # for vs in get_l:
    #     AUDIT_LOG.info("-reason_for_registration---vssss-------%s---------" % type(vs))
        # if str(vs):
    # from ast import literal_eval
    # list_reason = [item for value in reason_for_registration for item in literal_eval(value)]
    # for asd in get_l:
    #     reason_for_registration.append(asd.encode("utf-8"))
    # password_n = request.POST.getlist('password')

    #AUDIT_LOG.info("password n--------%s----------" % password_n)
    #AUDIT_LOG.info("password type--------%s----------" % type(password_n))
    #if type(password_n) == list():
    #    request.POST['password'] = password_n[0][0]


    # request.POST['password'] = password_n

    #AUDIT_LOG.info("password in request POST------------%s-----------" % request.POST)

    #request.POST['reason_for_registration'] = reason_for_registration
    #AUDIT_LOG.info("dddddddddsssssffgfff-----create account------%s--------" % request.POST)

    user_mail = request.POST.getlist('email')
    selected_organization = request.POST.getlist('organization')

    try:
        manual_bulk_value = ManualEnrollmentAudit.objects.filter(enrolled_email=str(user_mail[0]))[:1].get()
    except:
        manual_bulk_value = None


    if manual_bulk_value:   
        try:
            manual_enroll_user_data = ManualEnrollmentAudit.objects.filter(enrolled_email=str(user_mail[0]),organization_name=selected_organization[1])[:1].get()
        except:
            manual_enroll_user_data = None

        if not manual_enroll_user_data:
            return JsonResponse({'success': False, 'value': "your mail does not match to organization mail", 'field': "organization"}, status=400)
           


    #Domain Validation

    # if selected_organization:
    #     log.info('selected organization----%s---'% selected_organization)
    #     if selected_organization[0] == "on":
    #         log.info('it is on---')
    #         if selected_organization[1]:
    #             log.info('here in selectd 1')
    #             organization_object = OrganizationRegistration.objects.get(organization_name=selected_organization[1])
    #             organization_mail = organization_object.organization_email
    #             log.info('organization_mail--beforesplit----%s---'% organization_mail)
    #             user_email_value = user_mail
    #             log.info('user_email_value----%s---'% user_email_value)
    #             user_mail = user_mail[0].split('@')
    #             organization_mail = organization_mail.split('@')

    #             if user_mail[1] != organization_mail[1]:
    #                 return JsonResponse({'success': False, 'value': "your mail does not match to organization mail", 'field': "organization"}, status=400)
    #         else:
    #             return JsonResponse({'success': False, 'value': "Select valid organization!!", 'field': "organization"}, status=400)


    warnings.warn("Please use RegistrationView instead.", DeprecationWarning)

    try:
        user = create_account_with_params(request, post_override or request.POST)
    except AccountValidationError as exc:
        return JsonResponse({'success': False, 'value': text_type(exc), 'field': exc.field}, status=400)
    except ValidationError as exc:
        field, error_list = next(iteritems(exc.message_dict))
        return JsonResponse(
            {
                "success": False,
                "field": field,
                "value": ' '.join(error_list),
            },
            status=400
        )

    redirect_url = None  # The AJAX method calling should know the default destination upon success

    # Resume the third-party-auth pipeline if necessary.
    if third_party_auth.is_enabled() and pipeline.running(request):
        running_pipeline = pipeline.get(request)
        redirect_url = pipeline.get_complete_url(running_pipeline['backend'])

    response = JsonResponse({
        'success': True,
        'redirect_url': redirect_url,
    })

    set_logged_in_cookies(request, response, user)
    return response



# @csrf_exempt
# @transaction.non_atomic_requests
# def create_account(request, post_override=None):
#     """
#     JSON call to create new edX account.
#     Used by form in signup_modal.html, which is included into header.html
#     """
#     # Check if ALLOW_PUBLIC_ACCOUNT_CREATION flag turned off to restrict user account creation
#     if not configuration_helpers.get_value(
#             'ALLOW_PUBLIC_ACCOUNT_CREATION',
#             settings.FEATURES.get('ALLOW_PUBLIC_ACCOUNT_CREATION', True)
#     ):
#         return HttpResponseForbidden(_("Account creation not allowed."))

#     if waffle().is_enabled(PREVENT_AUTH_USER_WRITES):
#         return HttpResponseForbidden(SYSTEM_MAINTENANCE_MSG)

#     warnings.warn("Please use RegistrationView instead.", DeprecationWarning)

#     try:
#         user = create_account_with_params(request, post_override or request.POST)
#     except AccountValidationError as exc:
#         return JsonResponse({'success': False, 'value': text_type(exc), 'field': exc.field}, status=400)
#     except ValidationError as exc:
#         field, error_list = next(iteritems(exc.message_dict))
#         return JsonResponse(
#             {
#                 "success": False,
#                 "field": field,
#                 "value": error_list[0],
#             },
#             status=400
#         )

#     redirect_url = None  # The AJAX method calling should know the default destination upon success

#     # Resume the third-party-auth pipeline if necessary.
#     if third_party_auth.is_enabled() and pipeline.running(request):
#         running_pipeline = pipeline.get(request)
#         redirect_url = pipeline.get_complete_url(running_pipeline['backend'])

#     response = JsonResponse({
#         'success': True,
#         'redirect_url': redirect_url,
#     })
#     set_logged_in_cookies(request, response, user)
#     return response


@ensure_csrf_cookie
def activate_account(request, key):
    """
    When link in activation e-mail is clicked
    """
    # If request is in Studio call the appropriate view
    if theming_helpers.get_project_root_name().lower() == u'cms':
        return activate_account_studio(request, key)

    try:
        registration = Registration.objects.get(activation_key=key)
    except (Registration.DoesNotExist, Registration.MultipleObjectsReturned):
        messages.error(
            request,
            HTML(_(
                '{html_start}Your account could not be activated{html_end}'
                'Something went wrong, please <a href="{support_url}">contact support</a> to resolve this issue.'
            )).format(
                support_url=configuration_helpers.get_value('SUPPORT_SITE_LINK', settings.SUPPORT_SITE_LINK),
                html_start=HTML('<p class="message-title">'),
                html_end=HTML('</p>'),
            ),
            extra_tags='account-activation aa-icon'
        )
    else:
        if registration.user.is_active:
            messages.info(
                request,
                HTML(_('{html_start}This account has already been activated.{html_end}')).format(
                    html_start=HTML('<p class="message-title">'),
                    html_end=HTML('</p>'),
                ),
                extra_tags='account-activation aa-icon',
            )
        elif waffle().is_enabled(PREVENT_AUTH_USER_WRITES):
            messages.error(
                request,
                HTML(u'{html_start}{message}{html_end}').format(
                    message=Text(SYSTEM_MAINTENANCE_MSG),
                    html_start=HTML('<p class="message-title">'),
                    html_end=HTML('</p>'),
                ),
                extra_tags='account-activation aa-icon',
            )
        else:
            registration.activate()
            # Success message for logged in users.
            message = _('{html_start}Success{html_end} You have activated your account.')

            if not request.user.is_authenticated:
                # Success message for logged out users
                message = _(
                    '{html_start}Success! You have activated your account.{html_end}'
                    'You will now receive email updates and alerts from us related to'
                    ' the courses you are enrolled in. Sign In to continue.'
                )

            # Add message for later use.
            messages.success(
                request,
                HTML(message).format(
                    html_start=HTML('<p class="message-title">'),
                    html_end=HTML('</p>'),
                ),
                extra_tags='account-activation aa-icon',
            )

    return redirect('dashboard')


@ensure_csrf_cookie
def activate_account_studio(request, key):
    """
    When link in activation e-mail is clicked and the link belongs to studio.
    """
    try:
        registration = Registration.objects.get(activation_key=key)
    except (Registration.DoesNotExist, Registration.MultipleObjectsReturned):
        return render_to_response(
            "registration/activation_invalid.html",
            {'csrf': csrf(request)['csrf_token']}
        )
    else:
        user_logged_in = request.user.is_authenticated
        already_active = True
        if not registration.user.is_active:
            if waffle().is_enabled(PREVENT_AUTH_USER_WRITES):
                return render_to_response('registration/activation_invalid.html',
                                          {'csrf': csrf(request)['csrf_token']})
            registration.activate()
            already_active = False

        return render_to_response(
            "registration/activation_complete.html",
            {
                'user_logged_in': user_logged_in,
                'already_active': already_active
            }
        )



@csrf_exempt
@require_POST
def password_reset(request):
    """
    Attempts to send a password reset e-mail.
    """
    # Add some rate limiting here by re-using the RateLimitMixin as a helper class
    limiter = BadRequestRateLimiter()
    if limiter.is_rate_limit_exceeded(request):
        AUDIT_LOG.warning("Rate limit exceeded in password_reset")
        return HttpResponseForbidden()

    form = PasswordResetFormNoActive(request.POST)
    if form.is_valid():
        form.save(use_https=request.is_secure(),
                  from_email=configuration_helpers.get_value('email_from_address', settings.DEFAULT_FROM_EMAIL),
                  request=request)
        # When password change is complete, a "edx.user.settings.changed" event will be emitted.
        # But because changing the password is multi-step, we also emit an event here so that we can
        # track where the request was initiated.
        tracker.emit(
            SETTING_CHANGE_INITIATED,
            {
                "setting": "password",
                "old": None,
                "new": None,
                "user_id": request.user.id,
            }
        )
        destroy_oauth_tokens(request.user)
    else:
        # bad user? tick the rate limiter counter
        AUDIT_LOG.info("Bad password_reset user passed in.")
        limiter.tick_bad_request_counter(request)

    return JsonResponse({
        'success': True,
        'value': render_to_string('registration/password_reset_done.html', {}),
    })


def uidb36_to_uidb64(uidb36):
    """
    Needed to support old password reset URLs that use base36-encoded user IDs
    https://github.com/django/django/commit/1184d077893ff1bc947e45b00a4d565f3df81776#diff-c571286052438b2e3190f8db8331a92bR231
    Args:
        uidb36: base36-encoded user ID

    Returns: base64-encoded user ID. Otherwise returns a dummy, invalid ID
    """
    try:
        uidb64 = force_text(urlsafe_base64_encode(force_bytes(base36_to_int(uidb36))))
    except ValueError:
        uidb64 = '1'  # dummy invalid ID (incorrect padding for base64)
    return uidb64


def password_reset_confirm_wrapper(request, uidb36=None, token=None):
    """
    A wrapper around django.contrib.auth.views.password_reset_confirm.
    Needed because we want to set the user as active at this step.
    We also optionally do some additional password policy checks.
    """
    # convert old-style base36-encoded user id to base64
    uidb64 = uidb36_to_uidb64(uidb36)
    get_primary_email = None
    platform_name = {
        "platform_name": configuration_helpers.get_value('platform_name', settings.PLATFORM_NAME)
    }

    if 'is_account_recovery' in request.GET and not is_secondary_email_feature_enabled():
        raise Http404
    try:
        uid_int = base36_to_int(uidb36)
        user = User.objects.get(id=uid_int)
    except (ValueError, User.DoesNotExist):
        # if there's any error getting a user, just let django's
        # password_reset_confirm function handle it.
        return password_reset_confirm(
            request, uidb64=uidb64, token=token, extra_context=platform_name
        )

    # if UserRetirementRequest.has_user_requested_retirement(user):
    #     # Refuse to reset the password of any user that has requested retirement.
    #     context = {
    #         'validlink': True,
    #         'form': None,
    #         'title': _('Password reset unsuccessful'),
    #         'err_msg': _('Error in resetting your password.'),
    #     }
    #     context.update(platform_name)
    #     return TemplateResponse(
    #         request, 'registration/password_reset_confirm.html', context
    #     )
    

    if waffle().is_enabled(PREVENT_AUTH_USER_WRITES):
        context = {
            'validlink': False,
            'form': None,
            'title': _('Password reset unsuccessful'),
            'err_msg': SYSTEM_MAINTENANCE_MSG,
        }
        context.update(platform_name)
        return TemplateResponse(
            request, 'registration/password_reset_confirm.html', context
        )

    if request.method == 'POST':
        password = request.POST['new_password1']
        try:
            validate_password(password, user=user)
        except ValidationError as err:
            # We have a password reset attempt which violates some security
            # policy, or any other validation. Use the existing Django template to communicate that
            # back to the user.
            context = {
                'validlink': True,
                'form': None,
                'title': _('Password reset unsuccessful'),
                'err_msg': err.message,
            }
            context.update(platform_name)
            return TemplateResponse(
                request, 'registration/password_reset_confirm.html', context
            )

        # remember what the old password hash is before we call down
        old_password_hash = user.password

        if 'is_account_recovery' in request.GET:
            response = password_reset_confirm(
                request,
                uidb64=uidb64,
                token=token,
                extra_context=platform_name,
                template_name='registration/password_reset_confirm.html',
                post_reset_redirect='signin_user',
            )
        else:
            response = password_reset_confirm(
                request, uidb64=uidb64, token=token, extra_context=platform_name
            )

        # If password reset was unsuccessful a template response is returned (status_code 200).
        # Check if form is invalid then show an error to the user.
        # Note if password reset was successful we get response redirect (status_code 302).
        if response.status_code == 200:
            form_valid = response.context_data['form'].is_valid() if response.context_data['form'] else False
            if not form_valid:
                log.warning(
                    u'Unable to reset password for user [%s] because form is not valid. '
                    u'A possible cause is that the user had an invalid reset token',
                    user.username,
                )
                response.context_data['err_msg'] = _('Error in resetting your password. Please try again.')
                return response

        # get the updated user
        updated_user = User.objects.get(id=uid_int)
        if 'is_account_recovery' in request.GET:
            try:
                updated_user.email = updated_user.account_recovery.secondary_email
                updated_user.account_recovery.delete()
                # emit an event that the user changed their secondary email to the primary email
                tracker.emit(
                    SETTING_CHANGE_INITIATED,
                    {
                        "setting": "email",
                        "old": user.email,
                        "new": updated_user.email,
                        "user_id": updated_user.id,
                    }
                )
            except ObjectDoesNotExist:
                log.error(
                    'Account recovery process initiated without AccountRecovery instance for user {username}'.format(
                        username=updated_user.username
                    )
                )
        updated_user.save()
        if updated_user.password != old_password_hash:
            entry = PasswordHistory()
            entry.create(updated_user)

        if response.status_code == 302 and 'is_account_recovery' in request.GET:
            messages.success(
                request,
                HTML(_(
                    '{html_start}Password Creation Complete{html_end}'
                    'Your password has been created. {bold_start}{email}{bold_end} is now your primary login email.'
                )).format(
                    support_url=configuration_helpers.get_value('SUPPORT_SITE_LINK', settings.SUPPORT_SITE_LINK),
                    html_start=HTML('<p class="message-title">'),
                    html_end=HTML('</p>'),
                    bold_start=HTML('<b>'),
                    bold_end=HTML('</b>'),
                    email=updated_user.email,
                ),
                extra_tags='account-recovery aa-icon submission-success'
            )

        # did the password hash change, if so record it in the PasswordHistory


        if UserRetirementRequest.has_user_requested_retirement(user):
            # UserRetirementStatus
            try:

                retirmentstatus = UserRetirementStatus.objects.filter(user=user)
                if retirmentstatus:
                    for email in retirmentstatus:
                        get_primary_email = email.original_email
                    retirmentstatus.delete()
                userretirment = UserRetirementRequest.objects.filter(user=user)
                if userretirment:
                    userretirment.delete()

                # delete retirment model
            except Exception as err:
                lmslog.info("Erro Occured wile deleting retirement request==")
                lmslog.info("Error type is : %s " % err)

            check_account_recovery = AccountRecovery.objects.filter(user=user)
            if check_account_recovery:
                check_account_recovery.delete()
        if get_primary_email:
                obj, creating =AccountRecovery.objects.get_or_create(user=user, secondary_email=get_primary_email, is_active=True)
        

    else:
        response = password_reset_confirm(
            request, uidb64=uidb64, token=token, extra_context=platform_name
        )

        response_was_successful = response.context_data.get('validlink')
        if response_was_successful and not user.is_active:
            user.is_active = True
            user.save()

    return response


def validate_new_email(user, new_email):
    """
    Given a new email for a user, does some basic verification of the new address If any issues are encountered
    with verification a ValueError will be thrown.
    """
    try:
        validate_email(new_email)
    except ValidationError:
        raise ValueError(_('Valid e-mail address required.'))

    if new_email == user.email:
        raise ValueError(_('Old email is the same as the new email.'))

    if email_exists_or_retired(new_email):
        raise ValueError(_('An account with this e-mail already exists.'))


def validate_secondary_email(account_recovery, new_email):
    """
    Enforce valid email addresses.
    """

    from openedx.core.djangoapps.user_api.accounts.api import get_email_validation_error, \
        get_secondary_email_validation_error

    if get_email_validation_error(new_email):
        raise ValueError(_('Valid e-mail address required.'))

    if new_email == account_recovery.secondary_email:
        raise ValueError(_('Old email is the same as the new email.'))

    # Make sure that secondary email address is not same as user's primary email.
    if new_email == account_recovery.user.email:
        raise ValueError(_('Cannot be same as your sign in email address.'))

    # Make sure that secondary email address is not same as any of the primary emails currently in use or retired
    if email_exists_or_retired(new_email):
        raise ValueError(
            _("It looks like {email} belongs to an existing account. Try again with a different email address.").format(
                email=new_email
            )
        )

    message = get_secondary_email_validation_error(new_email)
    if message:
        raise ValueError(message)



def do_email_change_request(user, new_email, activation_key=None, secondary_email_change_request=False):
    """
    Given a new email for a user, does some basic verification of the new address and sends an activation message
    to the new address. If any issues are encountered with verification or sending the message, a ValueError will
    be thrown.
    """
    # pec_list = PendingEmailChange.objects.filter(user=user)
    # if len(pec_list) == 0:
    #     pec = PendingEmailChange()
    #     pec.user = user
    # else:
    #     pec = pec_list[0]

    # # if activation_key is not passing as an argument, generate a random key
    # if not activation_key:
    #     activation_key = uuid.uuid4().hex

    # pec.new_email = new_email
    # pec.activation_key = activation_key
    # pec.save()

    # context = {
    #     'key': pec.activation_key,
    #     'old_email': user.email,
    #     'new_email': pec.new_email
    # }

    # subject = render_to_string('emails/email_change_subject.txt', context)
    # subject = ''.join(subject.splitlines())

    # message = render_to_string('emails/email_change.txt', context)

    # from_address = configuration_helpers.get_value(
    #     'email_from_address',
    #     settings.DEFAULT_FROM_EMAIL
    # )
    # try:
    #     mail.send_mail(subject, message, from_address, [pec.new_email])
    # except Exception:
    #     log.error(u'Unable to send email activation link to user from "%s"', from_address, exc_info=True)
    #     raise ValueError(_('Unable to send email activation link. Please try again later.'))

    # # When the email address change is complete, a "edx.user.settings.changed" event will be emitted.
    # # But because changing the email address is multi-step, we also emit an event here so that we can
    # # track where the request was initiated.
    # tracker.emit(
    #     SETTING_CHANGE_INITIATED,
    #     {
    #         "setting": "email",
    #         "old": context['old_email'],
    #         "new": context['new_email'],
    #         "user_id": user.id,
    #     }
    # )






    if not activation_key:
        activation_key = uuid.uuid4().hex

    confirm_link = reverse('confirm_email_change', kwargs={'key': activation_key, })

    if secondary_email_change_request:
        PendingSecondaryEmailChange.objects.update_or_create(
            user=user,
            defaults={
                'new_secondary_email': new_email,
                'activation_key': activation_key,
            }
        )
        confirm_link = reverse('activate_secondary_email', kwargs={'key': activation_key})
    else:
        PendingEmailChange.objects.update_or_create(
            user=user,
            defaults={
                'new_email': new_email,
                'activation_key': activation_key,
            }
        )

    use_https = theming_helpers.get_current_request().is_secure()

    site = Site.objects.get_current()
    message_context = get_base_template_context(site)
    message_context.update({
        'old_email': user.email,
        'new_email': new_email,
        'confirm_link': '{protocol}://{site}{link}'.format(
            protocol='https' if use_https else 'http',
            site=configuration_helpers.get_value('SITE_NAME', settings.SITE_NAME),
            link=confirm_link,
        ),
    })

    if secondary_email_change_request:
        msg = RecoveryEmailCreate().personalize(
            recipient=Recipient(user.username, new_email),
            language=preferences_api.get_user_preference(user, LANGUAGE_KEY),
            user_context=message_context,
        )
    else:
        msg = EmailChange().personalize(
            recipient=Recipient(user.username, new_email),
            language=preferences_api.get_user_preference(user, LANGUAGE_KEY),
            user_context=message_context,
        )

    try:
        ace.send(msg)
    except Exception:
        from_address = configuration_helpers.get_value('email_from_address', settings.DEFAULT_FROM_EMAIL)
        log.error(u'Unable to send email activation link to user from "%s"', from_address, exc_info=True)
        raise ValueError(_('Unable to send email activation link. Please try again later.'))

    if not secondary_email_change_request:
        # When the email address change is complete, a "edx.user.settings.changed" event will be emitted.
        # But because changing the email address is multi-step, we also emit an event here so that we can
        # track where the request was initiated.
        tracker.emit(
            SETTING_CHANGE_INITIATED,
            {
                "setting": "email",
                "old": message_context['old_email'],
                "new": message_context['new_email'],
                "user_id": user.id,
            }
        )


@ensure_csrf_cookie
def activate_secondary_email(request, key):  # pylint: disable=unused-argument
    """
    This is called when the activation link is clicked. We activate the secondary email
    for the requested user.
    """
    try:
        pending_secondary_email_change = PendingSecondaryEmailChange.objects.get(activation_key=key)
    except PendingSecondaryEmailChange.DoesNotExist:
        return render_to_response("invalid_email_key.html", {})

    try:
        account_recovery_obj = AccountRecovery.objects.get(user_id=pending_secondary_email_change.user)
    except AccountRecovery.DoesNotExist:
        return render_to_response("secondary_email_change_failed.html", {
            'secondary_email': pending_secondary_email_change.new_secondary_email
        })

    account_recovery_obj.is_active = True
    account_recovery_obj.save()
    return render_to_response("secondary_email_change_successful.html")




@ensure_csrf_cookie
def confirm_email_change(request, key):  # pylint: disable=unused-argument
    """
    User requested a new e-mail. This is called when the activation
    link is clicked. We confirm with the old e-mail, and update
    """
    if waffle().is_enabled(PREVENT_AUTH_USER_WRITES):
        return render_to_response('email_change_failed.html', {'err_msg': SYSTEM_MAINTENANCE_MSG})

    with transaction.atomic():
        try:
            pec = PendingEmailChange.objects.get(activation_key=key)
        except PendingEmailChange.DoesNotExist:
            response = render_to_response("invalid_email_key.html", {})
            transaction.set_rollback(True)
            return response

        user = pec.user
        address_context = {
            'old_email': user.email,
            'new_email': pec.new_email
        }

        if len(User.objects.filter(email=pec.new_email)) != 0:
            response = render_to_response("email_exists.html", {})
            transaction.set_rollback(True)
            return response

        subject = render_to_string('emails/email_change_subject.txt', address_context)
        subject = ''.join(subject.splitlines())
        message = render_to_string('emails/confirm_email_change.txt', address_context)
        u_prof = UserProfile.objects.get(user=user)
        meta = u_prof.get_meta()
        if 'old_emails' not in meta:
            meta['old_emails'] = []
        meta['old_emails'].append([user.email, datetime.datetime.now(UTC).isoformat()])
        u_prof.set_meta(meta)
        u_prof.save()
        # Send it to the old email...
        try:
            user.email_user(
                subject,
                message,
                configuration_helpers.get_value('email_from_address', settings.DEFAULT_FROM_EMAIL)
            )
        except Exception:    # pylint: disable=broad-except
            log.warning('Unable to send confirmation email to old address', exc_info=True)
            response = render_to_response("email_change_failed.html", {'email': user.email})
            transaction.set_rollback(True)
            return response

        user.email = pec.new_email
        user.save()
        pec.delete()
        # And send it to the new email...
        try:
            user.email_user(
                subject,
                message,
                configuration_helpers.get_value('email_from_address', settings.DEFAULT_FROM_EMAIL)
            )
        except Exception:  # pylint: disable=broad-except
            log.warning('Unable to send confirmation email to new address', exc_info=True)
            response = render_to_response("email_change_failed.html", {'email': pec.new_email})
            transaction.set_rollback(True)
            return response

        response = render_to_response("email_change_successful.html", address_context)
        return response


@require_POST
@login_required
@ensure_csrf_cookie
def change_email_settings(request):
    """
    Modify logged-in user's setting for receiving emails from a course.
    """
    user = request.user

    course_id = request.POST.get("course_id")
    course_key = CourseKey.from_string(course_id)
    receive_emails = request.POST.get("receive_emails")
    if receive_emails:
        optout_object = Optout.objects.filter(user=user, course_id=course_key)
        if optout_object:
            optout_object.delete()
        log.info(
            u"User %s (%s) opted in to receive emails from course %s",
            user.username,
            user.email,
            course_id,
        )
        track.views.server_track(
            request,
            "change-email-settings",
            {"receive_emails": "yes", "course": course_id},
            page='dashboard',
        )
    else:
        Optout.objects.get_or_create(user=user, course_id=course_key)
        log.info(
            u"User %s (%s) opted out of receiving emails from course %s",
            user.username,
            user.email,
            course_id,
        )
        track.views.server_track(
            request,
            "change-email-settings",
            {"receive_emails": "no", "course": course_id},
            page='dashboard',
        )

    return JsonResponse({"success": True})


@ensure_csrf_cookie
def text_me_the_app(request):
    """
    Text me the app view.
    """
    text_me_fragment = TextMeTheAppFragmentView().render_to_fragment(request)
    context = {
        'nav_hidden': True,
        'show_dashboard_tabs': True,
        'show_program_listing': ProgramsApiConfig.is_enabled(),
        'fragment': text_me_fragment
    }

    return render_to_response('text-me-the-app.html', context)

