from rest_framework import viewsets
from ..models import Personas
from .serializers import PersonasSerializer

class personasCRUD(viewsets.ModelViewSet):
    queryset = Personas.objects.all()
    serializer_class = PersonasSerializer