from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import *

#For SIGN IN
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)

# For SIGN UP
class UserSerializerWithToken(serializers.ModelSerializer):

    # The user class doesn't have a built in token field => create our own custom field for the serializer
    # Consequence: User instance does NOT have a token attribute. only the associated serializer does.
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    # Method to handle the creation of a new token. Using the default setting from the JWT package
    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            # set_password => to hash the password provided by the user.
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')

# CURES
class CureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cure
        fields = ('pk', 'name', 'validated')

# SYMPTOMS
class SymptomSerializer(serializers.ModelSerializer):

    class Meta:
        model = Symptom
        fields = ('pk', 'name')
