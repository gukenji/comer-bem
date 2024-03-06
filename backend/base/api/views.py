from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .serializers import MealSerializer

# from base.models import Meal


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["name"] = user.name
        token["superuser"] = user.is_superuser
        token["staff"] = user.is_staff

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = ["/api/token", "/api/token/refresh", "/api/meals"]
    return Response(routes)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMeals(request):
    user = request.user
    # meals = Meal.objects.all()
    meals = user.meal_set.all()
    serializer = MealSerializer(meals, many=True)
    return Response(serializer.data)
