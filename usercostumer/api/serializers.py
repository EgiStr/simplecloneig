
from django.db.models.base import Model
from django.db.models.deletion import SET_NULL

from rest_framework.serializers import ModelSerializer,SerializerMethodField,HyperlinkedIdentityField
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

from comment.api.serializers import CommentChildrenSerializer
from usercostumer.models import UserProfil,UserFollowing
from comment.models import Comments
from posts.models import Post

class PostProfilSerializer(ModelSerializer):
    content_type_id = SerializerMethodField()
    user = SerializerMethodField()
    likes = SerializerMethodField()
    comments =SerializerMethodField()
    class Meta:
        model = Post
        fields = [
            'id',
            'content_type_id',
            'user',
            'caption',
            'post',
            'likes',
            'create_at',
            'comments',
        ]
        
    def get_user(self,obj):
        return UserProfilPostserializer(obj.user,context={'request':None}).data
    
    def get_likes(self,obj):
        return obj.liked_post.count()

    def get_content_type_id(self,obj):
        content_type = obj.get_content_type
        """ for make replies comment """
        return content_type.id

    def get_comments(self,obj):
        comments_qs = Comments.objects.fillter_by_instance(obj)
        return CommentChildrenSerializer(comments_qs,many=True,context ={'request':None}).data




class FollowingSerializer(ModelSerializer):
    unfollow = HyperlinkedIdentityField(
        view_name='auth:unfollow',
    )
    user = SerializerMethodField()
    class Meta:
        model = UserFollowing
        fields = ("unfollow","id", "user", "created")
    
    def get_user(self,obj):
        return obj.user.nickname

class FollowersSerializer(ModelSerializer):
    following_user = SerializerMethodField()
    class Meta:
        model = UserFollowing
        fields = ("id", "following_user", "created")
    
    def get_following_user(self,obj):
        return obj.following_user.nickname


class UserEditProfil(ModelSerializer):
    class Meta:
        model = UserProfil
        fields =[
            'bio',
            'gender',
            'profil',
            'nomorHp',
            'email',
            'nickname',
        ]
        

class UserProfilPostserializer(ModelSerializer):
    class Meta:
        model = UserProfil
        fields = [
            'id',
            'nickname',
            'profil',
        ]

class UserProfilSerialzer(ModelSerializer):
    following = SerializerMethodField()
    follower = SerializerMethodField()
    user = SerializerMethodField()
    post_count = SerializerMethodField()
    post_data = SerializerMethodField()
    class Meta:
        model = UserProfil
        fields = [
            'user',
            'id',
            'follower',
            'following',
            'nickname',
            'profil',
            'bio',
            'email',
            'nomorHp',
            'gender',
            'post_count',
            'post_data',
        ]

    def get_user(self,obj):
        return obj.user.username
    def get_post_count(self,obj):
        return obj.get_count_posts
    
    def get_post_data(self,obj):
        post = obj.author.all()
        post = PostProfilSerializer(post,many=True,context={'request':None}).data
        return post

    def get_follower(self,obj):
        return FollowersSerializer(obj.follower.all(),many=True).data

    def get_following(self,obj):
        return FollowingSerializer(obj.following.all(),many=True,context={'request':None}).data

class FollowingOrWerSerializer(ModelSerializer):
    class Meta:
        model = UserFollowing
        fields = [
            'id',
            'user',
            'following_user'
        ]

    def validate(self, attrs):
        if attrs['user'] == attrs['following_user']:
            raise serializers.ValidationError({'following':'you not allow to follow you self'})
        return attrs
    
    def create(self, validated_data):

        # build in funcation get_or_create make 2 return it self and created(True/False)

        Connent,created =  UserFollowing.objects.get_or_create(
            user=validated_data['user'],
            following_user = validated_data['following_user'],
            )
            
        if created:
            # if create database it return query and skip delete 
            return Connent
            # else it get query it delete qeury
        Connent.delete()

        return validated_data
       
        # connect = UserFollowing.objects.create(
        #     user = validated_data['user'],
        #     following_user = validated_data['following_user']
        # )
        # return connect

class registeruser(ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[
                UniqueValidator(queryset=User.objects.all())
                ]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email','username', 'password', 'password2' )

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        
        try:
            email_valid = validated_data['email']

        except:
            email_valid = SET_NULL
        
        user = User.objects.create(
            username=validated_data['username'],
            email=email_valid,
        )

        user.set_password(validated_data['password'])
        
        user.save()

        return user

