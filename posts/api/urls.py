from django.urls import path

from .views import PostApiViews

urlpatterns = [
    path("/", PostApiViews.as_view(), name="index"),
]
