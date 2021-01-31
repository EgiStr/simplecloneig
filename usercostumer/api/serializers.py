from django.db import models
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


class registeruser(ModelSerializer):
    email = serializers.EmailField(
            required=False,
            validators=[
                UniqueValidator(queryset=User.objects.all())
                ]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        try:
            email_valid = validated_data['email']
        except:
            email_valid = None
        user = User.objects.create(
            username=validated_data['username'],
            email=email_valid,
        )

        user.set_password(validated_data['password'])
        user.save()
        return user