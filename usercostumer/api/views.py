from rest_framework import serializers
from rest_framework import permissions
from usercostumer.models import UserProfil
from rest_framework.generics import CreateAPIView,RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated,AllowAny

from .serializers import registeruser,UserProfilSerialzer

from django.contrib.auth.models import User

class RegisterUserApi(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = registeruser
    permission_classes = [AllowAny,]

class UserProfilApiView(RetrieveAPIView):
    queryset = UserProfil.objects.all()
    serializer_class = UserProfilSerialzer
    permission_classes = [IsAuthenticated] 