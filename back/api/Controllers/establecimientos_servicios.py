from rest_framework import viewsets
from ..models import EstablecimientosServicios
from .serializers import EstablecimientosSerializer

class establecimientosCRUD(viewsets.ModelViewSet):
    queryset = EstablecimientosServicios.objects.all()
    serializer_class = EstablecimientosSerializer
