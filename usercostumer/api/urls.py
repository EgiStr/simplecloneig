from django.urls import path


from rest_framework_simplejwt.views import TokenRefreshView

from reactdjango.views import MyObtainTokenPairView

from .views import RegisterUserApi

urlpatterns = [
    path("", MyObtainTokenPairView.as_view(), name="login"),
    path('refresh/',TokenRefreshView.as_view(),name='refresh'),
    path("register/", RegisterUserApi.as_view(), name="register"),
]
