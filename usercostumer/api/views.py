from rest_framework import serializers
from rest_framework import permissions
from usercostumer.models import UserProfil,UserFollowing
from rest_framework.generics import CreateAPIView, DestroyAPIView,RetrieveAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated,AllowAny

from .serializers import registeruser,UserProfilSerialzer,FollowingOrWerSerializer


from django.contrib.auth.models import User

class RegisterUserApi(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = registeruser
    permission_classes = [AllowAny,]

class UserProfilApiView(RetrieveAPIView):
    queryset = UserProfil.objects.all()
    serializer_class = UserProfilSerialzer
    permission_classes = [IsAuthenticated] 


class UserFollowingApiView(CreateAPIView):
    queryset = UserFollowing.objects.all()
    serializer_class = FollowingOrWerSerializer
    permission_classes = [IsAuthenticated]

class UserUnfollowApiView(DestroyAPIView):
    queryset = UserFollowing.objects.all()
    serializer_class = UserProfilApiView
    permission_classes=[IsAuthenticated,]

    