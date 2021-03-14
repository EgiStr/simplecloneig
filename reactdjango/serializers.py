from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from usercostumer.models import UserProfil

def to_json_user(query):
    return query.profil.url 

class Tokenserializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(Tokenserializer,cls).get_token(user)
        profil= UserProfil.objects.filter(user=user)[0]

        token['profil'] = to_json_user(profil)
        # token['following'] = [to_json(UserFollowing.objects.filter(user=profil))]
        
        token['username'] = user.username
        return token