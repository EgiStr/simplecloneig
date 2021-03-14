from django.db import models

from posts.models import Post
from usercostumer.models import UserProfil

from django.contrib.humanize.templatetags import humanize

# Create your models here.

class Notifikasi(models.Model):

    # TODO: Define fields here
    NOTIF_CHOIECE = (
        (1,'like'),
        (2,'follow'),
        (3,'comment'),
        (4,'mention')
    )
    
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="postingan")
    sender = models.ForeignKey(UserProfil,on_delete=models.CASCADE,related_name="pengirim",related_query_name="pengirim")
    receiver = models.ForeignKey(UserProfil, on_delete=models.CASCADE,related_query_name="penerima",related_name="penerima")
    create_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    type_notif = models.PositiveIntegerField(choices=NOTIF_CHOIECE)
    more_text = models.TextField(null=True, blank=True)
    is_seen = models.BooleanField(default=False)

    class Meta:
        ordering = ['-create_at']

    def __str__(self):
       return f'notif {self.sender.nickname} for  {self.receiver} notif {self.type_notif}'

    # TODO: Define custom methods here

    @property
    def get_create_time(self):
        return humanize.naturalday(self.create_at)
