from usercostumer.models import UserProfil,UserFollowing
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
# from usercostumer.models import UserProfil
# Create your models here.


class PostManage(models.Manager):
    def get_post_homepage(self,nickname):
       
        users = [nickname,]
        users +=  [UserProfil.objects.get(id=i) for i in  UserFollowing.objects.filter(user = nickname).values_list('following_user',flat=True)] 
        qs = super(PostManage,self).filter(user__in=users)
    
        return qs

class Post(models.Model):
    
    user = models.ForeignKey(UserProfil,related_name='author', on_delete=models.CASCADE,blank=True, null=True)
    post = models.ImageField(upload_to='media/image/post', height_field='height_field', width_field='width_field')
    caption = models.TextField(blank=True, null=True)
    likes =models.ManyToManyField(UserProfil,blank=True,related_name='likes')
    width_field = models.PositiveIntegerField(default=0)
    height_field = models.PositiveIntegerField(default=0)
    create_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    """ tag people ??? location ???? """
    """ feature ??? """
    objects = PostManage()
    @property
    def get_total_like(self):
        return self.likes.count()

    def __str__(self):
        return 'post of {}. caption:{}'.format(self.user,self.caption)
     
    
@receiver(post_save,sender=Post)
def post_save_user(instance,created,*args, **kwargs):
    print(args,kwargs)