from django.urls import path

from .views import PostApiViews,PostDetailApiView,CreatePostAPiView


urlpatterns = [
    path("", PostApiViews.as_view(), name="index"),
    path("detail/<int:pk>/", PostDetailApiView.as_view(), name="detail"),
    path("create/", CreatePostAPiView.as_view(), name="create"),
]
