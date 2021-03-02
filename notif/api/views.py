from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import NotifSerializer
# from posts.api.permission import IsOwnerOrReadOnly

from notif.models import Notifikasi

class UserNotifikasiApiView(ListAPIView):
    serializer_class = NotifSerializer
    permission_classes= [IsAuthenticated]
    
    def get_queryset(self):
        print(self.request.user.id)
        print(Notifikasi.objects.filter(receiver__user__id = self.request.user.id))
        qs = Notifikasi.objects.filter(receiver__user__id = self.request.user.id)[:20]
        return qs