from rest_framework import serializers
from .models import Owe


class OweSerializer(serializers.ModelSerializer):

    class Meta:
        model = Owe
        fields = (
            'id', 'lend', 'name', 'email',
            'money', 'reason',
        )
