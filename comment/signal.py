from posts.models import Post
from usercostumer.models import UserProfil

from django.db.models.signals import post_save,post_delete
from django.dispatch import receiver

from notif.models import Notifikasi
from .models import Comments

# dapet notif jiga ada comment model dibuat
@receiver(post_save,sender=Comments)
def comment_notif_create(instance,created,*args, **kwargs):
    if created:
        post = list(Post.objects.filter(id=instance.obj_id))[0]
        user = post.user

        # buat filter
        filters = instance.content.split(" ")    
        mentionUser = []
        for i in filters:
            if len(i) != 0:
                if i[0] == '@':
                    mentionUser.append(i)
                    
        # mengcheck jika ada user mention di comment agar mengirim notifikasi
        if len(mentionUser) != 0 :
            for mention in mentionUser:
                try:
                    receiverMention = list(UserProfil.objects.filter(nickname=mention[1::]))[0]
                except:
                    receiverMention = False
                if receiverMention != False and instance.user != receiverMention:
                    Notifikasi.objects.create(
                        post = post,
                        sender = instance.user,
                        receiver=receiverMention,
                        type_notif=4,
                        more_text = f' was mention you in {user} post'
                    )
                
        
        # mengecheck agar tidak membuat notif untuk diri sendiri
        if instance.user != user:
            Notifikasi.objects.create(
            post = post,
            sender=instance.user,
            receiver=user,
            type_notif=3,
            more_text=f' was comment {instance.content} in your post'
        )
        

# menghapus jiga batal
@receiver(post_delete,sender=Comments)
def comment_notif_delete(instance,*args, **kwargs):
    post = list(Post.objects.filter(id=instance.obj_id))[0]
    user = post.user
    notif = Notifikasi.objects.filter(
            post = post,
            sender=instance.user,
            receiver=user,
            type_notif=3,
    )
    notif.delete()