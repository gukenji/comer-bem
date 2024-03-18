from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView

urlpatterns = [
    path("", views.getRoutes),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("foods/get/", views.getFoods),
    path("foods/create/", views.createFood),
    path("inventory/get/", views.getInventory),
    path("inventory/include/", views.includeToInventory),
    path("meals/get/", views.getMyMeals),
]
