from django import forms 
from .models import Comments

class FormComment(forms.ModelForm):
    class Meta:
        model = Comments
        fields =[
            'content',
        ]