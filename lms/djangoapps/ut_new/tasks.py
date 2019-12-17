

from celery import shared_task
from django.core.mail import EmailMessage, EmailMultiAlternatives
from edxmako.shortcuts import  render_to_string
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers
from django.conf import settings



@shared_task
def user_records_as_superuser(user):
    """
    export user records as csv
    """
    import jsonpickle
    import time
    from student.views.management import logo_data
 
    
    context  = {}
    user = jsonpickle.decode(user)
    mail_subject = "testing records"
    # to_email = user.email
    to_email = 'nitinvaishwade4@gmail.com'

    from_address = configuration_helpers.get_value(
            'email_from_address',
            settings.DEFAULT_FROM_EMAIL
    )

    message_for_activation = render_to_string('emails/user_records_csv.txt', context)

    email = EmailMultiAlternatives(mail_subject,message_for_activation,from_email=from_address,to=[to_email])

    email.attach_alternative(message_for_activation, "text/html")

    email.mixed_subtype = 'related'

    email.send()