from rest_framework import fields
from rest_framework.serializers import ModelSerializer

from posts.models import Post

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'id',
            'user',
            'caption',
            'post',
            'likes',
            'create_at',
        ]
    

class PostDetailSerialzer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields =('id','user','post','create_at','width_field','height_field')

