from rest_framework.serializers import ModelSerializer
from base.models import Meal


class MealSerializer(ModelSerializer):
    class Meta:
        model = Meal
        fields = "__all__"
