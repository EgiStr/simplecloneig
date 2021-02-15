from usercostumer.models import UserProfil,UserFollowing
from django.contrib.auth.models import User

from rest_framework.generics import (CreateAPIView, 
                                    DestroyAPIView,
                                    RetrieveAPIView,
                                    RetrieveUpdateAPIView,
                                    ListAPIView,
                                    UpdateAPIView,)

from rest_framework.permissions import IsAuthenticated,AllowAny, IsAuthenticatedOrReadOnly

from rest_framework.filters import  SearchFilter,OrderingFilter

from rest_framework.response import Response
from rest_framework import status

from .serializers import (
                        registeruser,
                        UserProfilSerialzer,
                        FollowingOrWerSerializer,
                        UserEditProfil,
                        UserProfilPostserializer,
                        ChangePasswordSerializer,
                        FollowingSerializer, 
                        FollowersSerializer,)

from posts.api.permission import IsOwnerOrReadOnly
from posts.api.pagination import LimitPaginationSearch

class RegisterUserApi(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = registeruser
    permission_classes = [AllowAny,]

class UserProfilApiView(RetrieveAPIView):
    queryset = UserProfil.objects.all()
    serializer_class = UserProfilSerialzer
    permission_classes = [IsAuthenticatedOrReadOnly] 


class UserSearchApiView(ListAPIView):
    serializer_class= UserProfilPostserializer
    permission_classes =[IsAuthenticatedOrReadOnly]
    pagination_class = LimitPaginationSearch
    filter_backends = [SearchFilter,OrderingFilter]
    search_fields = ['nickname']

    def get_queryset(self):
        qs = UserProfil.objects.all()
        return qs

class ChangePasswordApiView(UpdateAPIView):
    model = User
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]
   
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
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
 
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)
        return Response({"password new": ["password new wrong. doesnt macth"]}, status=status.HTTP_400_BAD_REQUEST)
            

class DetailUserFollowerApiView(ListAPIView):
    serializer_class = FollowersSerializer
    permission_classes=[IsAuthenticated]
    
    def get_queryset(self):
        
        qs = UserFollowing.objects.filter(following_user__user__id=self.request.user.id)
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

class UserUnfollowApiView(DestroyAPIView):
    queryset = UserFollowing.objects.all()
    serializer_class = UserProfilApiView
    permission_classes=[IsAuthenticated,]

    
class UserEditProfil(RetrieveUpdateAPIView):
    queryset= UserProfil.objects.all()
    serializer_class = UserEditProfil
    permission_classes=[IsOwnerOrReadOnly]

