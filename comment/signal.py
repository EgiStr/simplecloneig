from posts.models import Post
from django.db.models.signals import post_save,post_delete
from django.dispatch import receiver

from notif.models import Notifikasi
from .models import Comments

# dapet notif jiga ada follow
@receiver(post_save,sender=Comments)
def comment_notif_create(instance,created,*args, **kwargs):
    post = list(Post.objects.filter(id=instance.obj_id))[0]
    user = post.user
    if created:
        if instance.user != user:
            Notifikasi.objects.create(
            post = post,
            sender=instance.user,
            receiver=user,
            type_notif=3,
            more_text=f'{instance.user} was comment {instance.content} in your post'
        )
        

# menghapus jiga batal
@receiver(post_delete,sender=Comments)
def comment_notif_delete(instance,*args, **kwargs):
    post = list(Post.objects.filter(id=instance.obj_id))[0]
    user = post.user
    notif = Notifikasi.objects.create(
            post = post,
            sender=instance.user,
            receiver=user,
            type_notif=3,
    )
    notif.delete()