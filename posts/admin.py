from django.contrib import admin

# Register your models here.
from .models import Post,Like,SavePostUser

admin.site.register(Post)
admin.site.register(Like)
admin.site.register(SavePostUser)