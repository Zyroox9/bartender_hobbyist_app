from django.urls import path

from .views import CoctailsView, RandomCoctailView, IngredientsView


urlpatterns = [
    path('random/', RandomCoctailView.as_view()),
    path('ingredients/', IngredientsView.as_view()),
    path('', CoctailsView.as_view()),
]
