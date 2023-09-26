from rest_framework import viewsets
from ..models import TipoDocumento
from .serializers import TipoDocumentoSerializer

class tipo_documentoCRUD(viewsets.ModelViewSet):
    queryset = TipoDocumento.objects.all()
    serializer_class = TipoDocumentoSerializer