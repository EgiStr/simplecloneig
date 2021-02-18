from django.urls import path

from .views import CommentApiView,CreateCommentApiView,GetCommentByPostApiView,GetRepliesByPostApiView

urlpatterns = [
    path("edit/<int:pk>/", CommentApiView.as_view(), name="edit"),
    path("create/", CreateCommentApiView.as_view(), name="create"),
    path('detail/<int:post_id>/',GetCommentByPostApiView.as_view(),name="detail"),
    path('detail/<int:parent_id>/replies/',GetRepliesByPostApiView.as_view(),name="replies"),
]