from rest_framework import viewsets
from ..models import TiposServicios
from .serializers import TiposServiciosSerializer

class tipos_serviciosCRUD(viewsets.ModelViewSet):
    queryset = TiposServicios.objects.all()
    serializer_class = TiposServiciosSerializer
