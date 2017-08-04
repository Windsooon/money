from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^email/', views.email),
    url(r'^api/', include('api.urls')),
    url(r'^api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'^', views.frontpage),
]
