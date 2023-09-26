from rest_framework import viewsets
from ..models import Agenda
from .serializers import AgendaSerializer


class agendaCRUD(viewsets.ModelViewSet):
    queryset = Agenda.objects.all()
    serializer_class  =AgendaSerializer