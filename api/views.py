from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from lend.models import Lend
from lend.serializers import LendSerializer
from owe.models import Owe
from owe.serializers import OweSerializer


class LendViewSet(viewsets.ModelViewSet):
    queryset = Lend.objects.all()
    serializer_class = LendSerializer


class OweViewSet(viewsets.ModelViewSet):
    serializer_class = OweSerializer

    def get_queryset(self):
        queryset = Owe.objects.all()

        email = self.request.query_params.get('email', None)
        if email is not None:
            queryset = queryset.filter(email=email)
        return queryset


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'lend': reverse('lend_list', request=request, format=format),
        'owe': reverse('owe_list', request=request, format=format),
    })
