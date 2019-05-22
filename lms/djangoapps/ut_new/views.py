""" ut new features  """

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from student.models import CohertsOrganization, OrganizationRegistration, UserProfile
from django.http import HttpResponse,HttpResponseRedirect
from openedx.core.djangoapps.content.course_overviews.models import CourseOverview


@login_required
def ut_coherts(request):
    #organization_object = OrganizationRegistration.objects.get(user=request.user)
    #org_value = str(organization_object.organization_name)
    #print("org val====%s---" % org_value)
    user_detail = UserProfile.objects.get(user=request.user)
    org_value = None
    if user_detail.organization and request.user.is_staff:
        org_value = str(user_detail.organization)
    course_list = CourseOverview.objects.all()
    if request.method == "POST":
        coherts = request.POST.get("coherts")
        courses = request.POST.getlist("courses")
        organization_id = request.POST.get("org_id")
        organization_object = OrganizationRegistration.objects.get(organization_name=organization_id)
        coherts_item = CohertsOrganization(coherts_name=coherts,organization=organization_object,course_list=str(courses))
        coherts_item.save()
        return HttpResponseRedirect("/dashboard")
    return render(request,'coherts.html',{'org_value':org_value, 'course_list':course_list})


from instructor.views.api import coherts_students_update_enrollment
from student.models import UserCohertsOrganizationDetails

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
        user_track = UserCohertsOrganizationDetails(selected_coherts=selected_coherts,organization_detail=organization_name, learner_id=request.user.email)
        user_track.save()
    #selected_coherts organization_detail learner_id
    return HttpResponseRedirect("/dashboard")
