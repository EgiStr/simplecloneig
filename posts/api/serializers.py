
from rest_framework.serializers import ModelSerializer,HyperlinkedIdentityField,SerializerMethodField
from rest_framework import serializers
from posts.models import Post

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
        return obj.user.nickname
    
    def get_likes(self,obj):
        return obj.likes.count()


class PostDetailSerialzer(ModelSerializer):
    user = SerializerMethodField()
    likes_count = SerializerMethodField()
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields =('id','user','post','create_at','width_field','height_field','likes_count','caption','private')
        
    def get_user(self,obj):
        return obj.user.nickname
    
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
        read_only_fields = ['id']

    def create(self, validated_data):
        post = Post.objects.create(
            user=validated_data['user'],
            caption=validated_data['caption'],
            post=validated_data['post'],
        )
        return post


    # def get_user(self,obj):
    #     return obj.user

    # def get_likes(self,obj):
    #     return obj.likes