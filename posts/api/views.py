from django.db.models import query
from rest_framework.mixins import DestroyModelMixin

from rest_framework.generics import ( 
                                        ListAPIView,
                                        RetrieveAPIView,
                                        RetrieveUpdateDestroyAPIView,
                                        CreateAPIView,)

from rest_framework.permissions import IsAuthenticated

from posts.models import Post,Like,SavePostUser
from usercostumer.models import UserProfil

from .pagination import LimitPagination
from .permission import IsOwnerOrReadOnly

from posts.api.serializers import (
                                    PostSerializer,
                                    PostDetailSerialzer,
                                    CreatePostSerializer,
                                    EditPostSerializer,
                                    JustLikeSerializer,
                                    UserLikePost,
                                    SavePostSerializer,
                                    UserSavePost,
                                    )
class PostApiViews(ListAPIView):

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = LimitPagination
    
    def get_queryset(self):
        nickname = UserProfil.objects.get(user=self.request.user)
        qs = Post.objects.get_post_homepage(nickname)
        return qs

# proses
class PostDetailApiView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerialzer

class LikePost(CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = JustLikeSerializer
 
class SavePost(CreateAPIView):
    queryset = SavePostUser.objects.all()
    serializer_class = SavePostSerializer

 
class CreatePostAPiView(CreateAPIView):
    serializer_class = CreatePostSerializer
    
    def get_queryset(self):
        queryset = Post.objects.all()
        return queryset


class PostEditApiView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = EditPostSerializer

# user like and post

class GetPostLike(ListAPIView):
    serializer_class = UserLikePost

    def get_queryset(self):
        qs = SavePostUser.objects.filter(user__user__id=self.request.user.id)
        return qs
        
class GetPostSaveApiView(ListAPIView):
    serializer_class= UserSavePost
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        qs = SavePostUser.objects.filter(user__user__id=self.request.user.id)
        return qs

# data post dari save user 
class GetSavePostData(ListAPIView):
    queryset = SavePostUser.objects.all()
    serializer_class = PostSerializer
    
    def get_queryset(self):
        query = SavePostUser.objects.filter(user__user__id=self.request.user.id)
        qs = [qs.post for qs in query]
    
        return qs
class GetLikePostData(ListAPIView):
    queryset = SavePostUser.objects.all()
    serializer_class = PostSerializer
    
    def get_queryset(self):
        query = SavePostUser.objects.filter(user__user__id=self.request.user.id)
        qs = [qs.post for qs in query]
    
        return qs

