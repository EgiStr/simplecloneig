"""reactdjango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
  https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
  1. Add an import:  from my_app import views
  2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
  1. Add an import:  from other_app.views import Home
  2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
  1. Import the include() function: from django.urls import include, path
  2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns =[
  path('admin/',admin.site.urls),
  path("", include(('posts.urls', 'posts'), namespace='post')),
  path("api/", include(('posts.api.urls','posts.api'),namespace='api-post')),
  path("auth/", include(('usercostumer.api.urls','usercostumer.api'),namespace='auth')),
  path("auth/", include(('rest_framework_social_oauth2.urls','rest_framework_social_oauth2'),namespace="oauth2")),
  path('auth/', include('social_django.urls', namespace="social")),
  path("comment/", include(('comment.api.urls', 'comment.api'),namespace='comment')),
  path("notif/", include(('notif.api.urls', 'notif.api'),namespace='notif')),

]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) 
