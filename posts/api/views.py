
from rest_framework.mixins import DestroyModelMixin,UpdateModelMixin
from rest_framework.generics import ListAPIView,DestroyAPIView,RetrieveAPIView
from usercostumer.models import UserProfil,UserFollowing

from posts.models import Post
from posts.api.serializers import PostSerializer
class PostApiViews(ListAPIView):
    serializer_class = PostSerializer
    
    def get_queryset(self):
        nickname = UserProfil.objects.get(user=self.request.user)
      
        qs = Post.objects.get_post_homepage(nickname)
        # Post.objects.get_post_homepage(self.request.user.UserProfil)
        return qs