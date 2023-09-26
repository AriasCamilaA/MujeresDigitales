from rest_framework import viewsets
from ..models import Municipios
from .serializers import MunicipiosSerializer

class municipiosCRUD(viewsets.ModelViewSet):
    queryset = Municipios.objects.all()
    serializer_class = MunicipiosSerializer
