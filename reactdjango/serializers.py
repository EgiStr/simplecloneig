from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from usercostumer.models import UserFollowing,UserProfil

def to_json_user(query):
    return [{'id':query.id,'username':query.nickname} ]

def to_json(query):
    return [{'id':t.id} for t in query]

class Tokenserializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(Tokenserializer,cls).get_token(user)
        token['username'] = user.username
        return token