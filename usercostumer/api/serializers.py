from django.db import models
from django.db.models.deletion import SET_NULL
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


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