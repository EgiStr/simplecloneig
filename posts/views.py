from django.shortcuts import get_object_or_404, render
import json

from django.http import HttpResponse

# Create your views here.
from .models import Post

def index(reqeust):
    if reqeust.method =="POST":
       if reqeust.POST.get("operation") == "like_submit" and reqeust.is_ajax():
         content_id=reqeust.POST.get("content_id",None)
         content=get_object_or_404(Post,pk=content_id)
         if content.likes.filter(id=reqeust.user.id): #already liked the content
            content.likes.remove(reqeust.user) #remove user from likes 
            liked=False
         else:
             content.likes.add(reqeust.user) 
             liked=True
         ctx={"likes_count":content.get_total_like,"liked":liked,"content_id":content_id}
         return HttpResponse(json.dumps(ctx), content_type='application/json')

    posts = Post.objects.all()

    context={

        'posts':posts,
    }
    return render(reqeust,'index.html',context)


def index2(request):
    return render(request,'testing2.html')