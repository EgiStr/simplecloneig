from rest_framework.generics import (RetrieveUpdateDestroyAPIView,
                                        CreateAPIView,
                                        ListAPIView
                                        )

from rest_framework.permissions import AllowAny
from posts.api.permission import IsOwnerOrReadOnly
from comment.models import Comments

from .serializers import (UpdateOrDeleteCommentSerializer,
                            CommentCreateSerializer,
                            CommentChildrenSerializer
                        )


class GetCommentByPostApiView(ListAPIView):
    serializer_class = CommentChildrenSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
       
        qs = Comments.objects.filter(obj_id=self.kwargs['post_id']).filter(parent__isnull=True)
        return qs

class GetRepliesByPostApiView(ListAPIView):
    serializer_class = CommentChildrenSerializer
    permission_classes= [AllowAny]
    def get_queryset(self):
        qs = Comments.objects.filter(parent=self.kwargs['parent_id'])
        return qs

class CommentApiView(RetrieveUpdateDestroyAPIView):
    queryset = Comments.objects.all()
    serializer_class = UpdateOrDeleteCommentSerializer
    permission_classes = [IsOwnerOrReadOnly,]

class CreateCommentApiView(CreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentCreateSerializer
    