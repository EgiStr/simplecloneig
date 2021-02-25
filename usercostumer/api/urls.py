from django.urls import path


from rest_framework_simplejwt.views import TokenRefreshView

from reactdjango.views import MyObtainTokenPairView


from .views import (RegisterUserApi,
                    UserProfilApiView,
                    UserFollowingApiView,
                    UserUnfollowApiView,
                    UserEditProfil,
                    UserSearchApiView,
                    ChangePasswordApiView,
                    DetailUserFollowingApiView,
                    DetailUserFollowerApiView,
                    DetailUserFollowingUserApiView,
                    DetailUserFollowerUserApiView)

urlpatterns = [
    path("login/", MyObtainTokenPairView.as_view(), name="login"),
    path('login/refresh/',TokenRefreshView.as_view(),name='refresh'),
    path("register/", RegisterUserApi.as_view(), name="register"),
    path("search/",UserSearchApiView.as_view(),name="filter"),
    path("profil/<str:nickname>/", UserProfilApiView.as_view(), name="profil"),
    path("following/", UserFollowingApiView.as_view(), name="following"),
    path("following/detail/", DetailUserFollowingApiView.as_view(), name="following-detail"),
    path("following/detail/<int:id>/", DetailUserFollowingUserApiView.as_view(), name="following-detail-user"),
    path("follower/detail/<int:id>/", DetailUserFollowerUserApiView.as_view(), name="follower-detail-user"),
    path("follower/detail/", DetailUserFollowerApiView.as_view(), name="follower-detail"),
    path('unfollow/<int:pk>/',UserUnfollowApiView.as_view(),name='unfollow'),
    path("profil/<int:pk>/edit/", UserEditProfil.as_view(), name="editProfil"),
    path("password/change/", ChangePasswordApiView.as_view(),name="passwordChange"),
    # path("password/change/success/", PasswordChangeView.as_view()),

    

]
