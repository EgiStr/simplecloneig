from usercostumer.models import UserProfil,UserFollowing
from rest_framework.generics import CreateAPIView, DestroyAPIView,RetrieveAPIView,RetrieveUpdateAPIView,ListAPIView
from rest_framework.permissions import IsAuthenticated,AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.filters import  SearchFilter,OrderingFilter

from .serializers import registeruser,UserProfilSerialzer,FollowingOrWerSerializer,UserEditProfil,UserProfilPostserializer

from posts.api.permission import IsOwnerOrReadOnly
from posts.api.pagination import LimitPaginationSearch
from django.contrib.auth.models import User

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

