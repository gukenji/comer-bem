from rest_framework.serializers import ModelSerializer
from base.models import Meal, Food


class MealSerializer(ModelSerializer):
    class Meta:
        model = Meal
        fields = "__all__"


class FoodSerializer(ModelSerializer):
    class Meta:
        model = Food
        fields = "__all__"
