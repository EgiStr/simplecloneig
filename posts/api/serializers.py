
from rest_framework.serializers import ModelSerializer,HyperlinkedIdentityField,SerializerMethodField
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from posts.models import Post,Like

from usercostumer.api.serializers import UserProfilPostserializer
from usercostumer.models import UserProfil

from comment.api.serializers import CommentChildrenSerializer
from comment.models import Comments

class PostSerializer(ModelSerializer):
    

    detail = HyperlinkedIdentityField(
        view_name='api-post:detail',
        lookup_field='pk' ,  
    )

    user = SerializerMethodField()
    likes = SerializerMethodField()
    
    comments = SerializerMethodField()
    content_type_id = SerializerMethodField()
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
            'content_type_id',      
            'comments',
        ]
        
    def get_user(self,obj):
        user = obj.user
        return UserProfilPostserializer(user,context={'request':None}).data
    
    def get_likes(self,obj):
        return obj.liked_post.all().count()

    def get_comments(self,obj):
        comments_qs = Comments.objects.fillter_by_instance(obj)
        return CommentChildrenSerializer(comments_qs,many=True,context ={'request':None}).data
    
    def get_content_type_id(self,obj):
        content_type = obj.get_content_type
        """ for make replies comment """
        return content_type.id
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
        model = Like
        fields =['id','post','user']
    


    def create(self, validated_data):
   
        Connect_like,created =  Like.objects.get_or_create(
            user=validated_data['user'],
            post = validated_data['post'],
            )
        if created:
            return Connect_like
        
        Connect_like.delete()

        return validated_data
       
            # Connect_like = Like.objects.filter(
            #     user=validated_data['user'],
            #     post = validated_data['post'],
            # )
            # Connect_like.delete()
            # return Response(status=status.HTTP_204_NO_CONTENT)

    
    def validate(self, attrs):
        print(attrs.__dict__)
        return attrs
    # def update(self, instance, validated_data):

    #     print(validated_data)

    #     return instance


