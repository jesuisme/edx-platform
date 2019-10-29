"""
Events which have to do with a user doing something with more than one course, such
as enrolling in a certain number, completing a certain number, or completing a specific set of courses.
"""
import logging
from badges.models import PercentBaseBadges, BadgeAssertion, BadgeClass, CourseEventBadgesConfiguration
from badges.utils import requires_badges_enabled
log = logging.getLogger(__name__)

def  award_badge(config, count, user):
    """
    Given one of the configurations for enrollments or completions, award
    the appropriate badge if one is configured.

    config is a dictionary with integer keys and course keys as values.
    count is the key to retrieve from this dictionary.
    user is the user to award the badge to.

    Example config:
        {3: 'slug_for_badge_for_three_enrollments', 5: 'slug_for_badge_with_five_enrollments'}
    """
    slug = config.get(count)
    if not slug:
        return
    badge_class = BadgeClass.get_badge_class(
        slug=slug, issuing_component='openedx__course', create=False,
    )
    if not badge_class:
        return
    if not badge_class.get_for_user(user):
        assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)
        # badge_class.award(user)


def award_enrollment_badge(user):
    """
    Awards badges based on the number of courses a user is enrolled in.
    """
    config = CourseEventBadgesConfiguration.current().enrolled_settings
    enrollments = user.courseenrollment_set.filter(is_active=True).count()
    award_badge(config, enrollments, user)


@requires_badges_enabled
def completion_check(user):
    """
    Awards badges based upon the number of courses a user has 'completed'.
    Courses are never truly complete, but they can be closed.

    For this reason we use checks on certificates to find out if a user has
    completed courses. This badge will not work if certificate generation isn't
    enabled and run.
    """
    from lms.djangoapps.certificates.models import CertificateStatuses
    config = CourseEventBadgesConfiguration.current().completed_settings
    certificates = user.generatedcertificate_set.filter(status__in=CertificateStatuses.PASSED_STATUSES).count()
    award_badge(config, certificates, user)


@requires_badges_enabled
def course_group_check(user, course_key):
    """
    Awards a badge if a user has completed every course in a defined set.
    """
    from lms.djangoapps.certificates.models import CertificateStatuses
    config = CourseEventBadgesConfiguration.current().course_group_settings
    awards = []
    for slug, keys in config.items():
        if course_key in keys:
            certs = user.generatedcertificate_set.filter(
                status__in=CertificateStatuses.PASSED_STATUSES,
                course_id__in=keys,
            )
            if len(certs) == len(keys):
                awards.append(slug)

    for slug in awards:
        badge_class = BadgeClass.get_badge_class(
            slug=slug, issuing_component='openedx__course', create=False,
        )
        if badge_class and not badge_class.get_for_user(user):
            # badge_class.award(user)
            assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)



@requires_badges_enabled
def deep_drive_badge(user, completed_first_challenge=None):
    """
    """
    # slug = config.get(count)first_challenge
    if completed_first_challenge == "first_challenge":
        badge_class = BadgeClass.get_badge_class(slug= 'value_practitioner',issuing_component='openedx__course', create=False,
        )
        if not badge_class:
            return
        if not badge_class.get_for_user(user):
            assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)
    if completed_first_challenge == "deep_drive":

        badge_class = BadgeClass.get_badge_class(slug= 'deep_drive',issuing_component='openedx__course', create=False,
        )
        if not badge_class:
            return
        if badge_class and not badge_class.get_for_user(user):
            assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)



@requires_badges_enabled
def percent_base_badges(user):
    """
    """
    from student.models import CourseProgress
    count = 0
    count1 = 0
    # slug = config.get(count)
    course_list = PercentBaseBadges.objects.all()
    user_list = CourseProgress.objects.filter(user = user)
    course_group_for_badges = [str(x.course_id) for x in course_list]
    if user_list:
        for user_progress in user_list:
            if str(user_progress.course_id) in  course_group_for_badges:
                if user_progress.student_course_progress == 100:

                    count += 1
                if user_progress.student_course_progress > 74:
                    count1 += 1
    if count > 0:
        badge_class = BadgeClass.get_badge_class(slug= 'power_learner',issuing_component='openedx__course', create=False,)
        if badge_class and not badge_class.get_for_user(user):
            assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)
    if count1 > 0:
        badge_class = BadgeClass.get_badge_class(slug= 'engaged_learner',issuing_component='openedx__course', create=False,)
        if badge_class and not badge_class.get_for_user(user):
            assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)



@requires_badges_enabled
def user_response_badges(user):
    """
    """
    from student.models import QuestionResponse, StudentModuleViews
    user_response = QuestionResponse.objects.filter(user=user)
    if user_response:
        badge_class = BadgeClass.get_badge_class(slug = 'user_response',issuing_component='openedx__course', create=False,)
        if badge_class and not badge_class.get_for_user(user):
            assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)

    moduleview = StudentModuleViews.objects.filter(user=user)
    count = 0
    if moduleview:
        for row in moduleview:
            if row.course_views > 3:
                count += 1
        if count > 0:
            badge_class = BadgeClass.get_badge_class(slug = 'sincere_learner',issuing_component='openedx__course', create=False,)
            # if badge_class:
            if badge_class and not badge_class.get_for_user(user):
                assertion, created = BadgeAssertion.objects.get_or_create(user=user, badge_class=badge_class,image_url=badge_class.image.url,drive_image_url=badge_class.image_url_from_drive)
