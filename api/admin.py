from django.contrib import admin

from .models import Ingredient, Coctail, Recipe

# Register your models here.

admin.site.register(Ingredient)
admin.site.register(Coctail)
admin.site.register(Recipe)