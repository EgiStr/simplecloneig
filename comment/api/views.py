from rest_framework.generics import RetrieveUpdateDestroyAPIView,CreateAPIView
from rest_framework.permissions import IsAuthenticated

from posts.api.permission import IsOwnerOrReadOnly
from comment.models import Comments

from .serializers import UpdateOrDeleteCommentSerializer,CommentCreateSerializer


class CommentApiView(RetrieveUpdateDestroyAPIView):
    queryset = Comments
    serializer_class = UpdateOrDeleteCommentSerializer
    permission_classes = [IsOwnerOrReadOnly,]

class CreateCommentApiView(CreateAPIView):
    queryset = Comments
    serializer_class = CommentCreateSerializer
    