from rest_framework.generics import ( 
                                        ListAPIView,
                                        RetrieveAPIView,
                                        RetrieveUpdateDestroyAPIView,
                                        CreateAPIView,)

from rest_framework.permissions import AllowAny, IsAuthenticated

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
    serializer_class = PostDetailSerialzer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = Post.objects.get(id = self.kwargs['pk'])
        return qs
class LikePost(CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = JustLikeSerializer
 
class SavePost(CreateAPIView):
    queryset = SavePostUser.objects.all()
    serializer_class = SavePostSerializer

 
class CreatePostAPiView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = CreatePostSerializer


class PostEditApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = EditPostSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        qs = Post.objects.filter(id=self.kwargs['id'])
        return qs
# user like and post

class GetPostLike(ListAPIView):
    serializer_class = UserLikePost
    def get_queryset(self):
        print(self.request.user.id)
        qs = Like.objects.filter(user__user__id=self.request.user.id)
        print(qs)
        return qs
        
class GetPostSaveApiView(ListAPIView):
    serializer_class= UserSavePost
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        qs = SavePostUser.objects.filter(user__user__id=self.request.user.id)
        return qs

# data post dari save user 
class GetSavePostData(ListAPIView):
    serializer_class = PostSerializer
    
    def get_queryset(self):
        query = SavePostUser.objects.filter(user__user__id=self.request.user.id)
        qs = [qs.post for qs in query]
    
        return qs
class GetLikePostData(ListAPIView):
    serializer_class = PostSerializer
    
    def get_queryset(self):
        query = Like.objects.filter(user__user__id=self.request.user.id)
        qs = [qs.post for qs in query]
    
        return qs

