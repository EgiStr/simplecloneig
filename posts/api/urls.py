from django.urls import path

from .views import (PostApiViews,
                    PostDetailApiView,
                    CreatePostAPiView,
                    PostEditApiView,
                    LikePost,
                    SavePost,
                    GetPostLike,
                    GetPostLikeApiView,
                    GetSavePost,
                    GetPostSaveApiView,)


urlpatterns = [
    path("", PostApiViews.as_view(), name="index"),
    path("<int:pk>/detail/", PostDetailApiView.as_view(), name="detail"),
    path('<int:pk>/edit/',PostEditApiView.as_view(),name='edit'),
    path("create/", CreatePostAPiView.as_view(), name="create"),
    # buat save or like
    path("like/", LikePost.as_view(), name="like"),
    path("save/", SavePost.as_view(), name="save_post"),

    # postSave or like data post 
    path("save/post/", GetSavePost.as_view(), name="Post-save_post"),
    path("like/post/", GetPostLike.as_view(), name="post_like_post"),
    # ngambil history user
    path("post/like/", GetPostLikeApiView.as_view(), name="getPost"),
    path("post/save/", GetPostSaveApiView.as_view(), name="savePost"),

]
