from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

GLASS_TYPES = [
    ('HI', 'Highball'),
    ('LO', 'Lowball'),
    ('CT', 'Coctail'),
    ('SH', 'Shot'),
    ('WN', 'Wine'),
    ('CH', 'Champagne')
]

METHODS = [
    ('SH', 'Shake'),
    ('ST', 'Stir'),
    ('BD', 'Build'),
    ('MD', 'Muddle'),
    ('TH', 'Throw'),
    ('SW', 'Swizzle')
]

STYLES = [
    ('SR', 'Sour'),
    ('CR', 'Creamy'),
    ('SF', 'Spirit-Forward'),
    ('CH', 'Champagne'),
    ('HI', 'Highball'),
    ('SH', 'Shot'),
    ('OT', 'Other')
]


class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    image = models.CharField(max_length=500, blank=True)
    is_available = models.BooleanField(default=False)
    price_per_l = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(500.0)])

    def __str__(self):
        return f"{self.name} {self.id}"


class Coctail(models.Model):
    name = models.CharField(max_length=100, unique=True)
    instructions = models.TextField()
    image = models.CharField(max_length=500, blank=True)
    optional = models.TextField(blank=True)
    glass = models.CharField(
        max_length=2,
        choices=GLASS_TYPES,
        default='HI'
    )
    method = models.CharField(
        max_length=2,
        choices=METHODS,
        default='SH'
    )
    style = models.CharField(
        max_length=2,
        choices=STYLES,
        default='SR'
    )

    ingredients = models.ManyToManyField(
        Ingredient,
        through='Recipe',
        through_fields=('coctail', 'ingredient'),
    )

    def __str__(self):
        return self.name


class Recipe(models.Model):
    coctail = models.ForeignKey(Coctail, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    how_much = models.PositiveIntegerField(validators=[MaxValueValidator(200)])
    order = models.PositiveSmallIntegerField(
        validators=[MaxValueValidator(10)])

    def __str__(self):
        return f"{self.coctail} | {self.ingredient}"
