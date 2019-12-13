"""
Utility functions for validating forms
"""
import re
from importlib import import_module
import logging
from django import forms
from django.conf import settings
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.hashers import UNUSABLE_PASSWORD_PREFIX
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError
from django.urls import reverse
from django.core.validators import RegexValidator, slug_re
from django.forms import widgets
from django.utils.http import int_to_base36
from django.utils.translation import ugettext_lazy as _

from edx_ace import ace
from edx_ace.recipient import Recipient
from openedx.core.djangoapps.ace_common.template_context import get_base_template_context
from openedx.core.djangoapps.lang_pref import LANGUAGE_KEY
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers
from openedx.core.djangoapps.theming.helpers import get_current_site
from openedx.core.djangoapps.user_api import accounts as accounts_settings
from openedx.core.djangoapps.user_api.accounts.utils import is_secondary_email_feature_enabled
from openedx.core.djangoapps.user_api.preferences.api import get_user_preference
from student.message_types import AccountRecovery as AccountRecoveryMessage
from student.message_types import PasswordReset
from student.models import CourseEnrollmentAllowed, AccountRecovery, email_exists_or_retired, OrganizationRegistration, organization_email_exists
from util.password_policy_validators import password_max_length, password_min_length, validate_password
import logging
log = logging.getLogger(__name__)


def send_account_recovery_email_for_user(user, request, email=None):
    """
    Send out a account recovery email for the given user.

    Arguments:
        user (User): Django User object
        request (HttpRequest): Django request object
        email (str): Send email to this address.
    """
    site = get_current_site()
    message_context = get_base_template_context(site)
    message_context.update({
        'request': request,  # Used by google_analytics_tracking_pixel
        'email': email,
        'platform_name': configuration_helpers.get_value('PLATFORM_NAME', settings.PLATFORM_NAME),
        'reset_link': '{protocol}://{site}{link}?is_account_recovery=true'.format(
            protocol='https' if request.is_secure() else 'http',
            site=configuration_helpers.get_value('SITE_NAME', settings.SITE_NAME),
            link=reverse('password_reset_confirm', kwargs={
                'uidb36': int_to_base36(user.id),
                'token': default_token_generator.make_token(user),
            }),
        )
    })

    msg = AccountRecoveryMessage().personalize(
        recipient=Recipient(user.username, email),
        language=get_user_preference(user, LANGUAGE_KEY),
        user_context=message_context,
    )
    ace.send(msg)


class PasswordResetFormNoActive(PasswordResetForm):
    error_messages = {
        'unknown': _("That e-mail address doesn't have an associated "
                     "user account. Are you sure you've registered?"),
        'unusable': _("The user account associated with this e-mail "
                      "address cannot reset the password."),
    }
    is_account_recovery = True
    def clean_email(self):
        """
        This is a literal copy from Django 1.4.5's django.contrib.auth.forms.PasswordResetForm
        Except removing the requirement of active users
        Validates that a user exists with the given email address.
        """
        email = self.cleaned_data["email"]
        self.users_cache = User.objects.filter(email__iexact=email)
        #The line below contains the only change, removing is_active=True
        if len(self.users_cache) == 0 and is_secondary_email_feature_enabled():
            # Check if user has entered the secondary email.
            self.users_cache = User.objects.filter(
                id__in=AccountRecovery.objects.filter(secondary_email__iexact=email, is_active=True).values_list('user')
            )
            self.is_account_recovery = not bool(self.users_cache)
        # self.users_cache = User.objects.filter(email__iexact=email)
        if not len(self.users_cache):
            raise forms.ValidationError(self.error_messages['unknown'])
        # if any((user.password.startswith(UNUSABLE_PASSWORD_PREFIX))
        #        for user in self.users_cache):
        #     log.info("if any=============")
        #     log.info("if any==========%s===" % UNUSABLE_PASSWORD_PREFIX)
        #     for user in self.users_cache:
        #         log.info("if any===user.password=======%s===" % user.password)
        #     raise forms.ValidationError(self.error_messages['unusable'])
        return email

    def save(self,  # pylint: disable=arguments-differ
             use_https=False,
             token_generator=default_token_generator,
             request=None,
             **_kwargs):
        """
        Generates a one-use only link for resetting password and sends to the
        user.
        """
        for user in self.users_cache:
            if self.is_account_recovery:
                site = get_current_site()
                message_context = get_base_template_context(site)

                message_context.update({
                    'request': request,  # Used by google_analytics_tracking_pixel
                    # TODO: This overrides `platform_name` from `get_base_template_context` to make the tests passes
                    'platform_name': configuration_helpers.get_value('PLATFORM_NAME', settings.PLATFORM_NAME),
                    'reset_link': '{protocol}://{site}{link}'.format(
                        protocol='https' if use_https else 'http',
                        site=configuration_helpers.get_value('SITE_NAME', settings.SITE_NAME),
                        link=reverse('password_reset_confirm', kwargs={
                            'uidb36': int_to_base36(user.id),
                            'token': token_generator.make_token(user),
                        }),
                    )
                })

                msg = PasswordReset().personalize(
                    recipient=Recipient(user.username, user.email),
                    language=get_user_preference(user, LANGUAGE_KEY),
                    user_context=message_context,
                )
                ace.send(msg)
            else:
                send_account_recovery_email_for_user(user, request, user.account_recovery.secondary_email)
            


class TrueCheckbox(widgets.CheckboxInput):
    """
    A checkbox widget that only accepts "true" (case-insensitive) as true.
    """
    def value_from_datadict(self, data, files, name):
        value = data.get(name, '')
        return value.lower() == 'true'


class TrueField(forms.BooleanField):
    """
    A boolean field that only accepts "true" (case-insensitive) as true
    """
    widget = TrueCheckbox


def validate_username(username):
    """
    Verifies a username is valid, raises a ValidationError otherwise.
    Args:
        username (unicode): The username to validate.

    This function is configurable with `ENABLE_UNICODE_USERNAME` feature.
    """

    username_re = slug_re
    flags = None
    message = accounts_settings.USERNAME_INVALID_CHARS_ASCII

    if settings.FEATURES.get("ENABLE_UNICODE_USERNAME"):
        username_re = r"^{regex}$".format(regex=settings.USERNAME_REGEX_PARTIAL)
        flags = re.UNICODE
        message = accounts_settings.USERNAME_INVALID_CHARS_UNICODE

    validator = RegexValidator(
        regex=username_re,
        flags=flags,
        message=message,
        code='invalid',
    )

    validator(username)


def contains_html(value):
    """
    Validator method to check whether name contains html tags
    """
    regex = re.compile('(<|>)', re.UNICODE)
    return bool(regex.search(value))


def validate_name(name):
    """
    Verifies a Full_Name is valid, raises a ValidationError otherwise.
    Args:
        name (unicode): The name to validate.
    """
    if contains_html(name):
        raise forms.ValidationError(_('Full Name cannot contain the following characters: < >'))


class UsernameField(forms.CharField):
    """
    A CharField that validates usernames based on the `ENABLE_UNICODE_USERNAME` feature.
    """

    default_validators = [validate_username]

    def __init__(self, *args, **kwargs):
        super(UsernameField, self).__init__(
            min_length=accounts_settings.USERNAME_MIN_LENGTH,
            max_length=accounts_settings.USERNAME_MAX_LENGTH,
            error_messages={
                "required": accounts_settings.USERNAME_BAD_LENGTH_MSG,
                "min_length": accounts_settings.USERNAME_BAD_LENGTH_MSG,
                "max_length": accounts_settings.USERNAME_BAD_LENGTH_MSG,
            }
        )

    def clean(self, value):
        """
        Strips the spaces from the username.

        Similar to what `django.forms.SlugField` does.
        """

        value = self.to_python(value).strip()
        return super(UsernameField, self).clean(value)


class AccountCreationForm(forms.Form):
    """
    A form to for account creation data. It is currently only used for
    validation, not rendering.
    """

    _EMAIL_INVALID_MSG = _("A properly formatted e-mail is required")
    _PASSWORD_INVALID_MSG = _("A valid password is required")
    _NAME_TOO_SHORT_MSG = _("Your legal name must be a minimum of two characters long")

    # TODO: Resolve repetition

    username = UsernameField()

    email = forms.EmailField(
        max_length=accounts_settings.EMAIL_MAX_LENGTH,
        min_length=accounts_settings.EMAIL_MIN_LENGTH,
        error_messages={
            "required": _EMAIL_INVALID_MSG,
            "invalid": _EMAIL_INVALID_MSG,
            "max_length": _("Email cannot be more than %(limit_value)s characters long"),
        }
    )
    password = forms.CharField(
        min_length=password_min_length(),
        max_length=password_max_length(),
        error_messages={
            "required": _PASSWORD_INVALID_MSG,
            "min_length": _PASSWORD_INVALID_MSG,
            "max_length": _PASSWORD_INVALID_MSG,
        }
    )
    name = forms.CharField(
        min_length=accounts_settings.NAME_MIN_LENGTH,
        error_messages={
            "required": _NAME_TOO_SHORT_MSG,
            "min_length": _NAME_TOO_SHORT_MSG,
        },
        validators=[validate_name]
    )

    def __init__(
            self,
            data=None,
            extra_fields=None,
            extended_profile_fields=None,
            enforce_password_policy=False,
            tos_required=True
    ):
        super(AccountCreationForm, self).__init__(data)

        extra_fields = extra_fields or {}
        self.extended_profile_fields = extended_profile_fields or {}
        self.enforce_password_policy = enforce_password_policy
        if tos_required:
            self.fields["terms_of_service"] = TrueField(
                error_messages={"required": _("You must accept the terms of service.")}
            )

        # TODO: These messages don't say anything about minimum length
        error_message_dict = {
            "level_of_education": _("A level of education is required"),
            "gender": _("Your gender is required"),
            "year_of_birth": _("Your year of birth is required"),
            "mailing_address": _("Your mailing address is required"),
            "goals": _("A description of your goals is required"),
            "city": _("A city is required"),
            "country": _("A country is required")
        }
        for field_name, field_value in extra_fields.items():
            if field_name not in self.fields:
                if field_name == "honor_code":
                    if field_value == "required":
                        self.fields[field_name] = TrueField(
                            error_messages={
                                "required": _("To enroll, you must follow the honor code.")
                            }
                        )
                else:
                    required = field_value == "required"
                    min_length = 1 if field_name in ("gender", "level_of_education") else 2
                    error_message = error_message_dict.get(
                        field_name,
                        _("You are missing one or more required fields")
                    )
                    self.fields[field_name] = forms.CharField(
                        required=required,
                        min_length=min_length,
                        error_messages={
                            "required": error_message,
                            "min_length": error_message,
                        }
                    )

        for field in self.extended_profile_fields:
            if field not in self.fields:
                self.fields[field] = forms.CharField(required=False)

    def clean_password(self):
        """Enforce password policies (if applicable)"""
        password = self.cleaned_data["password"]
        if self.enforce_password_policy:
            validate_password(password, username=self.cleaned_data.get('username'))
        return password

    def clean_email(self):
        """ Enforce email restrictions (if applicable) """
        email = self.cleaned_data["email"]
        if settings.REGISTRATION_EMAIL_PATTERNS_ALLOWED is not None:
            # This Open edX instance has restrictions on what email addresses are allowed.
            allowed_patterns = settings.REGISTRATION_EMAIL_PATTERNS_ALLOWED
            # We append a '$' to the regexs to prevent the common mistake of using a
            # pattern like '.*@edx\\.org' which would match 'bob@edx.org.badguy.com'
            if not any(re.match(pattern + "$", email) for pattern in allowed_patterns):
                # This email is not on the whitelist of allowed emails. Check if
                # they may have been manually invited by an instructor and if not,
                # reject the registration.
                if not CourseEnrollmentAllowed.objects.filter(email=email).exists():
                    raise ValidationError(_("Unauthorized email address."))
        if email_exists_or_retired(email):
            raise ValidationError(
                _(
                    "It looks like {email} belongs to an existing account. Try again with a different email address."
                ).format(email=email)
            )
        return email

    def clean_year_of_birth(self):
        """
        Parse year_of_birth to an integer, but just use None instead of raising
        an error if it is malformed
        """
        try:
            year_str = self.cleaned_data["year_of_birth"]
            return int(year_str) if year_str is not None else None
        except ValueError:
            return None

    @property
    def cleaned_extended_profile(self):
        """
        Return a dictionary containing the extended_profile_fields and values
        """
        return {
            key: value
            for key, value in self.cleaned_data.items()
            if key in self.extended_profile_fields and value is not None
        }


def get_registration_extension_form(*args, **kwargs):
    """
    Convenience function for getting the custom form set in settings.REGISTRATION_EXTENSION_FORM.

    An example form app for this can be found at http://github.com/open-craft/custom-form-app
    """
    if not settings.FEATURES.get("ENABLE_COMBINED_LOGIN_REGISTRATION"):
        return None
    if not getattr(settings, 'REGISTRATION_EXTENSION_FORM', None):
        return None
    module, klass = settings.REGISTRATION_EXTENSION_FORM.rsplit('.', 1)
    module = import_module(module)
    return getattr(module, klass)(*args, **kwargs)


class OrganizationRegistrationForm(forms.ModelForm):
    required_css_class = 'required'
   
    def __init__(self, *args, **kwargs):
        super(OrganizationRegistrationForm, self).__init__(*args, **kwargs)
        for visible in self.visible_fields():
            visible.field.widget.attrs['class'] = 'form-control'
            
        self.fields['organization_name'].required = True
        # self.fields['organization_domain'].required = True
        self.fields['city'].required = True
        self.fields['organization_contact_number'].required = True
        self.fields['organization_email'].required = True
        self.fields['first_name'].required = True
        self.fields['confirm_email'].required = True
        self.fields['last_name'].required = True
        self.fields['job_title'].required = True      
        # self.fields['city'].required = True
        self.fields['address1'].required = True
        self.fields['address2'].required = False
        self.fields['zip_code'].required = True
        self.fields['primary_professional_role'].required = True


    class Meta:
        model = OrganizationRegistration
        fields = ['organization_email','confirm_email','first_name','last_name','job_title','organization_name','city', 'organization_contact_number','primary_professional_role','address1', 'address2','zip_code']
        labels = {'organization_name': 'Organization Name', 'organization_email': 'Email', 'city': 'City', 'organization_contact_number': 'Contact Phone Number'}
    
    

    def clean_organization_name(self):
        organization_name = self.cleaned_data.get('organization_name')        
        organization_name1 = organization_name.lower()
        pattern_org_name ='^[a-z_ ]*$'
        result = re.match(pattern_org_name,organization_name1)
        if not result:
            raise forms.ValidationError("Organization should contain only alphabets.")
        return organization_name


    def clean_first_name(self):
        first_name = self.cleaned_data.get('first_name')
        first_name_1 = first_name.lower()
        pattern_org_name = '^[a-z_ ]*$'        
        name_result = re.match(pattern_org_name,first_name_1)
        if not name_result:
            raise forms.ValidationError("First Name should contain only alphabets.")
        return first_name


    def clean_last_name(self):
        last_name = self.cleaned_data.get('last_name')
        last_name_1 = last_name.lower()
        pattern_org_name = '^[a-z_ ]*$'
        last_result = re.match(pattern_org_name,last_name_1)
        if not last_result:
            raise forms.ValidationError("Last Name should contain only alphabets.")
        return last_name


    def clean_job_title(self):
        job_title = self.cleaned_data.get('job_title')
        job_title1 = job_title.lower()
        pattern_org_name = '^[a-z_ ]*$'
        job_result = re.match(pattern_org_name,job_title1)
        if not job_result:
            raise forms.ValidationError("Last Name should contain only alphabets.")
        return job_title

    def clean_organization_domain(self):
        organization_domain = self.cleaned_data.get('organization_domain')
        return organization_domain
        
    # def clean_organization_domain(self):
    #     organization_domain = self.cleaned_data.get('organization_domain')
    #     organization_email = self.cleaned_data.get('organization_email')
    #     domain_list = organization_email.split('@')[1]
    #     if organization_domain not in domain_list:
    #         raise forms.ValidationError("Please Enter valid domain or valid email address")
    #     return organization_domain


    # def clean_city(self):        
    #     city = self.cleaned_data.get('city')
    #     city1 = city.lower()
    #     pattern_org_name = '^[a-z_ ]*$'
    #     city_result = re.match(pattern_org_name,city1)
    #     if not city_result:
    #         raise forms.ValidationError("City should contain only alphabets.")
    #     return city   


    def clean_organization_email(self):
        organization_email = self.cleaned_data.get('organization_email')
        
        if settings.REGISTRATION_EMAIL_PATTERNS_ALLOWED is not None:
            # This Open edX instance has restrictions on what email addresses are allowed.
            allowed_patterns = settings.REGISTRATION_EMAIL_PATTERNS_ALLOWED
            # We append a '$' to the regexs to prevent the common mistake of using a
            # pattern like '.*@edx\\.org' which would match 'bob@edx.org.badguy.com'
            if not any(re.match(pattern + "$", organization_email) for pattern in allowed_patterns):
                # This email is not on the whitelist of allowed emails. Check if
                # they may have been manually invited by an instructor and if not,
                # reject the registration.
                if not OrganizationRegistration.objects.filter(organization_email=organization_email).exists():
                    raise ValidationError(_("Unauthorized email address."))
        if organization_email_exists(organization_email):
            raise ValidationError(
                _(
                    "It looks like {organization_email} belongs to an existing account. Try again with a different email address."
                ).format(organization_email=organization_email)
            )
        return organization_email


    def clean_confirm_email(self):        
        organization_email = self.cleaned_data.get('organization_email')
        confirm_email = self.cleaned_data.get('confirm_email')

        if organization_email != confirm_email:
            raise forms.ValidationError(
                "Email and Confirm Email does not match"
            )

        return confirm_email  


    def clean_organization_contact_number(self):
        organization_contact_number = self.cleaned_data.get('organization_contact_number')
        return organization_contact_number

    def clean_zip_code(self):
        zip_code = self.cleaned_data.get('zip_code')
        pattern_zip_code = '^[+0-9]+$'
        zip_result = bool(re.match(pattern_zip_code,zip_code))
        if not zip_result:
            raise forms.ValidationError("Zip Code should not contain alphabets.")

        return zip_code

