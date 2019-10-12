"""
Admin registration for Badge Models
"""
from config_models.admin import ConfigurationModelAdmin
from django.contrib import admin

from badges.models import PercentBaseBadges, BadgeClass, CourseCompleteImageConfiguration, CourseEventBadgesConfiguration, CourseCompleteBadges, BadgeAssertion

admin.site.register(CourseCompleteImageConfiguration)
admin.site.register(BadgeClass)
# Use the standard Configuration Model Admin handler for this model.
admin.site.register(CourseEventBadgesConfiguration, ConfigurationModelAdmin)
admin.site.register(CourseCompleteBadges)
admin.site.register(PercentBaseBadges)
# admin.site.register(BadgeAssertion)

@admin.register(BadgeAssertion)
class BadgeAssertionAdmin(admin.ModelAdmin):
    """ Admin interface for the StudentCourseViews model. """
    readonly_fields = ['date_updated']

    class Meta(object):
        model = BadgeAssertion
