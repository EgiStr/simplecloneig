from rest_framework.generics import CreateAPIView

from .serializers import registeruser

from django.contrib.auth.models import User

class RegisterUserApi(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = registeruser