from django.db import models
from django.conf import settings
# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='author', on_delete=models.CASCADE)
    post = models.ImageField(upload_to='build/static/media/image/post', height_field='height_field', width_field='width_field')
    caption = models.TextField(blank=True, null=True)
    likes =models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True,related_name='likes')
    width_field = models.PositiveIntegerField(default=0)
    height_field = models.PositiveIntegerField(default=0)
    create_at = models.DateTimeField(auto_now=True, auto_now_add=False)

    @property
    def get_total_like(self):
        return self.likes.count()

    def __str__(self):
        return '{}.{}'.format(self.user.username,self.caption)
     
    
