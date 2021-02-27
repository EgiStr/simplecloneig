from django.db import models

from posts.models import Post
from usercostumer.models import UserProfil
# Create your models here.

class Notifikasi(models.Model):

    # TODO: Define fields here
    NOTIF_CHOIECE = (
        (1,'like'),
        (2,'follow'),
        (3,'comment'),
        (4,'mention')
    )

    post = models.ForeignKey(Post,on_delete=models.CASCADE,blank=True, null=True)
    sender = models.ForeignKey(UserProfil,on_delete=models.CASCADE)
    receiver = models.ForeignKey(UserProfil, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    type_notif = models.PositiveIntegerField(choices=NOTIF_CHOIECE)
    more_text = models.TextField(null=True, blank=True)
    is_seen = models.BooleanField(default=False)

    class Meta:
        ordering = ['-create_at']

    def __str__(self):
       return f'notif {self.sender.nickname} for  {self.reciver.nickanme} notif {self.notif}'

    # TODO: Define custom methods here
