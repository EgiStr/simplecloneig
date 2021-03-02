from django.db.models.signals import post_save,post_delete
from django.dispatch import receiver

from notif.models import Notifikasi
from .models import UserFollowing

# dapet notif jiga ada follow
@receiver(post_save,sender=UserFollowing)
def follow_notif_create(instance,created,*args, **kwargs):
    
    if created:
        if instance.user != instance.following_user:
            Notifikasi.objects.create(
                sender=instance.following_user,
                receiver=instance.user,
                type_notif=2,
                more_text=f'{instance.following_user} has follow your ..'
            )

# menghapus jiga batal
@receiver(post_delete,sender=UserFollowing)
def follow_notif_delete(instance,*args, **kwargs):
    notif = Notifikasi.objects.filter(
            sender=instance.following_user,
            receiver=instance.user,
            type_notif=2,       
        )
    notif.delete()