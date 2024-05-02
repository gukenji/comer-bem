from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.forms import ValidationError
from .managers import CustomUserManager
from django.utils import timezone

# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(blank=False, default="", unique=True)
    name = models.CharField(max_length=255, blank=False, default="")
    height = models.IntegerField(blank=False)
    weight = models.FloatField(blank=False)
    age = models.IntegerField(blank=False)
    profile_pic = models.ImageField(
        null=True, blank=True, upload_to="images/profile_pics/"
    )
    gcd = models.IntegerField(blank=True, default=0)
    is_male = models.BooleanField(blank=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["name", "height", "weight", "age", "is_male"]

    def save(self, *args, **kwargs):
        if self.gcd == 0:
            self.gcd = int(1.3 * (66.47 + (13.75 * self.weight) + (5 * self.height) - (6.8 * self.age)))
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name or self.email.split("@")[0]


class Food(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=False)
    brand = models.CharField(max_length=255, blank=True)
    name = models.CharField(max_length=255, blank=False)
    portion_size = models.FloatField(blank=False)
    is_custom_portion = models.BooleanField(blank=False)
    portion_description = models.CharField(max_length=255, blank=True, default=None)
    kcal = models.FloatField(blank=False)
    protein = models.FloatField(blank=False)
    carbs = models.FloatField(blank=False)
    fat = models.FloatField(blank=False)

    def save(self, *args, **kwargs):
        if self.is_custom_portion and len(self.portion_description) == 0:
            raise ValidationError("You need to provide a portion description")
        super(Food, self).save(*args, **kwargs)


class Meal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=False)
    name = models.CharField(max_length=255, blank=False)
    icon = models.CharField(blank=True, null=True)


class MyMeals(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=True)
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE, blank=False)
    food = models.ForeignKey(Food, on_delete=models.CASCADE, blank=False)
    quantity = models.FloatField(blank=False)


class Inventory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=False)
    food = models.ForeignKey(Food, on_delete=models.CASCADE, null=False, blank=False)
    quantity = models.FloatField(blank=True)


class Character(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=False)
    level = models.IntegerField(default=1)
    experience = models.IntegerField(default=0)


class Level(models.Model):
    level = models.IntegerField()
    experience_needed = models.IntegerField()
