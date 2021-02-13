from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class Tokenserializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(Tokenserializer,cls).get_token(user)
        token['username']= user.username
        print(user)
        # token['follower'] = user.following_user
        # token['following'] = user.user
        return token