
from rest_framework.mixins import DestroyModelMixin,UpdateModelMixin
from rest_framework.generics import ListAPIView,DestroyAPIView,RetrieveAPIView,RetrieveUpdateDestroyAPIView
from usercostumer.models import UserProfil,UserFollowing

from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly

from posts.models import Post
from posts.api.serializers import (
                                    PostSerializer,
                                    PostDetailSerialzer,
                                    )
class PostApiViews(ListAPIView):

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        nickname = UserProfil.objects.get(user=self.request.user)
      
        qs = Post.objects.get_post_homepage(nickname)
        # Post.objects.get_post_homepage(self.request.user.UserProfil)
        return qs

class PostDetailApiView(RetrieveAPIView,RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerialzer
