from rest_framework.serializers import ModelSerializer
from base.models import Meal, Food, MyMeals, Inventory


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


class GetInventorySerializer(ModelSerializer):
    class Meta:
        model = Inventory
        fields = ["food", "id", "quantity"]
        depth = 1


class InventorySerializer(ModelSerializer):
    class Meta:
        model = Inventory
        fields = "__all__"

    # def update(self, instance, validated_data):
