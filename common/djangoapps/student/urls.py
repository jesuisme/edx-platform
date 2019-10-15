"""
URLs for student app
"""

from django.conf import settings
from django.conf.urls import url
from django.contrib.auth.views import password_reset_complete

from . import views

urlpatterns = [
    url(r'^organization_register$', views.organization_register, name='organization_register'),
    # TODO: standardize login

    url(r'^activate/(?P<uid>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.activate, name='activate'),
    url(r'^payment_process/$', views.payment_process, name='payment_process' ),
    url(r'^payment_done/$', views.payment_done, name='payment_done'),
    url(r'^payment_canceled/$', views.payment_canceled, name='payment_canceled'),
    # url(r'^order_confirmation/$', views.order_confirmation, name='order_confirmation'),
    # url(r'^test_confirmation/$', views.test_confirmation, name='test_confirmation'),
    
    url(r'^logout$', views.LogoutView.as_view(), name='logout'),

    # TODO: standardize login

    # login endpoint used by cms.
    url(r'^login_post$', views.login_user, name='login_post'),
    # login endpoints used by lms.
    url(r'^login_ajax$', views.login_user, name="login"),
    url(r'^login_ajax/(?P<error>[^/]*)$', views.login_user),

    url(r'^email_confirm/(?P<key>[^/]*)$', views.confirm_email_change, name='confirm_email_change'),

    url(r'^create_account$', views.create_account, name='create_account'),
    url(r'^activate/(?P<key>[^/]*)$', views.activate_account, name="activate"),

    url(r'^accounts/disable_account_ajax$', views.disable_account_ajax, name="disable_account_ajax"),
    url(r'^accounts/manage_user_standing', views.manage_user_standing, name='manage_user_standing'),

    url(r'^change_setting$', views.change_setting, name='change_setting'),
    url(r'^change_email_settings$', views.change_email_settings, name='change_email_settings'),

    # password reset in views (see below for password reset django views)
    url(r'^password_reset/$', views.password_reset, name='password_reset'),
    url(
        r'^password_reset_confirm/(?P<uidb36>[0-9A-Za-z]+)-(?P<token>.+)/$',
        views.password_reset_confirm_wrapper,
        name='password_reset_confirm',
    ),

    url(r'accounts/verify_password', views.verify_user_password, name='verify_password'),

    url(r'^course_run/{}/refund_status$'.format(settings.COURSE_ID_PATTERN),
        views.course_run_refund_status,
        name="course_run_refund_status"),

    url(
        r'^activate_secondary_email/(?P<key>[^/]*)$',
        views.activate_secondary_email,
        name='activate_secondary_email'
    ),
]

# enable automatic login
if settings.FEATURES.get('AUTOMATIC_AUTH_FOR_TESTING'):
    urlpatterns += [
        url(r'^auto_auth$', views.auto_auth),
    ]

# password reset django views (see above for password reset views)
urlpatterns += [
    # TODO: Replace with Mako-ized views
    url(
        r'^password_reset_complete/$',
        password_reset_complete,
        name='password_reset_complete',
    ),
]
