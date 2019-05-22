
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import six
import logging
AUDIT_LOG = logging.getLogger("audit")

class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, post, timestamp):
        AUDIT_LOG.info('Inside the token generator------------%s------' % post)
        return (
                six.text_type(post.pk) + six.text_type(timestamp) +
                six.text_type(post.is_active)
        )
account_activation_token = TokenGenerator()

