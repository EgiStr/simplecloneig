from django.urls import path


from rest_framework_simplejwt.views import TokenRefreshView

from reactdjango.views import MyObtainTokenPairView


from .views import (RegisterUserApi,
                    UserProfilApiView,
                    UserFollowingApiView,
                    UserEditProfil,
                    UserSearchApiView,
                    ChangePasswordApiView,
                    DetailUserFollowingApiView,
                    DetailUserFollowerApiView,
                    DetailUserFollowingUserApiView,
                    DetailUserFollowerUserApiView)

urlpatterns = [
    # login
    path("login/", MyObtainTokenPairView.as_view(), name="login"),
    path('login/refresh/',TokenRefreshView.as_view(),name='refresh'),
    path("register/", RegisterUserApi.as_view(), name="register"),
    # search
    path("search/",UserSearchApiView.as_view(),name="filter"),
    # detail
    path("profil/<str:nickname>/", UserProfilApiView.as_view(), name="profil"),
    path("profil/<int:pk>/edit/", UserEditProfil.as_view(), name="editProfil"),
    # create follow
    path("following/", UserFollowingApiView.as_view(), name="follow"),
    # data detail si user
    path("following/detail/", DetailUserFollowingApiView.as_view(), name="following-detail"),
    path("follower/detail/", DetailUserFollowerApiView.as_view(), name="follower-detail"),
    # data detail yang user lain
    path("following/detail/<int:id>/", DetailUserFollowingUserApiView.as_view(), name="following-detail-user"),
    path("follower/detail/<int:id>/", DetailUserFollowerUserApiView.as_view(), name="follower-detail-user"),
    # password change
    path("password/change/", ChangePasswordApiView.as_view(),name="passwordChange"),

]
