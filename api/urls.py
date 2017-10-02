from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from api import views as api_view

router = routers.DefaultRouter()
router.register(r'farmers', api_view.FarmerViewSet)
router.register(r'farm', api_view.FarmViewSet)
router.register(r'farm-field', api_view.FarmFieldViewSet)

app_name = 'api'
urlpatterns = [
    url(r'^', include(router.urls)),
    # url(r'^', include(router.urls, namespace='api')),
    url(r'^token/$', obtain_auth_token),
]
