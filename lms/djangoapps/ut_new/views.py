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
        log.info("inside ut coherts post method")
        coherts = request.POST.get("coherts")
        courses = request.POST.getlist("courses")
        organization_id = request.POST.get("org_id")
        organization_object = OrganizationRegistration.objects.get(organization_name=organization_id)
        if CohertsOrganization.objects.filter(coherts_name=coherts):
            messages.add_message(request,messages.SUCCESS,"COHERTS NAME ALREADY EXISTS!!")
        else:
            coherts_item = CohertsOrganization(instructor=current_user,coherts_name=coherts,organization=organization_object,course_list=str(courses))
            coherts_item.save()
            messages.add_message(request,messages.SUCCESS,"COHERTS ADDED SUCCESSFULLY!!")
    return render(request,'coherts.html',{'org_value':org_value, 'course_list':course_list})

from instructor.views.api import coherts_students_update_enrollment
# from student.models import UserCohertsOrganizationDetails

def enroll_user(request):
    """
    """
    if request.method == "POST":
        selected_coherts = request.POST.get("selected_coherts")
        organization_name = request.POST.get("organization_name")
        course_id = request.POST.get("course_key_enrollment")
        coherts_object = CohertsOrganization.objects.get(coherts_name=selected_coherts)
        coherts_list = coherts_object.course_list
        convert_to_utf = coherts_list.encode('UTF8')
        coherts_result = convert_to_utf.strip('][').split(',')
        for enroll_user_for_course in coherts_result:
            value = enroll_user_for_course.strip('u').split("'")
            convert_unicode_course_id = u'%s' % value[1]
            coherts_students_update_enrollment(request, convert_unicode_course_id)
        # user_track = UserCohertsOrganizationDetails(selected_coherts=selected_coherts,organization_detail=organization_name, learner_id=request.user.email)
        # user_track.save()
    #selected_coherts organization_detail learner_id
    return HttpResponseRedirect("/dashboard")
