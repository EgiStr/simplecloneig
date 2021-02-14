from rest_framework.pagination import LimitOffsetPagination,PageNumberPagination


class LimitPagination(PageNumberPagination):
    page_size = 4

class LimitPaginationSearch(LimitOffsetPagination):
    default_limit = 20