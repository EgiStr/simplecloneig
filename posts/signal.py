from django.db.models.signals import post_save,post_delete
from django.dispatch import receiver

from notif.models import Notifikasi
from .models import Like

# dapet notif jiga ada like
@receiver(post_save,sender=Like)
def Like_notif_create(instance,created,*args, **kwargs):
    if created:
        Notifikasi.objects.create(
            post=instance.post,
            sender=instance.user,
            receiver=instance.post.user,
            type_notif=1,
            more_text=f'{instance.user.nickname} has like your post {instance.post.caption}'
        )

# menghapus jiga batal
@receiver(post_delete,sender=Like)
def Like_notif_delete(instance,*args, **kwargs):
    notif = Notifikasi.objects.filter(
            post=instance.post,
            sender=instance.user,
            receiver=instance.post.user,
            type_notif=1,
            more_text=f'{instance.user.nickname} has like your post {instance.post.caption}'
        )
    notif.delete()