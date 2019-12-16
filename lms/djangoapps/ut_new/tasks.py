import jsonpickle
from celery import shared_task
from django.core.mail import EmailMessage, EmailMultiAlternatives
from edxmako.shortcuts import  render_to_string
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers
from django.conf import settings
from student.views import download_student_csv_data

import logging

log = logging.getLogger(__name__)

@shared_task
def user_records_as_superuser(user):
    """
    export user records as csv
    """

    from student.views.management import logo_data     
    context  = {}
    user = jsonpickle.decode(user)
    mail_subject = "All User Records"
    to_email = user.email

    response_data = download_student_csv_data(user)

    from_address = configuration_helpers.get_value(
            'email_from_address',
            settings.DEFAULT_FROM_EMAIL
    )



    message_for_activation = render_to_string('emails/user_records_csv.txt', context)

    email = EmailMultiAlternatives(subject=mail_subject, 
                             body=message_for_activation, 
                             from_email=from_address, 
                             to=[to_email]) 

    attachment = open(response_data, 'rb')
    email.attach('student_data.csv', attachment.read(), 'text/csv')
    email.content_subtype = 'html'
    # email.attach(logo_data())
    email.send()

