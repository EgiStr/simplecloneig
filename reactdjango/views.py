from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from reactdjango.serializers import Tokenserializer



class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = Tokenserializer


from rest_framework.authentication import SessionAuthentication 

class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening
