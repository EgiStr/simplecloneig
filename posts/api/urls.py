from django.urls import path

from .views import (PostApiViews,
                    PostDetailApiView,
                    CreatePostAPiView,
                    PostEditApiView,
                    LikePost,
                    GetPostLike,
                    GetPostSaveApiView,)


urlpatterns = [
    path("", PostApiViews.as_view(), name="index"),
    path("<int:pk>/detail/", PostDetailApiView.as_view(), name="detail"),
    path('<int:pk>/edit/',PostEditApiView.as_view(),name='edit'),
    path("like/", LikePost.as_view(), name="like"),
    path("create/", CreatePostAPiView.as_view(), name="create"),
    path("post/like/", GetPostLike.as_view(), name="getPost"),
    path("post/save/", GetPostSaveApiView.as_view(), name="savePost"),

]
