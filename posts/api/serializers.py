
from rest_framework.serializers import ModelSerializer,SerializerMethodField
from rest_framework import fields, serializers
from posts.models import Post,Like

from usercostumer.api.serializers import UserProfilPostserializer


from comment.api.serializers import CommentChildrenSerializer
from comment.models import Comments

class PostSerializer(ModelSerializer):
    
    user = SerializerMethodField()
    likes = SerializerMethodField()
    
    comments = SerializerMethodField()
    content_type_id = SerializerMethodField()
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

class UserLikePost(ModelSerializer):
    post = SerializerMethodField()
    class Meta:
        model = Like
        fields = [
            'id',
            'post'
        ]
    def get_post(self,obj):
        return obj.post.id

# class Base64ImageField(serializers.ImageField):
#     """
#     A Django REST framework field for handling image-uploads through raw post data.
#     It uses base64 for encoding and decoding the contents of the file.

#     Heavily based on
#     https://github.com/tomchristie/django-rest-framework/pull/1268

#     Updated for Django REST framework 3.
#     """

#     def to_internal_value(self, data):
#         from django.core.files.base import ContentFile
#         import base64
#         import six
#         import uuid

#         # Check if this is a base64 string
#         if isinstance(data, six.string_types):
#             # Check if the base64 string is in the "data:" format
#             if 'data:' in data and ';base64,' in data:
#                 # Break out the header from the base64 content
#                 header, data = data.split(';base64,')

#             # Try to decode the file. Return validation error if it fails.
#             try:
#                 decoded_file = base64.b64decode(data)
#             except TypeError:
#                 self.fail('invalid_image')

#             # Generate file name:
#             file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
#             # Get the file name extension:
#             file_extension = self.get_file_extension(file_name, decoded_file)

#             complete_file_name = "%s.%s" % (file_name, file_extension, )

#             data = ContentFile(decoded_file, name=complete_file_name)

#         return super(Base64ImageField, self).to_internal_value(data)

#     def get_file_extension(self, file_name, decoded_file):
#         import imghdr

#         extension = imghdr.what(file_name, decoded_file)
#         extension = "jpg" if extension == "jpeg" else extension

#         return extension



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

    # def update(self, instance, validated_data):

    #     print(validated_data)

    #     return instance


