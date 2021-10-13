from rest_framework import serializers
from .models import Coctail, Recipe, Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name']

class RecipeSerializer(serializers.ModelSerializer):
    ingredient_name = serializers.ReadOnlyField(source='ingredient.name')

    class Meta:
        model = Recipe
        fields = ('order', 'ingredient_name', 'how_much')
        

class CoctailSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(source='recipe_set', many=True)
    cost = serializers.SerializerMethodField()

    def get_cost(self, obj):
        recipe = obj.recipe_set.all()
        sum = 0
        for ingredient in recipe:
            cost = ingredient.how_much * ingredient.ingredient.price_per_l / 1000
            sum += cost
        sum = round(sum)
        return sum

    class Meta:
        model = Coctail
        fields = ('name', 'image', 'recipe', 'instructions', 'optional', 'glass', 'method', 'cost')