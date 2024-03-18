from django.contrib import admin

# Register your models here.
from .models import User, Meal, Food, MyMeals, Inventory

admin.site.register(User)
admin.site.register(Meal)
admin.site.register(Food)
admin.site.register(Inventory)
admin.site.register(MyMeals)
