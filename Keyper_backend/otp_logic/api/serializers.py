from rest_framework import serializers

from otp_logic.models import OTP
class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model=OTP 
        fields=['owner','unique_key']
