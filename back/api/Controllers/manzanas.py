from rest_framework import viewsets
from ..models import Manzanas
from .serializers import ManzanasSerializer

class manzanasCRUD(viewsets.ModelViewSet):
    queryset = Manzanas.objects.all()
    serializer_class = ManzanasSerializer
