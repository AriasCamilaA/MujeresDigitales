from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .Controllers.tipo_documento import tipo_documentoCRUD

router = DefaultRouter()
router.register(r'tipo_documento', tipo_documentoCRUD)

urlpatterns=[
path('',include(router.urls)),

]
