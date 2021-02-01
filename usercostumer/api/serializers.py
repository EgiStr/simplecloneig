from posts.api.serializers import PostSerializerProfil
from usercostumer.models import UserProfil
from django.db.models.deletion import SET_NULL
from rest_framework.serializers import ModelSerializer,SerializerMethodField
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


class UserProfilSerialzer(ModelSerializer):
    user = SerializerMethodField()
    post_count = SerializerMethodField()
    post_data = SerializerMethodField()
    class Meta:
        model = UserProfil
        fields = [
            'user',
            'id',
            'nickname',
            'profil',
            'bio',
            'email',
            'nomorHp',
            'gender',
            'post_count',
            'post_data',
        ]

    def get_user(self,obj):
        return obj.user.username

    def get_post_count(self,obj):
        return obj.get_count_posts
    
    def get_post_data(self,obj):
        post = obj.author.all()
        post = PostSerializerProfil(post,many=True).data
        return post

class registeruser(ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[
                UniqueValidator(queryset=User.objects.all())
                ]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email','username', 'password', 'password2' )

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        try:
            email_valid = validated_data['email']
        except:
            email_valid = SET_NULL
        user = User.objects.create(
            username=validated_data['username'],
            email=email_valid,
        )

        user.set_password(validated_data['password'])
        user.save()
        return user