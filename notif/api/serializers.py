from posts.api.serializers import PostNotifSerializer
from usercostumer.api.serializers import UserProfilPostserializer
from rest_framework.serializers import ModelSerializer,SerializerMethodField
from notif.models import Notifikasi

class NotifSerializer(ModelSerializer):
    post = SerializerMethodField()
    sender = SerializerMethodField()
    receiver = SerializerMethodField()
    create_at = SerializerMethodField()
    
    class Meta:
        model =  Notifikasi
        fields = [
            'post',
            'sender',
            'receiver',
            'create_at',
            'type_notif',
            'more_text',
            'is_seen'
        ]

    def get_create_at(self,obj):
        return obj.get_create_time
    
    def get_sender(self,obj):
        return UserProfilPostserializer(obj.sender).data
    
    def get_receiver(self,obj):
        return UserProfilPostserializer(obj.receiver).data
    
    def get_post(self,obj):
        try:
            obj.post
        except:
            return None
        return PostNotifSerializer(obj.post).data