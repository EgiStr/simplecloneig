from rest_framework.pagination import LimitOffsetPagination


class LimitPagination(LimitOffsetPagination):
    max_limit = 100