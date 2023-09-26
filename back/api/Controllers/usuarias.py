from rest_framework import viewsets
from ..models import Usuarias
from .serializers import UsuariasSerializer

class usuariasCRUD(viewsets.ModelViewSet):
    queryset = Usuarias.objects.all()
    serializer_class = UsuariasSerializer