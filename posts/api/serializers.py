from rest_framework.serializers import ModelSerializer,SerializerMethodField
from rest_framework import serializers

from comment.models import Comments
from posts.models import Post,Like, SavePostUser

from usercostumer.api.serializers import UserProfilPostserializer
from comment.api.serializers import CommentChildrenSerializer

# for post notif
class PostNotifSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'id',
            'caption',
            'post',
        ]

# for post home

class PostProfilSerializer(ModelSerializer):

  
    class Meta:
        model = Post
        fields = [
            'id',
            'post',
            'create_at',
          
        ]
    
class PostSerializer(ModelSerializer):
    user = SerializerMethodField()
    likes = SerializerMethodField()
    
    comments = SerializerMethodField()
    content_type_id = SerializerMethodField()
    create_at = SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            
            'id',
            'user',
            'caption',
            'post',
            'likes',
            'create_at',
            'content_type_id',      
            'comments',
        ]

    def get_create_at(self,obj):
        return obj.get_time
    
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
        
# for post detail
# masih proses
class PostDetailSerialzer(ModelSerializer):
    user = SerializerMethodField()
    likes = SerializerMethodField()
    
    comments = SerializerMethodField()
    content_type_id = SerializerMethodField()
    create_at = SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            
            'id',
            'user',
            'caption',
            'post',
            'likes',
            'create_at',
            'content_type_id',      
            'comments',
            'private',
        ]

    def get_create_at(self,obj):
        return obj.get_time
    
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
class CreatePostSerializer(ModelSerializer):
    user = serializers.ModelField    
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

# like and save action
class SavePostSerializer(ModelSerializer):
    class Meta:
        model = SavePostUser
        fields = [ 'id' , 'post' , 'user']
    
    def create(self, validated_data):
        conennet_save,created = SavePostUser.objects.get_or_create(
            user = validated_data['user'],
            post = validated_data['post']
        )
       
        if created :
            return conennet_save
        
        conennet_save.delete()    
        return validated_data
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


# get user like and post
class UserLikePost(ModelSerializer):
    post = SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            'id',
            'post'
        ]
    def get_post(self,obj):
        return obj.post.id

class UserSavePost(ModelSerializer):
    post = SerializerMethodField()
    class Meta:
        model = Like
        fields = [
            'id',
            'post'
        ]
    def get_post(self,obj):
        return obj.post.id
