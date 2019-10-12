"""
URLs for the ut Feature.
"""
from django.conf.urls import url

from ut_new import views

urlpatterns = [
    # url(r'^ut_index/$', views.ut_index, name='ut_index'),
    url(r'^ut_cohorts/$', views.ut_coherts, name='ut_cohorts'),
    url(r'^enroll_user/$', views.enroll_user, name='enroll_user'),
    url(r'^linkedin_click/$', views.linkedin_click, name='linkedin_click'),
    url(r'^social_share/$', views.social_share, name='social_share'),
    
]