from rest_framework import viewsets
from ..models import CategoriasServicios
from .serializers import CategoriasSerializer


class categorias_serviciosCRUD(viewsets.ModelViewSet):
    queryset = CategoriasServicios.objects.all()
    serializer_class = CategoriasSerializer