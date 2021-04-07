from django.db import models
from django.contrib.contenttypes.models import ContentType

# Create your models here.
from usercostumer.models import UserProfil,UserFollowing
from PIL import Image

from django.contrib.humanize.templatetags import humanize

class PostManage(models.Manager):
    def get_post_homepage(self,nickname):
        users = [nickname,]
        # mencari user yang di follow si user
        users +=  [ i.user for i in  UserFollowing.objects.filter(following_user = nickname)] # values_list mengembalikan gruop yang ada si user -> id 
        
        # memfilter user yang ada didalam list -> yang difollow 
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
    def get_content_type(self):
        instance = self
        content_type = ContentType.objects.get_for_model(instance.__class__)
        return content_type
  
    @property
    def get_time(self):
        return humanize.naturaltime(self.create_at)

    def __str__(self):
        return 'post of {}. caption:{}'.format(self.user,self.caption)
     
class SavePostUser(models.Model):
    user = models.ForeignKey(UserProfil, related_name="username", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name="posting", on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now=False, auto_now_add=True)

    class Meta:
        ordering =['-create_at']

    def __str__(self):
        return f'{self.user.nickname} mensave post {self.post.user.nickname}'

    @property
    def get_time(self):
        return humanize.naturalday(self.create_at)

class Like(models.Model):
    post = models.ForeignKey(Post, related_name='liked_post',on_delete=models.CASCADE)
    user = models.ForeignKey(UserProfil, related_name='liker',on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
   
    @property
    def get_time(self):
        return humanize.naturalday(self.date_created)

    class Meta:
        ordering = ['-date_created']
    def __str__(self):
        return '{} : {}'.format(self.user, self.post)
    
