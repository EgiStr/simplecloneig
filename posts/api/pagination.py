from rest_framework.pagination import LimitOffsetPagination,PageNumberPagination


class LimitPagination(PageNumberPagination):
    page_size = 15

class LimitPaginationSearch(LimitOffsetPagination):
    default_limit = 20