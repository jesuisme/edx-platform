"""
URLs for the ut Feature.
"""
from django.conf.urls import url

from ut_new import views

urlpatterns = [
    # url(r'^ut_index/$', views.ut_index, name='ut_index'),
    url(r'^ut_coherts/$', views.ut_coherts, name='ut_coherts'),
    url(r'^enroll_user/$', views.enroll_user, name='enroll_user'),
    
]
