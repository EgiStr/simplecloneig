from django.urls import path


from rest_framework_simplejwt.views import TokenRefreshView

from reactdjango.views import MyObtainTokenPairView

from .views import RegisterUserApi,UserProfilApiView

urlpatterns = [
    path("login/", MyObtainTokenPairView.as_view(), name="login"),
    path('login/refresh/',TokenRefreshView.as_view(),name='refresh'),
    path("register/", RegisterUserApi.as_view(), name="register"),
    path("profil/<int:pk>/", UserProfilApiView.as_view(), name="profil"),
]
