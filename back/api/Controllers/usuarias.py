from django.contrib.auth.hashers import make_password
from rest_framework import viewsets
from ..models import Usuarias
from .serializers import UsuariasSerializer
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, authenticate
from django.http import JsonResponse

def save(self, *args, **kwargs):
    if self.password:
        self.password = make_password(self.password)
            
class usuariasCRUD(viewsets.ModelViewSet):
    queryset = Usuarias.objects.all()
    serializer_class = UsuariasSerializer
#ignorar el token de crsf temporalmente mientras se autentica el login 
@csrf_exempt
#definicion de clase para realizar la autenticacion con email reemplazando el username
def login_view(request):
    if request.method =='POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        #cifrar contraseña para comparar en con la base de datos 
        save()

        # Autenticar al usuario utilizando el correo electrónico y la contraseña
        usuaria = authenticate(request, email=email, password=password)
        # Comprobar si la autenticación fue exitosa
        if usuaria:
            # Iniciar sesión para el usuario autenticado
            login(request, usuaria)
            return JsonResponse({'message': 'Usuaria autenticada'})
        else:
            return JsonResponse({'message': 'Usuaria no autenticada'}, status=401)
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)