from usercostumer.models import UserProfil,UserFollowing
from rest_framework.generics import CreateAPIView, DestroyAPIView,RetrieveAPIView,RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated,AllowAny, IsAuthenticatedOrReadOnly

from .serializers import registeruser,UserProfilSerialzer,FollowingOrWerSerializer,UserEditProfil

from posts.api.permission import IsOwnerOrReadOnly

from django.contrib.auth.models import User

class RegisterUserApi(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = registeruser
    permission_classes = [AllowAny,]

class UserProfilApiView(RetrieveAPIView):
    queryset = UserProfil.objects.all()
    serializer_class = UserProfilSerialzer
    permission_classes = [IsAuthenticatedOrReadOnly] 


class UserFollowingApiView(CreateAPIView):
    queryset = UserFollowing.objects.all()
    serializer_class = FollowingOrWerSerializer
    permission_classes = [IsAuthenticated]

class UserUnfollowApiView(DestroyAPIView):
    queryset = UserFollowing.objects.all()
    serializer_class = UserProfilApiView
    permission_classes=[IsAuthenticated,]

    

class UserEditProfil(RetrieveUpdateAPIView):
    queryset= UserProfil.objects.all()
    serializer_class = UserEditProfil
