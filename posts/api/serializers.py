
from rest_framework.serializers import ModelSerializer,HyperlinkedIdentityField,SerializerMethodField
from rest_framework import serializers


from posts.models import Post

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
        return obj.likes.count()

    def get_comments(self,obj):
        comments_qs = Comments.objects.fillter_by_instance(obj)
        return CommentChildrenSerializer(comments_qs,many=True,context ={'request':None}).data
    
    def get_content_type_id(self,obj):
        content_type = obj.get_content_type
        print(content_type._state)
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


