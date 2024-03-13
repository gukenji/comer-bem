from django.contrib import admin

# Register your models here.
from .models import User, Meal, Food, MyMeals, Freezer

admin.site.register(User)
admin.site.register(Meal)
admin.site.register(Food)
admin.site.register(Freezer)
admin.site.register(MyMeals)
