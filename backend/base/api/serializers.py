from rest_framework.serializers import ModelSerializer
from base.models import Alimento, Dispensa, Ingestao, Refeicao, User
from rest_framework import serializers


class RegistrationSerializer(ModelSerializer):
    password_confirmation = serializers.CharField(
        style={"input_type": "password"}, write_only=True
    )

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "password_confirmation",
            "name",
            "height",
            "weight",
            "age",
            "is_male",
            "profile_pic",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):
        print(self.validated_data)
        user = User(
            email=self.validated_data["email"],
            name=self.validated_data["name"],
            height=self.validated_data["height"],
            weight=self.validated_data["weight"],
            age=self.validated_data["age"],
            is_male=self.validated_data["is_male"],
            profile_pic=self.validated_data["profile_pic"],
        )
        password = self.validated_data["password"]
        password_confirmation = self.validated_data["password_confirmation"]
        if password != password_confirmation:
            raise serializers.ValidationError(
                {"error_message": "Senhas devem coincidir!"}
            )
        user.set_password(password)
        user.save()


# class FoodSerializer(ModelSerializer):
#     class Meta:
#         model = Food
#         fields = "__all__"


# class MealSerializer(ModelSerializer):
#     class Meta:
#         model = Meal
#         fields = "__all__"


# class MyMealsSerializer(ModelSerializer):
#     class Meta:
#         model = MyMeals
#         fields = "__all__"


# class GetInventorySerializer(ModelSerializer):
#     class Meta:
#         model = Inventory
#         fields = ["food", "id", "quantity"]
#         depth = 1


# class InventorySerializer(ModelSerializer):
#     class Meta:
#         model = Inventory
#         fields = "__all__"
