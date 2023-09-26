from django.urls import path
from Controllers.tipo_documento import tipo_documentoCRUD


urlpatterns = [
    path('tipo_documento/',tipo_documentoCRUD, name="tipo_documentoCRUD"),
]