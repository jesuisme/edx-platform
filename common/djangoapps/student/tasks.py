"""
This file contains celery tasks for sending email
"""
import logging
import ast

from boto.exception import NoAuthHandlerFound
from celery.exceptions import MaxRetriesExceededError
from celery.task import task  # pylint: disable=no-name-in-module, import-error
from django.conf import settings
from django.core import mail
from django.contrib.auth.models import User
from django.core.validators import validate_email
from celery import shared_task, current_task
from django.utils.translation import gettext as _
from django.core.exceptions import (
    MultipleObjectsReturned,
    ObjectDoesNotExist,
    PermissionDenied,
    ValidationError
)
from opaque_keys.edx.keys import CourseKey, UsageKey
from shoppingcart.models import (
    Coupon,
    CourseMode,
    CourseRegistrationCode,
    CourseRegistrationCodeInvoiceItem,
    Invoice,
    RegistrationCodeRedemption
)
from student.models import (
    ALLOWEDTOENROLL_TO_ENROLLED,
    ALLOWEDTOENROLL_TO_UNENROLLED,
    DEFAULT_TRANSITION_STATE,
    ENROLLED_TO_ENROLLED,
    ENROLLED_TO_UNENROLLED,
    UNENROLLED_TO_ALLOWEDTOENROLL,
    UNENROLLED_TO_ENROLLED,
    UNENROLLED_TO_UNENROLLED,
    CourseEnrollment,
    EntranceExamConfiguration,
    ManualEnrollmentAudit,
    Registration,
    UserProfile,
    anonymous_id_for_user,
    get_user_by_username_or_email,
    unique_id_for_user,
    is_email_retired,
    CohertsOrganization,
    OrganizationRegistration
)
from lms.djangoapps.instructor.enrollment import (
    enroll_email,
    get_email_params,
    get_user_email_language,
    send_beta_role_email,
    send_mail_to_student,
    unenroll_email
)
from courseware.courses import get_course_by_id, get_course_with_access
# from util.json_request import JsonResponse, JsonResponseBadRequest
from django.http import JsonResponse
import json

log = logging.getLogger('edx.celery.task')

EMAIL_INDEX = 0
USERNAME_INDEX = 1
NAME_INDEX = 2
COUNTRY_INDEX = 3
COHORT_NAME = 4

@shared_task
def task_register_and_enroll_students(csv_file):  # pylint: disable=too-many-statements
    """
    Create new account and Enroll students in this course.
    Passing a csv file that contains a list of students.
    Order in csv should be the following email = 0; username = 1; name = 2; country = 3.
    Requires staff access.

    -If the email address and username already exists and the user is enrolled in the course,
    do nothing (including no email gets sent out)

    -If the email address already exists, but the username is different,
    match on the email address only and continue to enroll the user in the course using the email address
    as the matching criteria. Note the change of username as a warning message (but not a failure). Send a standard enrollment email
    which is the same as the existing manual enrollment

    -If the username already exists (but not the email), assume it is a different user and fail to create the new account.
     The failure will be messaged in a response in the browser.
    """

    current_task.update_state(state='STARTED', meta={'current': 0,'status_message': ''})
    course_id = CourseKey.from_string(csv_file['course_id'])
    warnings = []
    row_errors = []
    general_errors = []
    cohort_names_list = []
    final_cohort_name = None
    percent = 0
    counter = 0
    total = 0

    # for white labels we use 'shopping cart' which uses CourseMode.DEFAULT_SHOPPINGCART_MODE_SLUG as
    # course mode for creating course enrollments.
    if CourseMode.is_white_label(course_id):
        course_mode = CourseMode.DEFAULT_SHOPPINGCART_MODE_SLUG
    else:
        course_mode = None

    if 'csv_file_data' in csv_file:
        generated_passwords = []
        row_num = 0

        csv_file_xml = ast.literal_eval(csv_file['csv_file_data'])
        total = len(csv_file_xml)

        for student in csv_file_xml:
            counter += 1
            current_task.update_state(state='PROGRESS', meta={'current': counter, 'percent': percent, 'status_message': '<b>In Progress...</b>'})

            row_num = row_num + 1
            # verify that we have exactly four columns in every row but allow for blank lines
            if len(student) != 1:
                if len(student) > 0:
                    general_errors.append({
                        'username': '',
                        'email': '',
                        'response': ('Data in row #{row_num} must have exactly one columns: email.').format(row_num=row_num)
                    })
                continue

            # Iterate each student in the uploaded csv file.
            email = student[EMAIL_INDEX]
            course = get_course_by_id(course_id)
            user = User.objects.get(username=csv_file['user'])
            from lms.djangoapps.instructor.views.api import generate_leaner_username, generate_unique_password, create_and_enroll_user, create_manual_course_enrollment

            try:
                staff_organization = UserProfile.objects.get(user=user).organization
                organization_staff = OrganizationRegistration.objects.get(organization_name=staff_organization)   
            except OrganizationRegistration.DoesNotExist:
                organization_staff = None
                general_errors.append({
                    'username': '', 'email': '', 'response': ('Please register your organization to enroll the learners.')
                })
                result = {
                    'row_errors': row_errors,
                    'general_errors': general_errors,
                    'warnings': warnings,
                    'percent': percent
                }
                return {'final_result' : result}

            if organization_staff:
                cohort_names_org = CohertsOrganization.objects.filter(organization=organization_staff)
                if cohort_names_org:
                    for coherts_object in cohort_names_org:
                        coherts_l = coherts_object.course_list
                        lq = ast.literal_eval(coherts_l)
                        for list_item in range(len(lq)):
                            course_key_new = CourseKey.from_string(str(lq[list_item]))
                            if course_key_new == course_id:
                                cohort_names_list.append(coherts_object.coherts_name) 

            if cohort_names_list:
                final_cohort_name = CohertsOrganization.objects.get(coherts_name=cohort_names_list[0])
            else:
                general_errors.append({
                            'username': '', 'email': '', 'response': ('Cohort Name is not Registered for this course.') })
                result = {                    
                    'row_errors': row_errors,
                    'general_errors': general_errors,
                    'warnings': warnings,
                    'percent': percent
                }
                return {'final_result' : result}
                  

            cohort_names_list = []
            email_params = get_email_params(course, True, secure=csv_file['secure'])
            email = str(email).strip()
            try:
                validate_email(email)  # Raises ValidationError if invalid
            except ValidationError as ex:
                row_errors.append({
                    'username': '', 'email': email, 'response': ('Invalid email {email_address}').format(email_address=email)})
            else:
                user_profile = User.objects.filter(email=email).exists()
                
                if User.objects.filter(email=email).exists():
                    current_task.update_state(state='PROGRESS', meta={'current': counter, 'percent': percent, 'status_message': '<b>In Progress...</b>'})
                    # Email address already exists. assume it is the correct user
                    # and just register the user in the course and send an enrollment email.
                    user = User.objects.get(email=email)
                    
                    username = user.username

                    # see if it is an exact match with email and username
                    # if it's not an exact match then just display a warning message, but continue onwards
                    if not User.objects.filter(email=email, username=username).exists():
                        warning_message = (
                            'An account with email {email} exists but the provided username {username} '
                            'is different. Enrolling anyway with {email}.'
                        ).format(email=email, username=username)

                        warnings.append({
                            'username': username, 'email': email, 'response': warning_message
                        })
                        log.warning(u'email %s already exist', email)
                    else:
                        log.info(
                            u"user already exists with username '%s' and email '%s'",
                            username,
                            email
                        )

                        user_organization = UserProfile.objects.get(user=user).organization

                        try:
                            cohort_manual_enrollment = ManualEnrollmentAudit.objects.get(enrolled_email=user.email, coherts_name=final_cohort_name, organization_name=user_organization)
                        except:
                            cohort_manual_enrollment = None

                        if cohort_manual_enrollment:
                            # warning_message = (
                            #     'An account with email {email} exists and is already enrolled in this cohort.'                                
                            # ).format(email=email)

                            # warnings.append({
                            #     'username': '', 'email': email, 'response': warning_message
                            # })
                            log.warning(u'email %s already exist and is already enrolled in this cohort.', email)
                       
                        
                        if str(staff_organization) != str(user_organization):
                            error_message = (
                                'An account with email {email} already exists and belongs to different organization, Organization Name: {user_organization}.'                                
                            ).format(email=email, user_organization=user_organization)

                            row_errors.append({
                                'username': username, 'email': email, 'response': error_message
                            })
                            continue                            

                    # enroll a user if it is not already enrolled.
                    if not CourseEnrollment.is_enrolled(user, course_id):
                        # Enroll user to the course and add manual enrollment audit trail 
                        create_manual_course_enrollment(
                            user=user,
                            course_id=course_id,
                            mode=course_mode,
                            coherts_name=final_cohort_name,
                            organization_name=organization_staff,
                            enrolled_by=user,                            
                            reason='Enrolling via csv upload',
                            state_transition=UNENROLLED_TO_ENROLLED,
                        )
                        enroll_email(course_id=course_id, student_email=email, auto_enroll=True, email_students=True, email_params=email_params)

                elif is_email_retired(email):
                    # We are either attempting to enroll a retired user or create a new user with an email which is
                    # already associated with a retired account.  Simply block these attempts.
                    row_errors.append({
                        'username': '',
                        'email': email,
                        'response': ('Invalid email: {email_address}').format(email_address=email),
                    })
                    log.warning(u'Email address %s is associated with a retired user, so course enrollment was ' +
                                u'blocked.', email)
                else:
                    # This email does not yet exist, so we need to create a new account
                    # If username already exists in the database, then create_and_enroll_user
                    # will raise an IntegrityError exception.

                    leaner_email = email.split('@')
                    if len(leaner_email) > 0:
                        username = generate_leaner_username(leaner_email[0])
                        country = ''
                        name = ''
                    else:
                        general_errors.append({                        
                            'username': '', 'email': email, 'response': _('Enter a valid Email Address.') })   
                        result = {
                            'row_errors': row_errors,
                            'general_errors': general_errors,
                            'warnings': warnings,
                            'percent': percent
                        }
                        return {'final_result' : result}
  
                    password = generate_unique_password(generated_passwords)

                    errors = create_and_enroll_user(
                        email, username, name, country, password, final_cohort_name, organization_staff, course_id, course_mode, user, email_params
                    )
                    current_task.update_state(state='PROGRESS', meta={'current': counter, 'percent': percent, 'status_message': '<b>In Progress...</b>'})
                    row_errors.extend(errors)
                percent = int((float(counter)) / (total) * 100)
                current_task.update_state(state='PROGRESS', meta={'current': counter, 'percent': percent, 'status_message': '<b>In Progress...</b>'})
    else:
        general_errors.append({
            'username': '', 'email': '', 'response': ('File is not attached.')
        })

    result = {
        'row_errors': row_errors,
        'general_errors': general_errors,
        'warnings': warnings,
        'percent': 100
    }
    return {'final_result' : result}



@task(bind=True)
def send_activation_email(self, subject, message, from_address, dest_addr):
    """
    Sending an activation email to the user.
    """
    max_retries = settings.RETRY_ACTIVATION_EMAIL_MAX_ATTEMPTS
    retries = self.request.retries
    try:
        mail.send_mail(subject, message, from_address, [dest_addr], fail_silently=False)
        # Log that the Activation Email has been sent to user without an exception
        log.info("Activation Email has been sent to User {user_email}".format(
            user_email=dest_addr
        ))
    except NoAuthHandlerFound:  # pylint: disable=broad-except
        log.info('Retrying sending email to user {dest_addr}, attempt # {attempt} of {max_attempts}'. format(
            dest_addr=dest_addr,
            attempt=retries,
            max_attempts=max_retries
        ))
        try:
            self.retry(countdown=settings.RETRY_ACTIVATION_EMAIL_TIMEOUT, max_retries=max_retries)
        except MaxRetriesExceededError:
            log.error(
                'Unable to send activation email to user from "%s" to "%s"',
                from_address,
                dest_addr,
                exc_info=True
            )
    except Exception:  # pylint: disable=bare-except
        log.exception(
            'Unable to send activation email to user from "%s" to "%s"',
            from_address,
            dest_addr,
            exc_info=True
        )
        raise Exception
