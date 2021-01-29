from django.db import models
from django.conf import Settings
from django.db.models.fields import CharField 
from django.dispatch import receiver
from django.db.models.signals import post_save,pre_save
from igclone.posts.models import Post

# Create your models here.
class UserProfil(models.Model):
    CHOICE_GENDER = (
        ('male','Male'),
        ('female','Female')
    )
    user = models.ForeignKey(Settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nickname = CharField(default= user.username,max_length=30)
    profil = models.ImageField(upload_to='build/static/media/image/profil',default='build/static/media/image/profil/default.jpg')
    bio = models.TextField(blank=True, null=True)
    email  = models.EmailField(max_length=254,blank=True, null=True)
    nomorHp= models.PhoneNumberField(blank=True, null=True)
    gender = models.CharField(choices=CHOICE_GENDER,max_length=50) 

    @property
    def get_count_posts(self):
        count = self.author.all().count()
        return count

    