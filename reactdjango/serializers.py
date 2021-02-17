from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from usercostumer.models import UserFollowing,UserProfil

# def to_json_user(query):
#     return [{'id':query.id,'username':query.nickname} ]

# def to_json(query):
#     return [{'id':t.id} for t in query]

class Tokenserializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(Tokenserializer,cls).get_token(user)
        # profil= UserProfil.objects.filter(user=user)[0]
        # token['follower'] = [to_json(UserFollowing.objects.filter(following_user=profil))]
        # token['following'] = [to_json(UserFollowing.objects.filter(user=profil))]
        
        token['username'] = user.username
        return token