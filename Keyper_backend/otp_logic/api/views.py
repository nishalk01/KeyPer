from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
import uuid
from datetime import datetime
from account_model.models import Account
from otp_logic.models import OTP,SharedKey
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



@api_view(['POST',])
def create_share_key(request):
  usr_id=request.user.id
  if(request.auth):
    try:
      to_user=request.data["to_user"]
      account_obj_to_usr=Account.objects.get(email=to_user)
      account_obj_from_usr=Account.objects.get(id=usr_id)
      SharedKey_filter=SharedKey.objects.filter(from_user=account_obj_from_usr,to=account_obj_to_usr)
      if(SharedKey_filter.exists()):
        SharedKey_filter.update(unique_shared_key=uuid.uuid4())
      else:
        SharedKey.objects.create(from_user=account_obj_from_usr,to=account_obj_to_usr)
    except Exception as E:
      print(E)
      return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_200_OK)
  else:
    return Response(status=status.HTTP_401_UNAUTHORIZED)



# @api_view(['POST',])
# def check_for_valid(request):
#   if(request.auth):
#       shared_key=request.data['unique_to_check']
#       key_obj=SharedKey.objects.filter(unique_shared_key=shared_key)
#       print(key_obj.first().time_of_creation)
#       print(datetime.now())
#       print(key_obj.first().time_of_creation>=datetime.now())
#       return Response(status=status.HTTP_200_OK)

#     #check if valid
      





#httpie command usage
# http http://127.0.0.1:8000/hello/ 'Authorization: Token 9054f7aa9305e012b3c2300408c3dfdf390fcddf'