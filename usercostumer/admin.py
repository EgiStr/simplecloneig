from django.contrib import admin

# Register your models here.


from .models import UserFollowing,UserProfil

admin.site.register(UserFollowing)
admin.site.register(UserProfil)