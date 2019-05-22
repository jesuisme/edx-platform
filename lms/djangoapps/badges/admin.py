"""
Admin registration for Badge Models
"""
from config_models.admin import ConfigurationModelAdmin
from django.contrib import admin

from badges.models import BadgeClass, CourseCompleteImageConfiguration, CourseEventBadgesConfiguration, CourseCompleteBadges, BadgeAssertion

admin.site.register(CourseCompleteImageConfiguration)
admin.site.register(BadgeClass)
# Use the standard Configuration Model Admin handler for this model.
admin.site.register(CourseEventBadgesConfiguration, ConfigurationModelAdmin)
admin.site.register(CourseCompleteBadges)
admin.site.register(BadgeAssertion)
