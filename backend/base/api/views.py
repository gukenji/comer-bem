from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    MealSerializer,
    FoodSerializer,
    InventorySerializer,
    GetInventorySerializer,
    RegistrationSerializer,
)
from base.models import Food, Inventory, User, Meal
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken


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
        token["profile_pic"] = str(user.profile_pic) if user.profile_pic else None
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def registration_view(request):
    if request.method == "POST":
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(email=request.data["email"])
            data["response"] = "usuário registrado com sucesso!"
            data["email"] = user.email
            data["name"] = user.name
        else:
            data = serializer.errors
        return Response(data)


@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/token",
        "/api/token/refresh",
        "/api/meals",
        "/api/foods",
        "/api/inventory/get/",
        "/api/inventory/include/<str:pk>/",
        "/api/inventory/update/<str:pk>/",
    ]
    return Response(routes)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createFood(request):
    token = AccessToken(request.data["token"])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    serializer = FoodSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user=user)
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
    meals = Meal.objects.filter(user=user)
    serializer = MealSerializer(meals, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createMeal(request):
    token = AccessToken(request.data["token"])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    serializer = MealSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user=user)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getInventory(request):
    user = request.user
    inventory = user.inventory_set.all()
    serializer = GetInventorySerializer(inventory, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def includeToInventory(request):
    token = AccessToken(request.data["token"])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    serializer = InventorySerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save(user=user)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteFromInventory(request, pk):
    token = AccessToken(request.data["token"])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    inventory = Inventory.objects.get(id=pk, user=user)
    if inventory:
        inventory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"msg": "teste"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def updateInventory(request, pk):
    token = AccessToken(request.data["token"])
    user_id = token.payload["user_id"]
    user = User.objects.get(id=user_id)
    inventory = Inventory.objects.get(id=pk, user=user)
    serializer = InventorySerializer(instance=inventory, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors)


@api_view(["GET"])
def checkAccountExist(request, email):
    user = User.objects.filter(email=email)
    response = True if user else False
    return Response(response)
