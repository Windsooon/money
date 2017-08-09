from rest_framework import serializers
from .models import Owe


class OweSerializer(serializers.ModelSerializer):
    lend_email = serializers.ReadOnlyField(source='lend.email')

    class Meta:
        model = Owe
        fields = (
            'id', 'lend_email', 'email',
            'money', 'reason',
        )
