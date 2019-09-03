"""
Simple utility functions for computing access.
It allows us to share code between access.py and block transformers.
"""

from datetime import datetime, timedelta
from logging import getLogger

from django.conf import settings
from pytz import UTC

from courseware.access_response import AccessResponse, StartDateError
from courseware.masquerade import is_masquerading_as_student
from openedx.features.course_experience import COURSE_PRE_START_ACCESS_FLAG
from student.roles import CourseBetaTesterRole
from xmodule.util.django import get_current_request_hostname

DEBUG_ACCESS = False
log = getLogger(__name__)

ACCESS_GRANTED = AccessResponse(True)
ACCESS_DENIED = AccessResponse(False)


def debug(*args, **kwargs):
    """
    Helper function for local debugging.
    """
    # to avoid overly verbose output, this is off by default
    if DEBUG_ACCESS:
        log.debug(*args, **kwargs)


def adjust_start_date(user, days_early_for_beta, start, course_key):
    """
    If user is in a beta test group, adjust the start date by the appropriate number of
    days.

    Returns:
        A datetime.  Either the same as start, or earlier for beta testers.
    """
    if days_early_for_beta is None:
        # bail early if no beta testing is set up
        return start

    if CourseBetaTesterRole(course_key).has_user(user):
        debug("Adjust start time: user in beta role for %s", course_key)
        delta = timedelta(days_early_for_beta)
        effective = start - delta
        return effective

    return start


def check_start_date(user, days_early_for_beta, start, course_key):
    """
    Verifies whether the given user is allowed access given the
    start date and the Beta offset for the given course.

    Returns:
        AccessResponse: Either ACCESS_GRANTED or StartDateError.
    """
    log.info("check start date------")

    start_dates_disabled = settings.FEATURES['DISABLE_START_DATES']
    log.info("start_dates_disabled----%s--"% start_dates_disabled)
    if start_dates_disabled and not is_masquerading_as_student(user, course_key):
        log.info("ACCESS_GRANTED---CHeck Start DAte----")
        return ACCESS_GRANTED
    else:
        now = datetime.now(UTC)
        if start is None or in_preview_mode():
            log.info("ACCESS_GRANTED IN else CHeck start date---")
            return ACCESS_GRANTED

        effective_start = adjust_start_date(user, days_early_for_beta, start, course_key)
        log.info("effective_start-----%s---"% effective_start)

        if now > effective_start:
            log.info("in else effective_start0---Access Granted---")
            return ACCESS_GRANTED

        log.info("START DATE ERROR---")
        log.info("start---%s---"% start)
        return StartDateError(start)


def in_preview_mode():
    """
    Returns whether the user is in preview mode or not.
    """
    hostname = get_current_request_hostname()
    preview_lms_base = settings.FEATURES.get('PREVIEW_LMS_BASE', None)
    return bool(preview_lms_base and hostname and hostname.split(':')[0] == preview_lms_base.split(':')[0])


def check_course_open_for_learner(user, course):
    """
    Check if the course is open for learners based on the start date.

    Returns:
        AccessResponse: Either ACCESS_GRANTED or StartDateError.
    """
    log.info("check_course_open_for_learner----")
    log.info("user--check_course_open_for_learner---%s---"% user)
    log.info("course--check_course_open_for_learner---%s---"% course.id)
    if COURSE_PRE_START_ACCESS_FLAG.is_enabled(course.id):
        log.info("ACCESS_GRANTED check_course_open_for_learner----")
        return ACCESS_GRANTED
    log.info("else statement check_course_open_for_learner---")
    return check_start_date(user, course.days_early_for_beta, course.start, course.id)
