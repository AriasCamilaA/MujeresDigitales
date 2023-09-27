from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import AbstractBaseUser, AbstractUser
from ...models import Usuarias
from rest_framework_jwt.settings import api_settings


@api_view (['POST'])
@permission_classes([AllowAny])

def login(request):
    email = Usuarias.email#request.data['email']
    password = Usuarias.password#request.data['password']
    usuaria = authenticate()