from django.db import models
import uuid
from account_model.models import Account

class OTP(models.Model):
    owner=models.ForeignKey(Account,on_delete=models.CASCADE)
    unique_key=models.UUIDField(primary_key = True, default = uuid.uuid4)
    
    def __str__(self):
        return str(self.owner.username)


class SharedKey(models.Model):
    from_user=models.ForeignKey(Account,on_delete=models.CASCADE,related_name="from_user")
    time_of_creation=models.DateTimeField(auto_now=True)
    to=models.ForeignKey(Account,on_delete=models.CASCADE,related_name="to_user")
    time_till_expiration=models.IntegerField(default=5)
    unique_shared_key=models.UUIDField(primary_key=True,default=uuid.uuid4)
    valid=models.BooleanField(default=True)
    

    def __str__(self):
        return self.to.username


