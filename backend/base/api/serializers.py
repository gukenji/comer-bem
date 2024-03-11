from rest_framework.serializers import ModelSerializer
from base.models import Meal, Food, MyMeals, Freezer


class FoodSerializer(ModelSerializer):
    class Meta:
        model = Food
        fields = "__all__"


class MealSerializer(ModelSerializer):
    class Meta:
        model = Meal
        fields = "__all__"


class MyMealsSerializer(ModelSerializer):
    class Meta:
        model = MyMeals
        fields = "__all__"


class GetFreezerSerializer(ModelSerializer):
    class Meta:
        model = Freezer
        fields = "__all__"
        depth = 1


class FreezerSerializer(ModelSerializer):
    class Meta:
        model = Freezer
        fields = "__all__"
