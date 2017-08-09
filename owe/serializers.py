from rest_framework import serializers
from .models import Owe


class OweSerializer(serializers.ModelSerializer):
    lend_email = serializers.SerializerMethodField()

    class Meta:
        model = Owe
        fields = (
            'id', 'lend', 'lend_email', 'email',
            'money', 'reason',
        )

    def get_lend_email(self, obj):
        raw_email = obj.lend.email
        pre_email, domain = raw_email.split('@')
        if len(pre_email) > 3:
            return pre_email[0:-3] + '*' * 4  + '@' + domain
        else:
            return raw_email
