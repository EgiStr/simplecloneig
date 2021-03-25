from usercostumer.models import UserProfil,UserFollowing
from django.contrib.auth.models import User

from rest_framework.generics import (CreateAPIView, 
                                    RetrieveAPIView,
                                    RetrieveUpdateAPIView,
                                    ListAPIView,
                                    UpdateAPIView,)
import jwt

from rest_framework.permissions import IsAdminUser, IsAuthenticated,AllowAny, IsAuthenticatedOrReadOnly

from rest_framework.filters import  SearchFilter,OrderingFilter

from rest_framework.response import Response
from rest_framework import status

from django.conf import settings

from .serializers import (
                        registeruser,
                        UserProfilSerialzer,
                        FollowingOrWerSerializer,
                        UserEditProfil,
                        UserProfilPostserializer,
                        ChangePasswordSerializer,
                        FollowingSerializer, 
                        FollowersSerializer,
                        DetailUserSerializer,)

from posts.api.permission import IsOwnerOrReadOnly
from posts.api.pagination import LimitPaginationSearch

class RegisterUserApi(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = registeruser
    permission_classes = [AllowAny,]

class UserProfilApiView(RetrieveAPIView):
    serializer_class = UserProfilSerialzer
    permission_classes = [AllowAny] 
    lookup_field = 'nickname'

    def get_queryset(self):
       
        qs = UserProfil.objects.filter(nickname=self.kwargs['nickname'])

        return qs


class UserSearchApiView(ListAPIView):
    serializer_class= UserProfilPostserializer
    permission_classes =[AllowAny]
    pagination_class = LimitPaginationSearch
    filter_backends = [SearchFilter,OrderingFilter]
    search_fields = ['nickname','name']

    def get_queryset(self):
        qs = UserProfil.objects.all()
        return qs

class ChangePasswordApiView(UpdateAPIView):
    model = User
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated | IsAdminUser]
   
    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
 
        if serializer.is_valid():
            # Check old password

            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            if serializer.data.get('new_password') != serializer.data.get('new_password2'):
                return Response({"new_password": ["didnt macth"]}, status=status.HTTP_400_BAD_REQUEST)
            
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
 
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
            }

            return Response(response)
        return Response({"password new": ["password new wrong. doesnt macth"]}, status=status.HTTP_400_BAD_REQUEST)
    
    
class DetailUserApiView(RetrieveAPIView):
    serializer_class=DetailUserSerializer
    permission_classes = [IsAuthenticated]
    model = settings.AUTH_USER_MODEL
    
    def get(self, request, *args, **kwargs):
        profil = self.request.user.profil.first()
        payload = {
                'user_id': self.request.user.id ,
                "username":  self.request.user.username,
                'email': self.request.user.email,
                'profil':profil.profil.url,
                'token' : request._auth.token,
                'exp':request._auth.expires,}
        encoded_jwt = jwt.encode(payload,'secret', algorithm="HS256")
        return Response(encoded_jwt,status=status.HTTP_200_OK)

class DetailUserFollowerApiView(ListAPIView):
    serializer_class = FollowersSerializer
    permission_classes=[AllowAny]
    
    def get_queryset(self):
        
        qs = UserFollowing.objects.filter(following_user__user__id=self.request.user.id)
        return qs

class DetailUserFollowerUserApiView(ListAPIView):
    serializer_class = FollowersSerializer
    permission_classes=[AllowAny]
    
    def get_queryset(self):
        
        qs = UserFollowing.objects.filter(following_user__user__id=self.kwargs['id'])
        return qs

class DetailUserFollowingUserApiView(ListAPIView):
    serializer_class = FollowingSerializer
    
    def get_queryset(self):
        
        qs = UserFollowing.objects.filter(user__user__id=self.kwargs['id'])
        return qs

class DetailUserFollowingApiView(ListAPIView):
    serializer_class = FollowingSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        """ mengamnil id dari si followinya """
        
        qs = UserFollowing.objects.filter(user__user__id=self.request.user.id)
        return qs
    


class UserFollowingApiView(CreateAPIView):
    queryset = UserFollowing.objects.all()
    serializer_class = FollowingOrWerSerializer
    permission_classes = [IsAuthenticated]

 
class UserEditProfil(RetrieveUpdateAPIView):
    serializer_class = UserEditProfil
    permission_classes=[IsOwnerOrReadOnly | IsAdminUser]

    def get_queryset(self):
        print(self.request.META['REMOTE_ADDR'])
        qs = UserProfil.objects.filter(id=self.kwargs['pk'])
        return qs

