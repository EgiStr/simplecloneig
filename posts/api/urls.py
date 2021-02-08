from django.urls import path

from .views import PostApiViews,PostDetailApiView,CreatePostAPiView,PostEditApiView,LikePost,DeleteLike


urlpatterns = [
    path("", PostApiViews.as_view(), name="index"),
    path("detail/<int:pk>/", PostDetailApiView.as_view(), name="detail"),
    path('edit/<int:pk>/',PostEditApiView.as_view(),name='edit'),
    path("like/", LikePost.as_view(), name="like"),
    path("like/<int:pk>/", DeleteLike.as_view(), name="like-delete"),
    path("create/", CreatePostAPiView.as_view(), name="create"),
]
