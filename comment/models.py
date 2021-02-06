from django.db import models
from django.conf import settings 
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from usercostumer.models import UserProfil

# Create your models here.

class CommentManager(models.Manager):
    def all(self):
        return super(CommentManager,self).filter(parent=None)

    def fillter_by_instance(self,instance):
        content_type= ContentType.objects.get_for_model(instance.__class__)
        obj_id = instance.id
        qs = super(CommentManager,self).filter(content_type=content_type,obj_id= obj_id)
        return qs

class Comments(models.Model):
    user = models.ForeignKey(UserProfil,on_delete=models.CASCADE,default=1)
    content = models.TextField()
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, blank=True, null=True)
    obj_id = models.PositiveIntegerField(blank=True, null=True)
    content_object = GenericForeignKey('content_type','obj_id')
    parent  = models.ForeignKey('self', on_delete=models.CASCADE,blank=True, null=True)
    timestamp = models.DateTimeField(auto_now=True, auto_now_add=False)

    objects = CommentManager()

    class Meta:
        ordering = ["-timestamp"]
    
    def __str__(self):
        return f'comment {self.user.nickname} to {self.content_object}'

    def __unicode__(self):
        return str(self.user.nickname)

    def children(self):
        return Comments.objects.filter(parent=self)
    
    @property
    def is_parent(self):
        if self.parent != None:
            return False
        return True