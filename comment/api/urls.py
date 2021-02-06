from django.urls import path

from .views import CommentApiView,CreateCommentApiView

urlpatterns = [
    path("edit/<int:pk>/", CommentApiView.as_view(), name="edit"),
    path("create/", CreateCommentApiView.as_view(), name="create"),
]