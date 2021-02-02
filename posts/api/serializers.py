


from django.db.models import fields
from rest_framework.serializers import ModelSerializer,HyperlinkedIdentityField,SerializerMethodField
from rest_framework import serializers


from posts.models import Post

from usercostumer.api.serializers import UserProfilPostserializer

from usercostumer.models import UserProfil


class PostSerializer(ModelSerializer):

    detail = HyperlinkedIdentityField(
        view_name='api-post:detail',
        lookup_field='pk' ,  
    )
    user = SerializerMethodField()
    likes = SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            'detail',
            'id',
            'user',
            'caption',
            'post',
            'likes',
            'create_at',
        ]
        
    def get_user(self,obj):
        user = obj.user
        return UserProfilPostserializer(user,context={'request':None}).data
    
    def get_likes(self,obj):
        return obj.likes.count()


class PostDetailSerialzer(ModelSerializer):
    user = SerializerMethodField()
    likes_count = SerializerMethodField()
    class Meta:
        model = Post
        fields = '__all__'

    def get_user(self,obj):
        return UserProfilPostserializer(obj.user,context={'request':None}).data
    
    def get_likes_count(self,obj):
        return obj.likes.count()


class CreatePostSerializer(ModelSerializer):
    user = serializers.ModelField

    # user = SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            'user',
            'post',
            'caption'
        ]

    def create(self, validated_data):
        post = Post.objects.create(
            user=validated_data['user'],
            caption=validated_data['caption'],
            post=validated_data['post'],
        )
        return post

class EditPostSerializer(ModelSerializer):
    class Meta:
        model= Post
        fields = [
            'caption',
            'private'
        ]

class JustLikeSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields =['likes']

    def update(self, instance, validated_data):

        post = instance
    
        like =[t.id for t in validated_data['likes']][0]

        like = UserProfil.objects.get(id=like)
       
        if post.likes.filter(id=like.id).exists(): #already liked the Post
            post.likes.remove(like) #remove user from likes 

        else:
             post.likes.add(like) 

        post.save()

        return post


