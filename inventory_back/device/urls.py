from django.urls import path, include
from rest_framework import routers

from .views import DeviceViewSet

router = routers.SimpleRouter()
router.register(r'device', DeviceViewSet, basename='device')
from . import views

urlpatterns = [
    path("api/v1/get_file", views.get_file, name="get_file"),
    path('api/v1/', include(router.urls)),
]