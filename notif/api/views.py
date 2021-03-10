
import datetime

from rest_framework.generics import ListAPIView,UpdateAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import NotifSerializer,NotifUpdateSerializer
# from posts.api.permission import IsOwnerOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from notif.models import Notifikasi

class UserNotifikasiApiView(ListAPIView):
    serializer_class = NotifSerializer
    permission_classes= [IsAuthenticated]
    
    def get_queryset(self): 
        
        qs = Notifikasi.objects.filter(receiver__user__id = self.request.user.id,is_seen = False)
        if len(qs) <= 10 :
            queryTambahan = Notifikasi.objects.filter(receiver__user__id = self.request.user.id,is_seen = True,)[:10]
            qs = qs | queryTambahan
        return qs

class UpdateNotifikasiApiView(UpdateAPIView):
    serializer_class = NotifUpdateSerializer
    permissions_classes = [IsAuthenticated]
    model = Notifikasi

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.user = self.get_object()
        if self.user.is_authenticated:
            query = Notifikasi.objects.filter(receiver__user__id = self.user.id,is_seen = False)
            query.update(is_seen =True)
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Notif updated successfully',
             
            }
            return Response(response)

        return Response({"user": ["user not authorized"]}, status=status.HTTP_401_UNAUTHORIZED)
