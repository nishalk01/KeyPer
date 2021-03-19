from rest_framework import serializers

from otp_logic.models import OTP

class UserDetail(serializers.ModelSerializer):
    email=serializers.CharField(read_only=True,source="owner.email")
    username=serializers.CharField(read_only=True,source="owner.username")
    class Meta:
        model=OTP
        fields=['unique_key','email','username']