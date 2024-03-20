from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("", views.getRoutes),
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("foods/get/", views.getFoods),
    path("foods/create/", views.createFood),
    path("inventory/get/", views.getInventory),
    path("inventory/include/", views.includeToInventory),
    path("inventory/update/<str:pk>/", views.updateInventory),
    path("meals/get/", views.getMyMeals),
    path("user/register/", views.registration_view, name="register"),
]
