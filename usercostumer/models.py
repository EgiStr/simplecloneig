# from posts.models import Post
from django.db import models
from django.conf import settings
from django.db.models.fields import CharField 
from django.dispatch import receiver
from django.db.models.signals import post_save
# from posts.models import Post


# Create your models here.
class UserProfil(models.Model):
    CHOICE_GENDER = (
        ('male','Male'),
        ('female','Female')
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nickname = CharField(max_length=30)
    profil = models.ImageField(upload_to='media/image/profil',default='media/image/profil/default.jpg')
    bio = models.TextField(blank=True, null=True)
    email  = models.EmailField(max_length=254,blank=True, null=True)
    nomorHp= models.PositiveIntegerField(blank=True, null=True)
    gender = models.CharField(choices=CHOICE_GENDER,max_length=50,blank=True) 

    

    @property
    def get_count_posts(self):
        count = self.author.all().count()
        return count

    def __str__(self):
        return f'{self.user}'
    

class UserFollowing(models.Model):
    user = models.ForeignKey(UserProfil,related_name='follower', on_delete=models.CASCADE)
    following_user = models.ForeignKey(UserProfil,related_name='following', on_delete=models.CASCADE)
    created= models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user','following_user'],  name="unique_followers")
        ]
        ordering =['-created']
    
    def __str__(self):
        return f'follower {self.user.nickname} and following of {self.following_user.nickname}'


@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def post_save_user(instance,created,*args, **kwargs):
    if created:
        UserProfil.objects.create(
            user=instance,
            nickname=str("@"+instance.username),
    
        )