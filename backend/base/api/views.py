from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    MealSerializer,
    FoodSerializer,
    FreezerSerializer,
    GetFreezerSerializer,
)
from base.models import Food


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["name"] = user.name
        token["superuser"] = user.is_superuser
        token["staff"] = user.is_staff
        token["height"] = user.height
        token["weight"] = -user.weight
        token["age"] = user.age
        token["is_male"] = user.is_male
        token["level"] = user.level

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/token",
        "/api/token/refresh",
        "/api/meals",
        "/api/foods",
    ]
    return Response(routes)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createFood(request):
    serializer = FoodSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getFoods(request):
    foods = Food.objects.all()
    serializer = FoodSerializer(foods, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyMeals(request):
    user = request.user
    meals = user.my_meals_set.all()
    serializer = MealSerializer(meals, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getFreezer(request):
    user = request.user
    freezer = user.freezer_set.all()
    serializer = GetFreezerSerializer(freezer, many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def includeToFreezer(request):
    serializer = FreezerSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
