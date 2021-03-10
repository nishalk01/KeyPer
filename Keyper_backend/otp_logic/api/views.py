from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
import uuid

from account_model.models import Account
from otp_logic.models import OTP
from .serializers import OTPSerializer


    


@api_view(['GET',])
def generate_user_key(request):
    if(request.auth):
      usr_id=request.user.id
      account_obj=Account.objects.get(id=usr_id)
      if(OTP.objects.filter(owner=usr_id).exists()):
         OTP.objects.filter(owner=usr_id).update(unique_key=uuid.uuid4())
      else: 
        OTP.objects.create(owner=account_obj)
        print(OTP.objects.get(owner=usr_id).unique_key)
    else:
      return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET',])
def get_user_key(request):
    if(request.auth):
        otp_obj=OTP.objects.get(owner=request.user.id)
        serializers=OTPSerializer(otp_obj,context={"request":request})
        return Response(serializers.data)
    else:
       return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET',])
def share_otp_key(request):
    return Response()




#httpie command usage
# http http://127.0.0.1:8000/hello/ 'Authorization: Token 9054f7aa9305e012b3c2300408c3dfdf390fcddf'