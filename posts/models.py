from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
# from usercostumer.models import UserProfil
# Create your models here.
from usercostumer.models import UserProfil,UserFollowing
from PIL import Image


class PostManage(models.Manager):
    def get_post_homepage(self,nickname):
       
        users = [nickname,]
        users +=  [UserProfil.objects.get(id=i) for i in  UserFollowing.objects.filter(following_user = nickname).values_list('user',flat=True)] 
        qs = super(PostManage,self).filter(user__in=users).filter(private=False).order_by('-create_at')
    
        return qs

class Post(models.Model):
    user = models.ForeignKey(UserProfil,related_name='author', on_delete=models.CASCADE,blank=True, null=True)
    post = models.ImageField(upload_to='media/image/post', height_field='height_field', width_field='width_field',blank=True, null=True)
    caption = models.TextField(blank=True, null=True)
    width_field = models.PositiveIntegerField(default=0,blank=True, null=True)
    height_field = models.PositiveIntegerField(default=0,blank=True, null=True)
    create_at = models.DateTimeField(auto_now=True, auto_now_add=False)
    private = models.BooleanField(default=False)
    """ tag people ??? location ???? """
    """ feature ??? """
    objects = PostManage()

    def save(self,*args, **kwargs):
        super().save(*args,**kwargs)

        # compress image with PIllow before upload to database
        img = Image.open(self.post.path)
        
        myHeight , myWidht = img.size
        img = img.resize((myHeight,myWidht),Image.ANTIALIAS)
        
        img.save(self.post.path)
        
    @property
    def get_total_like(self):
        return self.likes.count()


    @property
    def get_content_type(self):
        instance = self
        content_type = ContentType.objects.get_for_model(instance.__class__)
        return content_type

    def __str__(self):
        return 'post of {}. caption:{}'.format(self.user,self.caption)
     
class Like(models.Model):
    post = models.ForeignKey(Post, related_name='liked_post',on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfil, related_name='liker',on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_created']
    def __str__(self):
        return '{} : {}'.format(self.user, self.post)
    
# @receiver(post_save,sender=Post)
# def post_save_user(instance,created,*args, **kwargs):
#     print(instance)
#     print(args,kwargs)