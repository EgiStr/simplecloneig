from rest_framework.mixins import DestroyModelMixin
from rest_framework.generics import DestroyAPIView, ListAPIView,RetrieveAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView,RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from posts.models import Post,Like

from usercostumer.models import UserProfil
from .pagination import LimitPagination


from posts.api.serializers import (
                                    PostSerializer,
                                    PostDetailSerialzer,
                                    CreatePostSerializer,
                                    EditPostSerializer,
                                    JustLikeSerializer,
                                    UserLikePost,
                                    )
class PostApiViews(ListAPIView):

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = LimitPagination
    
    def get_queryset(self):
        nickname = UserProfil.objects.get(user=self.request.user)
        qs = Post.objects.get_post_homepage(nickname)
        # Post.objects.get_post_homepage(self.request.user.UserProfil)
        return qs

class PostDetailApiView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerialzer

class LikePost(CreateAPIView,DestroyModelMixin):
    queryset = Like.objects.all()
    serializer_class = JustLikeSerializer
 
class DeleteLike(DestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = JustLikeSerializer

class CreatePostAPiView(CreateAPIView):
    
    serializer_class = CreatePostSerializer
    
    def get_queryset(self):
        queryset = Post.objects.all()
        return queryset

class PostEditApiView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = EditPostSerializer


class GetPostLike(ListAPIView):
    serializer_class = UserLikePost

    def get_queryset(self):
        print(Like.objects.filter(user__user__id=1))
        qs =Like.objects.filter(user__user__id=self.request.user.id)
        return qs
    
    

