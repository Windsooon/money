from .models import Lend
from rest_framework import serializers
from owe.serializers import OweSerializer


class LendSerializer(serializers.ModelSerializer):
    owe = OweSerializer(many=True, read_only=True)

    class Meta:
        model = Lend
        fields = (
            'id', 'name', 'email', 'owe',
        )
