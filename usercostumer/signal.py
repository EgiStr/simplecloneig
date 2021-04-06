from django.db.models.signals import post_save,post_delete
from django.dispatch import receiver

from notif.models import Notifikasi
from .models import UserFollowing
# reset password
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  

# dapet notif jiga ada follow
@receiver(post_save,sender=UserFollowing)
def follow_notif_create(instance,created,*args, **kwargs):
    
    if created:
        if instance.user != instance.following_user:
            Notifikasi.objects.create(
                sender=instance.following_user,
                receiver=instance.user,
                type_notif=2,
                more_text=f' started following  you ..'
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

# forget password // reset password
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    email_plaintext_message = f"masuk ke link tersebut dan buat password  \n 127.0.0.1:3000/forget-password/comfirm/?{reset_password_token.key} \n \n "
    send_mail(
        # title:
        "Password Reset for {title}".format(title="SnapThin Website"),
        # message:
        email_plaintext_message ,
        # from:
        "Admin@Snapthin",
        # to:
        [reset_password_token.user.email]
    )