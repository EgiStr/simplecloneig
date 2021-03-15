from django.urls import path

from notif.api.views import UserNotifikasiApiView,UpdateNotifikasiApiView



urlpatterns = [
    path('user/',UserNotifikasiApiView.as_view(),name="user-notif"),
    path('update/',UpdateNotifikasiApiView.as_view(),name="user-update-notif"),
]
