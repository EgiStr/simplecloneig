
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.mixins import DestroyModelMixin,CreateModelMixin
from rest_framework.generics import ListAPIView,RetrieveAPIView,RetrieveUpdateDestroyAPIView,CreateAPIView,RetrieveUpdateAPIView
from usercostumer.models import UserProfil

from rest_framework.permissions import IsAuthenticated
from posts.api.permission import IsOwnerOrReadOnly
from posts.models import Post,Like
from posts.api.serializers import (
                                    PostSerializer,
                                    PostDetailSerialzer,
                                    CreatePostSerializer,
                                    EditPostSerializer,
                                    JustLikeSerializer,
                                    )
class PostApiViews(ListAPIView):

    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        nickname = UserProfil.objects.get(user=self.request.user)
        qs = Post.objects.get_post_homepage(nickname)
        # Post.objects.get_post_homepage(self.request.user.UserProfil)
        return qs

class PostDetailApiView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerialzer

class LikePost(CreateAPIView,DestroyModelMixin):
    queryset = Post.objects.all()
    serializer_class = JustLikeSerializer
    # def perform_create(self, serializer):
    #     data = serializer.data
        
    #     try:
    #         queryset = Like.objects.create(
    #         user = data['user'],
    #         post=data['post']
    #             )
    #     except: 
    #         serializers.ValidationError({'error':'anda sudah like post'})
    #     serializer.save(queryset)
    """ lier gan belom lagi follower"""
        # if queryset.exists():
        # raise ValidationError('You have already signed up')
        # serializer.save(user=self.request.user)

    # def perform_destroy(self, instance):
    #     print(instance)
    #     pass


class CreatePostAPiView(CreateAPIView):
    
    serializer_class = CreatePostSerializer
    
    def get_queryset(self):
        queryset = Post.objects.all()
        return queryset

class PostEditApiView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = EditPostSerializer
    permission_classes = [IsOwnerOrReadOnly,]

