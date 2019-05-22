"""
Student app helpers and settings
"""
from openedx.core.djangoapps.waffle_utils import WaffleSwitchNamespace


default_app_config = 'student.apps.EcommerceAppConfig'
# Namespace for student app waffle switches
STUDENT_WAFFLE_NAMESPACE = WaffleSwitchNamespace(name='student')
