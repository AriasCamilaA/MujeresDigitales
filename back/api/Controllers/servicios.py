from rest_framework import viewsets
from ..models import Servicios
from .serializers import ServiciosSerializer

class serviciosCRUD(viewsets.ModelViewSet):
    queryset = Servicios.objects.all()
    serializer_class = ServiciosSerializer
