from django.shortcuts import get_object_or_404
from paypal.standard.ipn.signals import valid_ipn_received,invalid_ipn_received
from django.dispatch import receiver
from student.models import OrganizationRegistration
from student.tokens import account_activation_token
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers
from django.contrib.auth.models import AnonymousUser, User
from django.conf import settings
from django.utils.http import base36_to_int, urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_text
from edxmako.shortcuts import render_to_response, render_to_string
from django.core.mail import EmailMessage, EmailMultiAlternatives
from student.helpers import authenticate_new_user
from django.contrib.auth import authenticate, login 
from django.contrib.auth.signals import user_logged_in,user_logged_out

@receiver(valid_ipn_received) 
def show_me_the_money(sender,**kwargs):
    ipn = sender
    if ipn.payment_status == 'Pending':
        print('ipn signal system is pending----')
        order = get_object_or_404(OrganizationRegistration, invoice_id=int(ipn.invoice))
        
        print('order in sign-----')
        print('org emaik------',order.organization_email)
        if int(order.package_total_price) == int(ipn.mc_gross):
            print("in the sinals====order=")
            order.paid = True
            order.save() 
            print('after saving---',order.paid)


@receiver(invalid_ipn_received)
def do_not_show_me_the_money(sender, **kwargs):

    """Do things here upon an invalid IPN message received"""
    print("Invalid ipn received")


   

      
