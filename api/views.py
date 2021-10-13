from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import CoctailSerializer, IngredientSerializer
from .models import Coctail, Ingredient

import random

# Create your views here.


class CoctailsView(APIView):
    def get(self, request):
        only_available = request.query_params.get('available') == 'true'
        if only_available:
            unavailable_ingredients = Ingredient.objects.filter(
                is_available=False)
            coctails = Coctail.objects.exclude(
                ingredients__in=unavailable_ingredients)
        else:
            coctails = Coctail.objects.all()

        style = request.query_params.get('style')
        if style:
            coctails = coctails.filter(style=style)

        ingredient_id = request.query_params.get('ingredient')
        if ingredient_id:
            coctails = coctails.filter(ingredients__id=int(ingredient_id))

        serializer = CoctailSerializer(coctails, many=True)
        return Response(serializer.data)


class RandomCoctailView(APIView):
    def get(self, request):
        only_available = request.query_params.get('available') == 'true'
        if only_available:
            unavailable_ingredients = Ingredient.objects.filter(
                is_available=False)
            coctails = Coctail.objects.exclude(
                ingredients__in=unavailable_ingredients)
        else:
            coctails = Coctail.objects.all()

        style = request.query_params.get('style')
        if style:
            coctails = coctails.filter(style=style)

        ingredient_id = request.query_params.get('ingredient')
        if ingredient_id:
            coctails = coctails.filter(ingredients__id=int(ingredient_id))

        random_coctail = random.choice(coctails)
        serializer = CoctailSerializer(random_coctail)
        return Response(serializer.data)


class IngredientsView(APIView):
    def get(self, request):
        ingredients = Ingredient.objects.all()
        serializer = IngredientSerializer(ingredients, many=True)
        return Response(serializer.data)
