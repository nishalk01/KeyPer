from rest_framework import serializers

from otp_logic.models import OTP,SharedKey

class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model=OTP 
        fields=['owner','unique_key']


class SharedKeySerializer(serializers.ModelSerializer):
    to_name=serializers.CharField(read_only=True,source="to.email")
    class Meta:
        model=SharedKey
        fields=['to_name','time_of_creation','to','time_till_expiration','unique_shared_key']

