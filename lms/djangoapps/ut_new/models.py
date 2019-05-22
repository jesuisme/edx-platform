# """ models for coherts"""

# from django.db import models
# from django.contrib.auth.models import User
# from openedx.core.djangoapps.user_api.models import UserPreference

# from openedx.core.djangoapps.user_api.models import OrganizationTokenGeneration
# from django.core.validators import RegexValidator


# class OrganizationRegistration(models.Model):  
#     class Meta(object):
#         db_table = "ut_new_organization_registration"

#     def __unicode__(self):
#         return self.organization_name

#     def __str__(self):
#         return self.organization_name

        
#     user = models.ForeignKey(User, db_index=True, related_name="organization", on_delete=models.CASCADE, null=True)
#     organization_name = models.CharField(blank=True, max_length=255, db_index=True, unique=True)
#     package_name = models.ForeignKey(OrganizationTokenGeneration)
#     meta = models.TextField(blank=True)  # JSON dictionary for future expansion
#     organization_domain = models.CharField(blank=True, max_length=255, default='')
#     organization_email = models.EmailField(max_length=150,blank=True, null= True, unique= True)
#     phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
#     organization_contact_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
#     is_active = models.BooleanField(default=False)

#     def delete(self, *agrs,**kwargs):
#         user = User.objects.get(username=self.user)
#         user_profile_field =  UserProfile.objects.get(user=user)
#         UserPreference.objects.filter(user=user).delete()
#         user.delete()
#         user_profile_field.delete()
#         AUDIT_LOG.info("Delete in student organization models.......")       
#         super(OrganizationRegistration, self).delete()

# class CohertsOrganization(models.Model):
# 	""" coherts for organization"""

# 	class Meta(object):
# 		app_label = "ut_new"
# 		db_table = "ut_new_cohertsorganization"


# 	coherts_name = models.CharField(max_length=225, db_index=True)
# 	organization = models.ForeignKey(OrganizationRegistration, db_index=True, on_delete=models.CASCADE, null=True)
