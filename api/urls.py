from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

lend_list = views.LendViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

lend_detail = views.LendViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

owe_list = views.OweViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

owe_detail = views.OweViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})


urlpatterns = format_suffix_patterns([
    url(r'lend/$', lend_list, name='lend_list'),
    url(r'lend/(?P<pk>[0-9]+)/$', lend_detail, name='lend_detail'),
    url(r'owe/$', owe_list, name='owe_list'),
    url(r'owe/(?P<pk>[0-9]+)/$', owe_detail, name='owe_detail'),
    url(r'$', views.api_root),
])
