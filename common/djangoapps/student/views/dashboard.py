"""
Dashboard view and supporting methods
"""

import logging
import csv
import time
import os
import email
import datetime
import re
from collections import defaultdict


from completion.exceptions import UnavailableCompletionData
from rest_framework import permissions, status
from completion.utilities import get_key_to_last_completed_course_block
from django.contrib.auth import authenticate, get_user_model, logout
from student.views.login import AuthFailedError, LoginFailures
from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.shortcuts import redirect
from django.utils.translation import ugettext as _
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User
from django.http import Http404, HttpResponse, HttpResponseNotFound, StreamingHttpResponse, HttpResponseRedirect

from opaque_keys.edx.keys import CourseKey
from pytz import UTC
from six import text_type, iteritems
from openedx.core.djangoapps.user_api.accounts.utils import is_secondary_email_feature_enabled_for_user
import track.views
from bulk_email.models import BulkEmailFlag, Optout  # pylint: disable=import-error
from course_modes.models import CourseMode
from courseware.access import has_access
from edxmako.shortcuts import render_to_response, render_to_string
from entitlements.models import CourseEntitlement
from lms.djangoapps.commerce.utils import EcommerceService  # pylint: disable=import-error
from lms.djangoapps.verify_student.services import IDVerificationService
from openedx.core.djangoapps import monitoring_utils
from openedx.core.djangoapps.catalog.utils import (
    get_programs,
    get_pseudo_session_for_entitlement,
    get_visible_sessions_for_entitlement
)
from openedx.core.djangoapps.credit.email_utils import get_credit_provider_display_names, make_providers_strings
from openedx.core.djangoapps.programs.models import ProgramsApiConfig
from openedx.core.djangoapps.programs.utils import ProgramDataExtender, ProgramProgressMeter
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers
from openedx.core.djangoapps.util.maintenance_banner import add_maintenance_banner
from openedx.core.djangoapps.waffle_utils import WaffleFlag, WaffleFlagNamespace
from openedx.core.djangolib.markup import HTML, Text
from openedx.features.enterprise_support.api import get_dashboard_consent_notification
from shoppingcart.api import order_history
from shoppingcart.models import CourseRegistrationCode, DonationConfiguration
from student.cookies import set_user_info_cookie
from student.helpers import cert_info, check_verify_status_by_course
from student.models import (
    CourseEnrollment,
    AccountRecovery,
    CourseEnrollmentAttribute,
    DashboardConfiguration,
    UserProfile,
    LoginUpdate,
    StudentCourseDetails,
    StudentCourseViews,
    StudentModuleViews,
    CohertsUserDetail,
    CohertsOrganization,
    OrganizationRegistration,
    CohertsUserGradeRecords,
    CourseProgress,
    TxShopDetails
)
from util.milestones_helpers import get_pre_requisite_courses_not_completed
from xmodule.modulestore.django import modulestore

# For custom progress bar
from openedx.features.course_experience.utils import get_course_outline_block_tree
from django.utils import timezone
from badges.models import BadgeAssertion, BadgeClass, CourseCompleteImageConfiguration, CourseCompleteBadges
from datetime import date, timedelta
from collections import Counter
import poplib
from email import parser
import imaplib

from util.json_request import JsonResponse
from django.shortcuts import render
from django.contrib.messages import get_messages
from student.cookies import delete_logged_in_cookies, set_logged_in_cookies
from django.template import RequestContext


log = logging.getLogger("edx.student")


def get_org_black_and_whitelist_for_site():
    """
    Returns the org blacklist and whitelist for the current site.

    Returns:
        (org_whitelist, org_blacklist): A tuple of lists of orgs that serve as
            either a blacklist or a whitelist of orgs for the current site. The
            whitelist takes precedence, and the blacklist is used if the
            whitelist is None.
    """
    # Default blacklist is empty.
    org_blacklist = None
    # Whitelist the orgs configured for the current site.  Each site outside
    # of edx.org has a list of orgs associated with its configuration.
    org_whitelist = configuration_helpers.get_current_site_orgs()

    if not org_whitelist:
        # If there is no whitelist, the blacklist will include all orgs that
        # have been configured for any other sites. This applies to edx.org,
        # where it is easier to blacklist all other orgs.
        org_blacklist = configuration_helpers.get_all_orgs()

    return org_whitelist, org_blacklist


def _get_recently_enrolled_courses(course_enrollments):
    """
    Given a list of enrollments, filter out all but recent enrollments.

    Args:
        course_enrollments (list[CourseEnrollment]): A list of course enrollments.

    Returns:
        list[CourseEnrollment]: A list of recent course enrollments.
    """
    seconds = DashboardConfiguration.current().recent_enrollment_time_delta
    time_delta = (datetime.datetime.now(UTC) - datetime.timedelta(seconds=seconds))
    return [
        enrollment for enrollment in course_enrollments
        # If the enrollment has no created date, we are explicitly excluding the course
        # from the list of recent enrollments.
        if enrollment.is_active and enrollment.created > time_delta
    ]


def _allow_donation(course_modes, course_id, enrollment):
    """
    Determines if the dashboard will request donations for the given course.

    Check if donations are configured for the platform, and if the current course is accepting donations.

    Args:
        course_modes (dict): Mapping of course ID's to course mode dictionaries.
        course_id (str): The unique identifier for the course.
        enrollment(CourseEnrollment): The enrollment object in which the user is enrolled

    Returns:
        True if the course is allowing donations.

    """
    if course_id not in course_modes:
        flat_unexpired_modes = {
            text_type(course_id): [mode for mode in modes]
            for course_id, modes in iteritems(course_modes)
        }
        flat_all_modes = {
            text_type(course_id): [mode.slug for mode in modes]
            for course_id, modes in iteritems(CourseMode.all_modes_for_courses([course_id]))
        }
        log.error(
            u'Can not find `%s` in course modes.`%s`. All modes: `%s`',
            course_id,
            flat_unexpired_modes,
            flat_all_modes
        )
    donations_enabled = configuration_helpers.get_value(
        'ENABLE_DONATIONS',
        DonationConfiguration.current().enabled
    )
    return (
        donations_enabled and
        enrollment.mode in course_modes[course_id] and
        course_modes[course_id][enrollment.mode].min_price == 0
    )


def _create_recent_enrollment_message(course_enrollments, course_modes):  # pylint: disable=invalid-name
    """
    Builds a recent course enrollment message.

    Constructs a new message template based on any recent course enrollments
    for the student.

    Args:
        course_enrollments (list[CourseEnrollment]): a list of course enrollments.
        course_modes (dict): Mapping of course ID's to course mode dictionaries.

    Returns:
        A string representing the HTML message output from the message template.
        None if there are no recently enrolled courses.

    """
    recently_enrolled_courses = _get_recently_enrolled_courses(course_enrollments)

    if recently_enrolled_courses:
        enrollments_count = len(recently_enrolled_courses)
        course_name_separator = ', '
        # If length of enrolled course 2, join names with 'and'
        if enrollments_count == 2:
            course_name_separator = _(' and ')

        course_names = course_name_separator.join(
            [enrollment.course_overview.display_name for enrollment in recently_enrolled_courses]
        )

        allow_donations = any(
            _allow_donation(course_modes, enrollment.course_overview.id, enrollment)
            for enrollment in recently_enrolled_courses
        )

        platform_name = configuration_helpers.get_value('platform_name', settings.PLATFORM_NAME)

        return render_to_string(
            'enrollment/course_enrollment_message.html',
            {
                'course_names': course_names,
                'enrollments_count': enrollments_count,
                'allow_donations': allow_donations,
                'platform_name': platform_name,
                'course_id': recently_enrolled_courses[0].course_overview.id if enrollments_count == 1 else None
            }
        )


def get_course_enrollments(user, org_whitelist, org_blacklist):
    """
    Given a user, return a filtered set of his or her course enrollments.

    Arguments:
        user (User): the user in question.
        org_whitelist (list[str]): If not None, ONLY courses of these orgs will be returned.
        org_blacklist (list[str]): Courses of these orgs will be excluded.

    Returns:
        generator[CourseEnrollment]: a sequence of enrollments to be displayed
        on the user's dashboard.
    """
    for enrollment in CourseEnrollment.enrollments_for_user_with_overviews_preload(user):

        # If the course is missing or broken, log an error and skip it.
        course_overview = enrollment.course_overview
        if not course_overview:
            log.error(
                "User %s enrolled in broken or non-existent course %s",
                user.username,
                enrollment.course_id
            )
            continue

        # Filter out anything that is not in the whitelist.
        if org_whitelist and course_overview.location.org not in org_whitelist:
            continue

        # Conversely, filter out any enrollments in the blacklist.
        elif org_blacklist and course_overview.location.org in org_blacklist:
            continue

        # Else, include the enrollment.
        else:
            yield enrollment


def get_filtered_course_entitlements(user, org_whitelist, org_blacklist):
    """
    Given a user, return a filtered set of his or her course entitlements.

    Arguments:
        user (User): the user in question.
        org_whitelist (list[str]): If not None, ONLY entitlements of these orgs will be returned.
        org_blacklist (list[str]): CourseEntitlements of these orgs will be excluded.

    Returns:
        generator[CourseEntitlement]: a sequence of entitlements to be displayed
        on the user's dashboard.
    """
    course_entitlement_available_sessions = {}
    unfulfilled_entitlement_pseudo_sessions = {}
    course_entitlements = list(CourseEntitlement.get_active_entitlements_for_user(user))
    filtered_entitlements = []
    pseudo_session = None
    course_run_key = None

    for course_entitlement in course_entitlements:
        course_entitlement.update_expired_at()
        available_runs = get_visible_sessions_for_entitlement(course_entitlement)

        if not course_entitlement.enrollment_course_run:
            # Unfulfilled entitlements need a mock session for metadata
            pseudo_session = get_pseudo_session_for_entitlement(course_entitlement)
            unfulfilled_entitlement_pseudo_sessions[str(course_entitlement.uuid)] = pseudo_session

        # Check the org of the Course and filter out entitlements that are not available.
        if course_entitlement.enrollment_course_run:
            course_run_key = course_entitlement.enrollment_course_run.course_id
        elif available_runs:
            course_run_key = CourseKey.from_string(available_runs[0]['key'])
        elif pseudo_session:
            course_run_key = CourseKey.from_string(pseudo_session['key'])

        if course_run_key:
            # If there is no course_run_key at this point we will be unable to determine if it should be shown.
            # Therefore it should be excluded by default.
            if org_whitelist and course_run_key.org not in org_whitelist:
                continue
            elif org_blacklist and course_run_key.org in org_blacklist:
                continue

            course_entitlement_available_sessions[str(course_entitlement.uuid)] = available_runs
            filtered_entitlements.append(course_entitlement)

    return filtered_entitlements, course_entitlement_available_sessions, unfulfilled_entitlement_pseudo_sessions


def complete_course_mode_info(course_id, enrollment, modes=None):
    """
    We would like to compute some more information from the given course modes
    and the user's current enrollment

    Returns the given information:
        - whether to show the course upsell information
        - numbers of days until they can't upsell anymore
    """
    if modes is None:
        modes = CourseMode.modes_for_course_dict(course_id)

    mode_info = {'show_upsell': False, 'days_for_upsell': None}
    # we want to know if the user is already enrolled as verified or credit and
    # if verified is an option.
    if CourseMode.VERIFIED in modes and enrollment.mode in CourseMode.UPSELL_TO_VERIFIED_MODES:
        mode_info['show_upsell'] = True
        mode_info['verified_sku'] = modes['verified'].sku
        mode_info['verified_bulk_sku'] = modes['verified'].bulk_sku
        # if there is an expiration date, find out how long from now it is
        if modes['verified'].expiration_datetime:
            today = datetime.datetime.now(UTC).date()
            mode_info['days_for_upsell'] = (modes['verified'].expiration_datetime.date() - today).days

    return mode_info


def is_course_blocked(request, redeemed_registration_codes, course_key):
    """
    Checking if registration is blocked or not.
    """
    blocked = False
    for redeemed_registration in redeemed_registration_codes:
        # registration codes may be generated via Bulk Purchase Scenario
        # we have to check only for the invoice generated registration codes
        # that their invoice is valid or not
        if redeemed_registration.invoice_item:
            if not redeemed_registration.invoice_item.invoice.is_valid:
                blocked = True
                # disabling email notifications for unpaid registration courses
                Optout.objects.get_or_create(user=request.user, course_id=course_key)
                log.info(
                    u"User %s (%s) opted out of receiving emails from course %s",
                    request.user.username,
                    request.user.email,
                    course_key,
                )
                track.views.server_track(
                    request,
                    "change-email1-settings",
                    {"receive_emails": "no", "course": text_type(course_key)},
                    page='dashboard',
                )
                break

    return blocked


def get_verification_error_reasons_for_display(verification_error_codes):
    """
    Returns the display text for the given verification error codes.
    """
    verification_errors = []
    verification_error_map = {
        'photos_mismatched': _('Photos are mismatched'),
        'id_image_missing_name': _('Name missing from ID photo'),
        'id_image_missing': _('ID photo not provided'),
        'id_invalid': _('ID is invalid'),
        'user_image_not_clear': _('Learner photo is blurry'),
        'name_mismatch': _('Name on ID does not match name on account'),
        'user_image_missing': _('Learner photo not provided'),
        'id_image_not_clear': _('ID photo is blurry'),
    }

    for error in verification_error_codes:
        error_text = verification_error_map.get(error)
        if error_text:
            verification_errors.append(error_text)

    return verification_errors


def reverification_info(statuses):
    """
    Returns reverification-related information for *all* of user's enrollments whose
    reverification status is in statuses.

    Args:
        statuses (list): a list of reverification statuses we want information for
            example: ["must_reverify", "denied"]

    Returns:
        dictionary of lists: dictionary with one key per status, e.g.
            dict["must_reverify"] = []
            dict["must_reverify"] = [some information]
    """
    reverifications = defaultdict(list)

    # Sort the data by the reverification_end_date
    for status in statuses:
        if reverifications[status]:
            reverifications[status].sort(key=lambda x: x.date)
    return reverifications


def _credit_statuses(user, course_enrollments):
    """
    Retrieve the status for credit courses.

    A credit course is a course for which a user can purchased
    college credit.  The current flow is:

    1. User becomes eligible for credit (submits verifications, passes the course, etc.)
    2. User purchases credit from a particular credit provider.
    3. User requests credit from the provider, usually creating an account on the provider's site.
    4. The credit provider notifies us whether the user's request for credit has been accepted or rejected.

    The dashboard is responsible for communicating the user's state in this flow.

    Arguments:
        user (User): The currently logged-in user.
        course_enrollments (list[CourseEnrollment]): List of enrollments for the
            user.

    Returns: dict

    The returned dictionary has keys that are `CourseKey`s and values that
    are dictionaries with:

        * eligible (bool): True if the user is eligible for credit in this course.
        * deadline (datetime): The deadline for purchasing and requesting credit for this course.
        * purchased (bool): Whether the user has purchased credit for this course.
        * provider_name (string): The display name of the credit provider.
        * provider_status_url (string): A URL the user can visit to check on their credit request status.
        * request_status (string): Either "pending", "approved", or "rejected"
        * error (bool): If true, an unexpected error occurred when retrieving the credit status,
            so the user should contact the support team.

    Example:
    >>> _credit_statuses(user, course_enrollments)
    {
        CourseKey.from_string("edX/DemoX/Demo_Course"): {
            "course_key": "edX/DemoX/Demo_Course",
            "eligible": True,
            "deadline": 2015-11-23 00:00:00 UTC,
            "purchased": True,
            "provider_name": "Hogwarts",
            "provider_status_url": "http://example.com/status",
            "request_status": "pending",
            "error": False
        }
    }

    """
    from openedx.core.djangoapps.credit import api as credit_api

    # Feature flag off
    if not settings.FEATURES.get("ENABLE_CREDIT_ELIGIBILITY"):
        return {}

    request_status_by_course = {
        request["course_key"]: request["status"]
        for request in credit_api.get_credit_requests_for_user(user.username)
    }

    credit_enrollments = {
        enrollment.course_id: enrollment
        for enrollment in course_enrollments
        if enrollment.mode == "credit"
    }

    # When a user purchases credit in a course, the user's enrollment
    # mode is set to "credit" and an enrollment attribute is set
    # with the ID of the credit provider.  We retrieve *all* such attributes
    # here to minimize the number of database queries.
    purchased_credit_providers = {
        attribute.enrollment.course_id: attribute.value
        for attribute in CourseEnrollmentAttribute.objects.filter(
            namespace="credit",
            name="provider_id",
            enrollment__in=credit_enrollments.values()
        ).select_related("enrollment")
    }

    provider_info_by_id = {
        provider["id"]: provider
        for provider in credit_api.get_credit_providers()
    }

    statuses = {}
    for eligibility in credit_api.get_eligibilities_for_user(user.username):
        course_key = CourseKey.from_string(text_type(eligibility["course_key"]))
        providers_names = get_credit_provider_display_names(course_key)
        status = {
            "course_key": text_type(course_key),
            "eligible": True,
            "deadline": eligibility["deadline"],
            "purchased": course_key in credit_enrollments,
            "provider_name": make_providers_strings(providers_names),
            "provider_status_url": None,
            "provider_id": None,
            "request_status": request_status_by_course.get(course_key),
            "error": False,
        }

        # If the user has purchased credit, then include information about the credit
        # provider from which the user purchased credit.
        # We retrieve the provider's ID from the an "enrollment attribute" set on the user's
        # enrollment when the user's order for credit is fulfilled by the E-Commerce service.
        if status["purchased"]:
            provider_id = purchased_credit_providers.get(course_key)
            if provider_id is None:
                status["error"] = True
                log.error(
                    u"Could not find credit provider associated with credit enrollment "
                    u"for user %s in course %s.  The user will not be able to see his or her "
                    u"credit request status on the student dashboard.  This attribute should "
                    u"have been set when the user purchased credit in the course.",
                    user.id, course_key
                )
            else:
                provider_info = provider_info_by_id.get(provider_id, {})
                status["provider_name"] = provider_info.get("display_name")
                status["provider_status_url"] = provider_info.get("status_url")
                status["provider_id"] = provider_id

        statuses[course_key] = status

    return statuses


def _get_urls_for_resume_buttons(user, enrollments):
    '''
    Checks whether a user has made progress in any of a list of enrollments.
    '''
    resume_button_urls = []
    for enrollment in enrollments:
        try:
            block_key = get_key_to_last_completed_course_block(user, enrollment.course_id)
            url_to_block = reverse(
                'jump_to',
                kwargs={'course_id': enrollment.course_id, 'location': block_key}
            )
        except UnavailableCompletionData:
            url_to_block = ''
        resume_button_urls.append(url_to_block)
    return resume_button_urls


    
def Merge(dict1, dict2): 
    return(dict2.update(dict1)) 


def order_confirmation(request):
    if request.method == 'POST':
        order_number = request.POST.get('order_number')
        order_number = str(order_number).strip()

        user = request.user
        try:
            organization = OrganizationRegistration.objects.get(organization_email=user.email)
        except:
            organization = None

        try:
            if not order_number:
                raise AuthFailedError(_('Please Enter Order Number to Login.'))
            else:
                try:
                    order_number = TxShopDetails.objects.get(transaction_id=order_number)
                except:
                    raise AuthFailedError(_("We haven't recieved your order confirmation yet.Please try again after sometime."))

                if not order_number.user:
                    organization.invoice_id = order_number.transaction_id
                    organization.package_total_price = order_number.transaction_amount
                    organization.payment_status = 'PAID'
                    organization.is_active = True
                    organization.paid = True                    
                    order_number.user = user
                    organization.save()
                    order_number.save()
                else:
                    log.info('Order Number belongs to a different User')
                    raise AuthFailedError(_('Order Number belongs to a different User.'))
            return HttpResponseRedirect('/dashboard')        

        except AuthFailedError as error:
            error_alert_message = error.get_response()
            messages.add_message(request, messages.ERROR, str(error_alert_message['value'])) 
            return render(request, 'order_confirmation.html', {})
    return render(request,'order_confirmation.html', {})



@login_required
@ensure_csrf_cookie
@add_maintenance_banner
def student_dashboard(request):
    """
    Provides the LMS dashboard view

    TODO: This is lms specific and does not belong in common code.

    Arguments:
        request: The request object.

    Returns:
        The dashboard response.

    """

    user = request.user  
    try:
        organization_token = OrganizationRegistration.objects.get(organization_email=user.email)
    except:
        organization_token = None

    if organization_token:
        if organization_token.payment_status == 'Pending':
            return HttpResponseRedirect(reverse('order_confirmation')) 
        elif organization_token.payment_status == 'cancelled' or organization_token.payment_status == 'registered':
            return HttpResponseRedirect(reverse('cancel_order'))
    else:
        pass


    from tracking.models import Visitor

    try:
        login_user = LoginUpdate.objects.get(action_user=user,date_updated=date.today())
    except:
        login_user = None

    if login_user:
        visitor_tracking_data = Visitor.objects.filter(user=user).first()
        visitor_date = time.strftime('%H:%M:%S', time.gmtime(visitor_tracking_data.time_on_site))
        login_user.total_time = visitor_date
        login_user.save()


    if not UserProfile.objects.filter(user=user).exists():
        return redirect(reverse('account_settings'))

    platform_name = configuration_helpers.get_value("platform_name", settings.PLATFORM_NAME)

    enable_verified_certificates = configuration_helpers.get_value(
        'ENABLE_VERIFIED_CERTIFICATES',
        settings.FEATURES.get('ENABLE_VERIFIED_CERTIFICATES')
    )
    display_course_modes_on_dashboard = configuration_helpers.get_value(
        'DISPLAY_COURSE_MODES_ON_DASHBOARD',
        settings.FEATURES.get('DISPLAY_COURSE_MODES_ON_DASHBOARD', True)
    )
    activation_email_support_link = configuration_helpers.get_value(
        'ACTIVATION_EMAIL_SUPPORT_LINK', settings.ACTIVATION_EMAIL_SUPPORT_LINK
    ) or settings.SUPPORT_SITE_LINK
    hide_dashboard_courses_until_activated = configuration_helpers.get_value(
        'HIDE_DASHBOARD_COURSES_UNTIL_ACTIVATED',
        settings.FEATURES.get('HIDE_DASHBOARD_COURSES_UNTIL_ACTIVATED', False)
    )
    empty_dashboard_message = configuration_helpers.get_value(
        'EMPTY_DASHBOARD_MESSAGE', None
    )

    # Get the org whitelist or the org blacklist for the current site
    site_org_whitelist, site_org_blacklist = get_org_black_and_whitelist_for_site()
    course_enrollments = list(get_course_enrollments(user, site_org_whitelist, site_org_blacklist))

    # Get the entitlements for the user and a mapping to all available sessions for that entitlement
    # If an entitlement has no available sessions, pass through a mock course overview object
    (course_entitlements,
     course_entitlement_available_sessions,
     unfulfilled_entitlement_pseudo_sessions) = get_filtered_course_entitlements(
        user,
        site_org_whitelist,
        site_org_blacklist
    )

    # Record how many courses there are so that we can get a better
    # understanding of usage patterns on prod.
    monitoring_utils.accumulate('num_courses', len(course_enrollments))

    # Sort the enrollment pairs by the enrollment date
    course_enrollments.sort(key=lambda x: x.created, reverse=True)


    enrolled_course_ids = [enrollment.course_id for enrollment in course_enrollments]
    __, unexpired_course_modes = CourseMode.all_and_unexpired_modes_for_courses(enrolled_course_ids)
    course_modes_by_course = {
        course_id: {
            mode.slug: mode
            for mode in modes
        }
        for course_id, modes in iteritems(unexpired_course_modes)
    }

    # Check to see if the student has recently enrolled in a course.
    # If so, display a notification message confirming the enrollment.
    enrollment_message = _create_recent_enrollment_message(
        course_enrollments, course_modes_by_course
    )
    course_optouts = Optout.objects.filter(user=user).values_list('course_id', flat=True)
    ut_support_link = 'discoveringvbhc@dellmed.utexas.edu'
    # Display activation message
    activate_account_message = ''
    if not user.is_active:
        activate_account_message = Text(_(
            "Check your {email_start}{email}{email_end} inbox for an account activation link from {platform_name}. "
            "If you need help, contact {link_start} discoveringvbhc@dellmed.utexas.edu {link_end}."
        )).format(
            platform_name=platform_name,
            email_start=HTML("<strong>"),
            email_end=HTML("</strong>"),
            email=user.email,
            link_start=HTML("<a href='mailto: {ut_support_link}?subject = Feedback&body = Message'>").format(
                ut_support_link=ut_support_link,
            ),
            link_end=HTML("</a>"),
        )

    enterprise_message = get_dashboard_consent_notification(request, user, course_enrollments)

    

    recovery_email_message = recovery_email_activation_message = None
    if is_secondary_email_feature_enabled_for_user(user=user):
        try:
            account_recovery_obj = AccountRecovery.objects.get(user=user)
        except AccountRecovery.DoesNotExist:
            recovery_email_message = Text(
                _(
                    "Add a recovery email to retain access when single-sign on is not available. "
                    "Go to your Account Settings.")
            )
            # .format(
            #     link_start=HTML("<a href='{account_setting_page}'>").format(
            #         account_setting_page=reverse('account_settings'),
            #     ),
            #     link_end=HTML("</a>")
            # )
        else:
            if not account_recovery_obj.is_active:
                recovery_email_activation_message = Text(
                    _(
                        "Recovery email is not activated yet. "
                        "Kindly visit your email and follow the instructions to activate it."
                    )
                )

    # Disable lookup of Enterprise consent_required_course due to ENT-727
    # Will re-enable after fixing WL-1315
    consent_required_courses = set()
    enterprise_customer_name = None

    # Account activation message
    account_activation_messages = [
        message for message in messages.get_messages(request) if 'account-activation' in message.tags
    ]

    # Global staff can see what courses encountered an error on their dashboard
    staff_access = False
    errored_courses = {}
    if has_access(user, 'staff', 'global'):
        # Show any courses that encountered an error on load
        staff_access = True
        errored_courses = modulestore().get_errored_courses()

    show_courseware_links_for = frozenset(
        enrollment.course_id for enrollment in course_enrollments
        if has_access(request.user, 'load', enrollment.course_overview)
    )

    # Find programs associated with course runs being displayed. This information
    # is passed in the template context to allow rendering of program-related
    # information on the dashboard.
    meter = ProgramProgressMeter(request.site, user, enrollments=course_enrollments)
    ecommerce_service = EcommerceService()
    inverted_programs = meter.invert_programs()

    urls, programs_data = {}, {}
    bundles_on_dashboard_flag = WaffleFlag(WaffleFlagNamespace(name=u'student.experiments'), u'bundles_on_dashboard')

    # TODO: Delete this code and the relevant HTML code after testing LEARNER-3072 is complete
    if bundles_on_dashboard_flag.is_enabled() and inverted_programs and inverted_programs.items():
        if len(course_enrollments) < 4:
            for program in inverted_programs.values():
                try:
                    program_uuid = program[0]['uuid']
                    program_data = get_programs(request.site, uuid=program_uuid)
                    program_data = ProgramDataExtender(program_data, request.user).extend()
                    skus = program_data.get('skus')
                    checkout_page_url = ecommerce_service.get_checkout_page_url(*skus)
                    program_data['completeProgramURL'] = checkout_page_url + '&bundle=' + program_data.get('uuid')
                    programs_data[program_uuid] = program_data
                except:  # pylint: disable=bare-except
                    pass

    # Construct a dictionary of course mode information
    # used to render the course list.  We re-use the course modes dict
    # we loaded earlier to avoid hitting the database.
    course_mode_info = {
        enrollment.course_id: complete_course_mode_info(
            enrollment.course_id, enrollment,
            modes=course_modes_by_course[enrollment.course_id]
        )
        for enrollment in course_enrollments
    }

    # Determine the per-course verification status
    # This is a dictionary in which the keys are course locators
    # and the values are one of:
    #
    # VERIFY_STATUS_NEED_TO_VERIFY
    # VERIFY_STATUS_SUBMITTED
    # VERIFY_STATUS_APPROVED
    # VERIFY_STATUS_MISSED_DEADLINE
    #
    # Each of which correspond to a particular message to display
    # next to the course on the dashboard.
    #
    # If a course is not included in this dictionary,
    # there is no verification messaging to display.
    verify_status_by_course = check_verify_status_by_course(user, course_enrollments)
    cert_statuses = {
        enrollment.course_id: cert_info(request.user, enrollment.course_overview)
        for enrollment in course_enrollments
    }

    # only show email settings for Mongo course and when bulk email is turned on
    show_email_settings_for = frozenset(
        enrollment.course_id for enrollment in course_enrollments if (
            BulkEmailFlag.feature_enabled(enrollment.course_id)
        )
    )

    # Verification Attempts
    # Used to generate the "you must reverify for course x" banner
    verification_status = IDVerificationService.user_status(user)
    verification_errors = get_verification_error_reasons_for_display(verification_status['error'])

    # Gets data for midcourse reverifications, if any are necessary or have failed
    statuses = ["approved", "denied", "pending", "must_reverify"]
    reverifications = reverification_info(statuses)

    block_courses = frozenset(
        enrollment.course_id for enrollment in course_enrollments
        if is_course_blocked(
            request,
            CourseRegistrationCode.objects.filter(
                course_id=enrollment.course_id,
                registrationcoderedemption__redeemed_by=request.user
            ),
            enrollment.course_id
        )
    )

    enrolled_courses_either_paid = frozenset(
        enrollment.course_id for enrollment in course_enrollments
        if enrollment.is_paid_course()
    )

    # If there are *any* denied reverifications that have not been toggled off,
    # we'll display the banner
    denied_banner = any(item.display for item in reverifications["denied"])

    # Populate the Order History for the side-bar.
    order_history_list = order_history(
        user,
        course_org_filter=site_org_whitelist,
        org_filter_out_set=site_org_blacklist
    )

    # get list of courses having pre-requisites yet to be completed
    courses_having_prerequisites = frozenset(
        enrollment.course_id for enrollment in course_enrollments
        if enrollment.course_overview.pre_requisite_courses
    )
    courses_requirements_not_met = get_pre_requisite_courses_not_completed(user, courses_having_prerequisites)

    if 'notlive' in request.GET:
        redirect_message = _("The course you are looking for does not start until {date}.").format(
            date=request.GET['notlive']
        )
    elif 'course_closed' in request.GET:
        redirect_message = _("The course you are looking for is closed for enrollment as of {date}.").format(
            date=request.GET['course_closed']
        )
    else:
        redirect_message = ''

    valid_verification_statuses = ['approved', 'must_reverify', 'pending', 'expired']
    display_sidebar_on_dashboard = (len(order_history_list) or
                                    (verification_status['status'] in valid_verification_statuses and
                                    verification_status['should_display']))

    # Filter out any course enrollment course cards that are associated with fulfilled entitlements
    for entitlement in [e for e in course_entitlements if e.enrollment_course_run is not None]:
        course_enrollments = [
            enr for enr in course_enrollments if entitlement.enrollment_course_run.course_id != enr.course_id
        ]
    
    # For custom progress bar on student dashboard page
    students_data_dict = {}
    complete_list = []


    for enrollment in course_enrollments:
        value_unicode = str(enrollment.course_id).decode("utf-8")
        course_block_tree = get_course_outline_block_tree(request,value_unicode)
        course_sections_v = course_block_tree.get('children')
        complete_list.append(course_block_tree)

        blocks_view = {
            'blocks': course_block_tree
        }

        course_sections_view = blocks_view['blocks'].get('children')         

        if course_sections_view is not None:
            for section in course_sections_view:  
                if section.get('display_name'):
                    students_data_dict['section_name'] = section['display_name']
                    students_data_dict['completed'] = section['complete']


        if 'section_name' and 'completed' in students_data_dict.keys():
            try: 
                student_details,created_student_details = StudentCourseDetails.objects.get_or_create(user=user,module_name=enrollment.course_overview.display_name_with_default,section=students_data_dict['section_name'],date_updated=date.today())                
                if created_student_details:
                    student_details.completed = students_data_dict['completed']
                    student_details.save()
                    
            except StudentCourseDetails.MultipleObjectsReturned as ex:
                dups = StudentCourseDetails.objects.filter(user=user,module_name=enrollment.course_overview.display_name_with_default,section=students_data_dict['section_name'],date_updated=date.today())
                student_details = dups[0]
                for dup in dups[1:]:                    
                    log.info('Deleting duplicate %s' % dup)
                    dup.delete()

        students_data_dict = {}    

    context = {
        'urls': urls,
        'programs_data': programs_data,
        'enterprise_message': enterprise_message,
        'consent_required_courses': consent_required_courses,
        'enterprise_customer_name': enterprise_customer_name,
        'enrollment_message': enrollment_message,
        'redirect_message': redirect_message,
        'account_activation_messages': account_activation_messages,
        'activate_account_message': activate_account_message,
        'course_enrollments': course_enrollments,
        'course_entitlements': course_entitlements,
        'course_entitlement_available_sessions': course_entitlement_available_sessions,
        'unfulfilled_entitlement_pseudo_sessions': unfulfilled_entitlement_pseudo_sessions,
        'course_optouts': course_optouts,
        'staff_access': staff_access,
        'errored_courses': errored_courses,
        'show_courseware_links_for': show_courseware_links_for,
        'all_course_modes': course_mode_info,
        'cert_statuses': cert_statuses,
        'credit_statuses': _credit_statuses(user, course_enrollments),
        'show_email_settings_for': show_email_settings_for,
        'reverifications': reverifications,
        'verification_display': verification_status['should_display'],
        'verification_status': verification_status['status'],
        'verification_status_by_course': verify_status_by_course,
        'verification_errors': verification_errors,
        'block_courses': block_courses,
        'denied_banner': denied_banner,
        'billing_email': settings.PAYMENT_SUPPORT_EMAIL,
        'user': user,
        'recovery_email_activation_message':recovery_email_activation_message,
        'recovery_email_message':recovery_email_message,
        'logout_url': reverse('logout'),
        'platform_name': platform_name,
        'enrolled_courses_either_paid': enrolled_courses_either_paid,
        'provider_states': [],
        'order_history_list': order_history_list,
        'courses_requirements_not_met': courses_requirements_not_met,
        'nav_hidden': True,
        'inverted_programs': inverted_programs,
        'show_program_listing': ProgramsApiConfig.is_enabled(),
        'show_dashboard_tabs': True,
        'disable_courseware_js': True,
        'display_course_modes_on_dashboard': enable_verified_certificates and display_course_modes_on_dashboard,
        'display_sidebar_on_dashboard': display_sidebar_on_dashboard,
        'display_sidebar_account_activation_message': not(user.is_active or hide_dashboard_courses_until_activated),
        'display_dashboard_courses': (user.is_active or not hide_dashboard_courses_until_activated),
        'empty_dashboard_message': empty_dashboard_message,
        'blocks_list': complete_list, # For custom progress bar on student dashboard

    }  

    try:
        staff_organization1 = UserProfile.objects.get(user=user)
        if staff_organization1.organization:
            staff_organization = staff_organization1.organization
        else:
            staff_organization = None
    except:
        staff_organization = None
    #Read/Write to CSV Files (Student-Admin Dashboard)
    csv_path = os.path.dirname(__file__)
    data_folder = os.path.join(str(csv_path), "student_data_csvs")

    if user.is_staff and staff_organization is not None:
        total_cohort_list = []
        cohorts_data = {}  

        cohorts_only_dict = []

        cohort_cohert = None       

        try:
            organization_name = OrganizationRegistration.objects.get(organization_name=staff_organization)
        except: 
            logout(request)
            messages.add_message(request, messages.ERROR, 'no_organization_staff_logout')  
            return HttpResponseRedirect('/login')                 
            

        cohorts = CohertsOrganization.objects.filter(organization=organization_name)
        cohorts_data_list = []
        for cohort_li in cohorts:
            total_cohort_list.append(cohort_li.coherts_name)

        for cohort_l in total_cohort_list:

            cohort_ob = CohertsOrganization.objects.get(coherts_name=cohort_l, organization=organization_name)
            
            cohort_user_val = CohertsUserGradeRecords.objects.filter(coherts_name=cohort_ob)  

            if not cohort_user_val:
                try:
                    cohort_cohert = CohertsOrganization.objects.get(coherts_name=cohort_l, organization=organization_name).coherts_name
                except:
                    cohort_ob = None


            for cohorts_user_value in cohort_user_val:
                key = cohort_l
                cohorts_data.setdefault(key, {})       
                
                user_prof = User.objects.get(username=cohorts_user_value.user_id)

                try:                    
                    progress_course = CourseProgress.objects.get(user=user_prof,course_id=cohorts_user_value.course_id).student_course_progress
                except:
                    progress_course = 0

                if progress_course == 0:
                    if cohorts_data.values():
                        for not_started_key in cohorts_data.values():
                            if 'not started' in not_started_key:
                                not_started_key['not started'] +=1
                            else:
                                cohorts_data[key].update({'not started': 1})
                    else:
                        cohorts_data[key].update({'not started': 1})

                elif progress_course == 100:
                    if cohorts_data.values():                            
                        for completed_key in cohorts_data.values():

                            if 'completed' in completed_key:
                                completed_key['completed'] +=1
                            else:
                                cohorts_data[key].update({'completed': 1})
                    else:
                        cohorts_data[key].update({'completed': 1})

                else:
                    if cohorts_data.values():
                        for started_key in cohorts_data.values():

                            if 'started' in started_key:
                                started_key['started'] +=1
                            else:
                                cohorts_data[key].update({'started': 1})
                    else:
                        cohorts_data[key].update({'started': 1})

            cohorts_data_list.append(cohorts_data)            
            cohorts_data = {}                  


        cohort_module_details = os.path.join(str(data_folder), "cohort_details.csv")
        with open(cohort_module_details, 'w') as cohort_module_csv:
            cohort_writer_module = csv.writer(cohort_module_csv)
            fieldnames = ['cohort','organization','not started', 'started', 'completed']
            cohort_writer_module = csv.DictWriter(cohort_module_csv, fieldnames=fieldnames)
            cohort_writer_module.writeheader()
            for cohort_values_list in cohorts_data_list:
                for cohort_key,cohort_value in cohort_values_list.items():
                    cohorts_only_dict.append(cohort_key)

                    res = Counter(cohort_value)
                    cohort_a = {'cohort': cohort_key, 'organization': staff_organization}
                    cohort_b = dict(res)
                    cohort_c = {}

                    fields = ['not started', 'started', 'completed']
                    key_not_present = [cohortkey for cohortkey in fields if cohortkey not in cohort_b.keys()]

                    for not_present in key_not_present:
                        cohort_c[not_present] = 0 

                    Merge(cohort_c,cohort_b)
                    Merge(cohort_a,cohort_b)
                    cohort_writer_module.writerow(cohort_b)

            empty_cohort = list(set(total_cohort_list) - set(cohorts_only_dict))

            if empty_cohort:
                for emp_cohort in empty_cohort:
                    empty_cohort_dict = {'cohort': emp_cohort, 'organization': staff_organization, 'not started': 0, 'completed': 0, 'started': 0}
                    cohort_writer_module.writerow(empty_cohort_dict)

                empty_cohort_dict = {}


    elif staff_organization and not user.is_staff:

        course_ids = [enrollment.course_id for enrollment in course_enrollments]

        from openedx.core.djangoapps.content.course_overviews.models import CourseOverview

        badge_module = os.path.join(str(data_folder), "student_badges.csv")
        with open(badge_module, 'w') as badge_csvfile_module: 
            student_badges_dict = {}

            badge_writer_module = csv.writer(badge_csvfile_module)
            fieldnames_student = ['Student','ModuleName','Organization','Badge','Certificate','Progress','Grade','Homework','Midterm Exam','Final Exam','Entrance Exam']
            badge_writer_module = csv.DictWriter(badge_csvfile_module, fieldnames=fieldnames_student)
            badge_writer_module.writeheader()

            for courseids in course_ids:
                user_badges = BadgeClass.objects.filter(course_id=courseids)
                badges = BadgeAssertion.objects.filter(user=user)
                course_name = CourseOverview.objects.select_related('image_set').get(id=courseids)
                progress_details = CourseProgress.objects.filter(user=user,course_id=courseids)
                from courseware.views.views import student_progress
                get_grade = student_progress(request,u'%s'%courseids,student_id=user.id)

                # total_percent = get_grade['grade_summary']                
                for key,value in cert_statuses.items():
                    course_name_cert = CourseOverview.objects.get(id=key)
                    data = value['status']
               
                    if str(course_name.display_name) == str(course_name_cert.display_name):
                        if data == 'downloadable':
                            student_badges_dict['Certificate'] = 1
                        else:
                            student_badges_dict['Certificate'] = 0 
                
                badges_count = 0
                for progress_key in progress_details:    
                    if badges:
                        # for badge in badges:
                            # badges_count +=1
                        student_badges_dict['Student'] = user.username
                        student_badges_dict['ModuleName'] = course_name.display_name
                        student_badges_dict['Organization'] = staff_organization
                        student_badges_dict['Badge'] = len(badges)
                        student_badges_dict['Progress'] = progress_key.student_course_progress
                        # student_badges_dict['Grade'] = total_percent['percent']*100
                        # student_badges_dict['Homework'] = dict(total_percent['grade_breakdown'])['Homework']['detail']
                        
                        # if 'Midterm Exam' in dict(total_percent['grade_breakdown']):
                        #     student_badges_dict['Midterm Exam'] = dict(total_percent['grade_breakdown'])['Midterm Exam']['detail']

                        if 'Entrance Exam' in dict(get_grade): 
                            entrance_exam_value = get_grade['Entrance Exam'].split('=')[1]
                            entrance_exam_value = entrance_exam_value.replace('%','')
                            student_badges_dict['Entrance Exam'] = entrance_exam_value                      

                        if 'Final Exam' in dict(get_grade):
                            final_exam_value = get_grade['Final Exam'].split('=')[1]
                            final_exam_value = final_exam_value.replace('%','')
                            student_badges_dict['Final Exam'] = final_exam_value

                        badge_writer_module.writerow(student_badges_dict)      
                    else:   
                        student_badges_dict['Student'] = user.username
                        student_badges_dict['ModuleName'] = course_name.display_name
                        student_badges_dict['Organization'] = staff_organization
                        student_badges_dict['Badge'] = 0
                        student_badges_dict['Progress'] = progress_key.student_course_progress
                        # student_badges_dict['Grade'] = total_percent['percent']*100
                        # student_badges_dict['Homework'] = dict(total_percent['grade_breakdown'])['Homework']['detail']

                        # if 'Midterm Exam' in dict(total_percent['grade_breakdown']):
                        #     student_badges_dict['Midterm Exam'] = dict(total_percent['grade_breakdown'])['Midterm Exam']['detail']

                        if 'Entrance Exam' in dict(get_grade):  
                            entrance_exam_value = get_grade['Entrance Exam'].split('=')[1]
                            entrance_exam_value = entrance_exam_value.replace('%','')
                            student_badges_dict['Entrance Exam'] = entrance_exam_value 

                        if 'Final Exam' in dict(get_grade):
                            final_exam_value = get_grade['Final Exam'].split('=')[1]
                            final_exam_value = final_exam_value.replace('%','')
                            student_badges_dict['Final Exam'] = final_exam_value

                        badge_writer_module.writerow(student_badges_dict)  
                student_badges_dict = {}    

        file_module = os.path.join(str(data_folder), "university_modules.csv")
        with open(file_module, 'w') as csvfile_module: 
            writer_module = csv.writer(csvfile_module)
            writer_module.writerow(['ModuleName','Date','Views'])

            module_list = StudentModuleViews.objects.filter(user=user,date_updated__gte=date.today()-timedelta(days=7)).values_list('module_name','date_updated','course_views')

            for modules_value in module_list:
                writer_module.writerow(modules_value)

  
        file_module_2 = os.path.join(str(data_folder), "login_details.csv")
        with open(file_module_2, 'w') as csvfile_module2: 
            writer_module2 = csv.writer(csvfile_module2)
            writer_module2.writerow(['Student','Date','Logins','Time'])
            module_list2 = LoginUpdate.objects.filter(action_user=user,date_updated__gte=date.today()-timedelta(days=7)).values_list('date_updated','login_count','total_time')
            
            for modules_val in module_list2:
                writer_module2.writerow((user.username,) + modules_val)


        filename = os.path.join(str(data_folder), "university_records.csv")
        with open(filename, 'w') as csvfile: 
            writer = csv.writer(csvfile)
            writer.writerow(['Student','Module','Section','Completed','Date'])
            students_list = StudentCourseDetails.objects.filter(user=user,date_updated__gte=date.today()-timedelta(days=7)).values_list('module_name','section','completed','date_updated')

            for students in students_list:
                writer.writerow((user.username,) + students)
    else:
        pass

    if ecommerce_service.is_enabled(request.user):
        context.update({
            'use_ecommerce_payment_flow': True,
            'ecommerce_payment_page': ecommerce_service.payment_page_url(),
        })

    # Gather urls for course card resume buttons.
    resume_button_urls = _get_urls_for_resume_buttons(user, course_enrollments)
    # There must be enough urls for dashboard.html. Template creates course
    # cards for "enrollments + entitlements".
    resume_button_urls += ['' for entitlement in course_entitlements]
    context.update({
        'resume_button_urls': resume_button_urls
    })

    response = render_to_response('dashboard.html', context)
    set_user_info_cookie(response, request)
    return response



