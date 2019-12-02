""" ut new features  """
import logging
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from student.models import CohertsOrganization, OrganizationRegistration, UserProfile
from django.http import HttpResponse,HttpResponseRedirect
from openedx.core.djangoapps.content.course_overviews.models import CourseOverview
from django.contrib import messages
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.conf import settings
from django.core.mail import EmailMessage, EmailMultiAlternatives
from edxmako.shortcuts import  render_to_string
from util.json_request import JsonResponse
from django.utils.translation import ugettext as _
from badges.models import BadgeAssertion, BadgeClass
from rest_framework import status
log = logging.getLogger(__name__)

@login_required
def ut_coherts(request):
    user_detail = UserProfile.objects.get(user=request.user)
    if not (user_detail.organization and request.user.is_staff):
        return HttpResponse(status=status.HTTP_403_FORBIDDEN)


    user_detail = UserProfile.objects.get(user=request.user)
    current_user = User.objects.get(email=request.user.email)
    org_value = None
    if user_detail.organization and request.user.is_staff:
        org_value = str(user_detail.organization)
    course_list = CourseOverview.objects.all()
    if request.method == "POST":
        coherts = request.POST.get("coherts")
        courses = request.POST.getlist("courses")
        organization_id = request.POST.get("org_id")        
        try:
            organization_object = OrganizationRegistration.objects.get(organization_name=organization_id)
        except:
            organization_object = None

        if organization_object:
            if CohertsOrganization.objects.filter(coherts_name=coherts):
                messages.add_message(request,messages.SUCCESS,"COHERTS NAME ALREADY EXISTS!!")
            else:
                coherts_item = CohertsOrganization(instructor=current_user,coherts_name=coherts,organization=organization_object,course_list=str(courses))
                coherts_item.save()
                messages.add_message(request,messages.SUCCESS,"COHERTS ADDED SUCCESSFULLY!!")
        else:
            messages.add_message(request,messages.ERROR,"Organization Not Registered!!")

    return render(request,'coherts.html',{'org_value':org_value, 'course_list':course_list})

# from instructor.views.api import coherts_students_update_enrollment
# from student.models import UserCohertsOrganizationDetails
# from rest_framework.renderers import JSONRenderer
# from rest_framework.response import Response
# from rest_framework.views import APIView



# @api_view(['POST'])
# @renderer_classes([JSONRenderer])
def enroll_user(request):
    """
    """
    from student.views.management import logo_data
    user = request.user
    if request.method == "GET" or request.method == "POST":
        badge_class = BadgeClass.get_badge_class(slug = 'diligent_learner',issuing_component='openedx__course', create=False,)
        if badge_class and not badge_class.get_for_user(user):
            assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)
            context  = {
                "badge_name": badge_class.display_name
            }
            mail_subject = "You earned a new VBHC Badge!"
            to_email = user.email

            from_address = configuration_helpers.get_value(
                    'email_from_address',
                    settings.DEFAULT_FROM_EMAIL
            )

            message_for_activation = render_to_string('emails/badges_mails.txt', context)

            email = EmailMultiAlternatives(mail_subject,message_for_activation,from_email=from_address,to=[to_email])

            email.attach_alternative(message_for_activation, "text/html")

            email.mixed_subtype = 'related'

            email.attach(logo_data())
            
            email.send()
        return JsonResponse(
                    {'message': _("gggggggggg")},
                    status=200)



def linkedin_click(request):
    """
    """
    from student.views.management import logo_data
    user = request.user
    if request.method == "GET" or request.method == "POST":
        badge_class = BadgeClass.get_badge_class(slug = 'value-wise',issuing_component='openedx__course', create=False,)
        if badge_class and not badge_class.get_for_user(user):
            assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)
            context  = {
                "badge_name": badge_class.display_name
            }
            mail_subject = "You earned a new VBHC Badge!"
            to_email = user.email

            from_address = configuration_helpers.get_value(
                    'email_from_address',
                    settings.DEFAULT_FROM_EMAIL
            )

            message_for_activation = render_to_string('emails/badges_mails.txt', context)

            email = EmailMultiAlternatives(mail_subject,message_for_activation,from_email=from_address,to=[to_email])

            email.attach_alternative(message_for_activation, "text/html")

            email.mixed_subtype = 'related'

            email.attach(logo_data())
            
            email.send()

        # badge_class = BadgeClass.get_badge_class(slug = 'spread_the_word',issuing_component='openedx__course', create=False,)
        # if badge_class and not badge_class.get_for_user(user):
        #     assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)
        return JsonResponse(
                    {'message': _("gggggggggg")},
                    status=200)


def social_share(request):
    """
    """
    from student.views.management import logo_data
    user = request.user
    if request.method == "GET" or request.method == "POST":
        badge_class = BadgeClass.get_badge_class(slug = 'spread_the_word',issuing_component='openedx__course', create=False,)
        if badge_class and not badge_class.get_for_user(user):
            assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)
            context  = {
                "badge_name": badge_class.display_name
            }
            mail_subject = "You earned a new VBHC Badge!"
            to_email = user.email

            from_address = configuration_helpers.get_value(
                    'email_from_address',
                    settings.DEFAULT_FROM_EMAIL
            )

            message_for_activation = render_to_string('emails/badges_mails.txt', context)

            email = EmailMultiAlternatives(mail_subject,message_for_activation,from_email=from_address,to=[to_email])

            email.attach_alternative(message_for_activation, "text/html")

            email.mixed_subtype = 'related'

            email.attach(logo_data())
            
            email.send()
        return JsonResponse(
                    {'message': _("gggggggggg")},
                    status=200)
