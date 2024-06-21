from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.forms import ValidationError
from .managers import CustomUserManager
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField

# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):
    generos = ((1, "MASCULINO"), (2, "FEMININO"))
    nome = models.CharField(max_length=255, blank=False, default="")
    email = models.EmailField(blank=False, default="", unique=True)
    peso = models.FloatField(blank=False)
    altura = models.IntegerField(blank=False)
    data_nascimento = models.DateField(blank=False)
    profile_pic = models.ImageField(
        null=True, blank=True, upload_to="images/profile_pics/"
    )
    taxa_metabolica = models.FloatField(blank=True, default=1.3)
    meta_calorias = models.IntegerField(blank=True, default=0)
    genero = models.IntegerField(blank=False, choices=generos)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"

    REQUIRED_FIELDS = ["nome", "peso", "altura", "data_nascimento", "genero"]

    def save(self, *args, **kwargs):
        print(self)
        if self.meta_calorias == 0:
            self.meta_calorias = int(
                self.taxa_metabolica
                * (
                    66.47
                    + (13.75 * self.peso)
                    + (5 * self.altura)
                    - (6.8 * self.calculaIdade())
                )
            )
        super().save(*args, **kwargs)

    def calculaIdade(self):
        data_atual = timezone.now()
        idade = (
            data_atual.year
            - self.data_nascimento.year
            - (
                (data_atual.month, data_atual.day)
                < (self.data_nascimento.month, self.data_nascimento.day)
            )
        )
        return idade

    # def calculaMetaCalorias(self):

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def get_full_name(self):
        return self.nome

    def get_short_name(self):
        return self.nome or self.email.split("@")[0]


class Alimento(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    nome = models.CharField(max_length=255, blank=False)
    marca = models.CharField(max_length=255, blank=True)
    peso_referencia = models.FloatField(blank=False)

    carboidratos = models.FloatField(blank=False)
    proteinas = models.FloatField(blank=False)
    gorduras = models.FloatField(blank=False)
    calorias = models.FloatField(blank=False)
    codigo_barra = models.CharField(blank=True)
    porcao_customizada = models.BooleanField(blank=False)
    descricao_porcao = models.CharField(max_length=255, blank=True, default=None)

    def save(self, *args, **kwargs):
        if self.porcao_customizada and len(self.descricao_porcao) == 0:
            raise ValidationError("É necessário incluir uma descrição.")
        super(Alimento, self).save(*args, **kwargs)


class Refeicao(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=False)
    nome = models.CharField(max_length=255, blank=False)
    alimentos = models.ManyToManyField(Alimento)
    icone = models.CharField(blank=True, null=True)


class Dispensa(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=True)
    alimentos = models.ManyToManyField(Alimento)


class Ingestao(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=False)
    data_ingestao = models.DateTimeField(default=timezone.now)
    alimentos = models.ManyToManyField(Alimento)
