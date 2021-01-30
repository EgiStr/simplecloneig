from usercostumer.models import UserProfil,UserFollowing
from django.db import models

# from usercostumer.models import UserProfil
# Create your models here.


class PostManage(models.Manager):
    def get_post_homepage(self,nickname):
       
        users = [nickname,]
        users +=  [UserProfil.objects.get(id=i) for i in  UserFollowing.objects.filter(user = nickname).values_list('following_user',flat=True)] 
        qs = super(PostManage,self).filter(user__in=users)
    
        return qs

class Post(models.Model):
    
    user = models.ForeignKey(UserProfil,related_name='author', on_delete=models.CASCADE)
    post = models.ImageField(upload_to='image/post', height_field='height_field', width_field='width_field')
    caption = models.TextField(blank=True, null=True)
    likes =models.ManyToManyField(UserProfil,blank=True,related_name='likes')
    width_field = models.PositiveIntegerField(default=0)
    height_field = models.PositiveIntegerField(default=0)
    create_at = models.DateTimeField(auto_now=True, auto_now_add=False)

    objects = PostManage()
    @property
    def get_total_like(self):
        return self.likes.count()

    def __str__(self):
        return 'post of {}. caption:{}'.format(self.user,self.caption)
     
    
