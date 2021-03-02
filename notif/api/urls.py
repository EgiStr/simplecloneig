from django.urls import path

from notif.api.views import UserNotifikasiApiView



urlpatterns = [
    path('user/',UserNotifikasiApiView.as_view(),name="user-notif"),
]
