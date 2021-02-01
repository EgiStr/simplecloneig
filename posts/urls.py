from django.urls import path

from .views import index,index2

urlpatterns = [
    path("", index, name="index"),
    path('create',index2,name='testing')
]
