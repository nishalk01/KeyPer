from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist


from account_model.models import Account
from otp_logic.models import OTP
from .serializers import UserDetail


@api_view(['GET'])
def get_user_details(request):
    if(request.auth):
     try:
        otp_obj=OTP.objects.get(owner=request.user.id)
        serializers=UserDetail(otp_obj)
        return Response(serializers.data)
     except ObjectDoesNotExist:
         data={"err_mssg":"user doesnot have a "}
         return Response(data)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

        
       