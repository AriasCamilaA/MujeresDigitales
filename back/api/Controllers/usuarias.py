from rest_framework import viewsets
from ..models import Usuarias
from .serializers import UsuariasSerializer
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt 
class usuariasCRUD(viewsets.ModelViewSet):
    queryset = Usuarias.objects.all()
    serializer_class = UsuariasSerializer

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None,**kwargs):
            UsuariaModel = get_user_model()
            try:
                usuaria = UsuariaModel.objects.get(email=username)
            except UsuariaModel.DoesNotExist:
                return None
            else:
                if usuaria.check_password(password):
                    return usuaria
            return None
    def login(request):
         email = request.POST.get('email')
         password = request.POST.get('password')
         usuaria = authenticate(request, email = email, password=password)

         if usuaria:
              return HttpResponse('Usuaria autenticada')
         else:
              return HttpResponse('Usuaria no autenticada')