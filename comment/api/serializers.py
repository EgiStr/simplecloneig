from usercostumer.models import UserProfil
from rest_framework.serializers import ModelSerializer,HyperlinkedIdentityField,SerializerMethodField

from comment.models import Comments


class UserProfilPostserializer(ModelSerializer):
    class Meta:
        model = UserProfil
        fields = [
            'id',
            'nickname',
            'profil',
        ]
class UpdateOrDeleteCommentSerializer(ModelSerializer):
 

    class Meta:
        model = Comments 
        fields =[ 
            'content',
           
        ]

   

class CommentChildrenToSerializer(ModelSerializer):
    
    user = SerializerMethodField()
    updateOrDelete = HyperlinkedIdentityField(
        view_name='comment:edit',)
    
    class Meta:
        model = Comments
        fields= [
            'updateOrDelete',
            'id',
            'user',
            'content_type',
            'obj_id',
            'content',
            'timestamp',
            'parent',
      
            
        ]
    
    def get_user(self,obj):
        return UserProfilPostserializer(obj.user,context={'request':None}).data
    




class CommentChildrenSerializer(ModelSerializer):
    
    user = SerializerMethodField()
    updateOrDelete = HyperlinkedIdentityField(
        view_name='comment:edit',)
    replies = SerializerMethodField()

    class Meta:
        model = Comments
        fields= [
            'updateOrDelete',
            'id',
            'user',
            'content_type',
            'obj_id',
            'content',
            'timestamp',
            'parent',
            'replies',
            
        ]
    
    def get_user(self,obj):
        return UserProfilPostserializer(obj.user,context={'request':None}).data
    
    def get_replies(self,obj):
        return CommentChildrenToSerializer(obj.children(),many=True,context={'request':None}).data

class CommentCreateSerializer(ModelSerializer):
    class Meta:
        model = Comments
        fields = [ 
            'user',
            'content_type',
            'obj_id',
            'content',
            'parent',
        ]
    
    def create(self, validated_data):
        
        user = validated_data['user']
        content_type = validated_data['content_type']
        obj_id = validated_data['obj_id']
        parent_obj = None
        

        try:
            parent_id = validated_data['parent']

        except:
            parent_id = None

        parent_obj = parent_id

        new_comment = Comments.objects.create(
                        user = user,
                        content_type = content_type,
                        obj_id = obj_id,
                        parent = parent_obj,
                        content = validated_data['content'],
                    )
        new_comment.save()
        
        return new_comment