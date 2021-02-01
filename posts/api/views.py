
from rest_framework.mixins import DestroyModelMixin,UpdateModelMixin
from rest_framework.generics import ListAPIView,DestroyAPIView,RetrieveAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView
from usercostumer.models import UserProfil,UserFollowing

from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly

from posts.models import Post
from posts.api.serializers import (
                                    PostSerializer,
                                    PostDetailSerialzer,
                                    CreatePostSerializer,
                                    )
class PostApiViews(ListAPIView):

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        print(self.request.user)
        print(self.request)
        nickname = UserProfil.objects.get(user=self.request.user)
      
        qs = Post.objects.get_post_homepage(nickname)
        # Post.objects.get_post_homepage(self.request.user.UserProfil)
        return qs

class PostDetailApiView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerialzer



class CreatePostAPiView(CreateAPIView):
    
    serializer_class = CreatePostSerializer
    
    def get_queryset(self):
        queryset = Post.objects.all()
        print(self.request.user)
        return queryset
class PostEditApiView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()

