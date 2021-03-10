from django.contrib import admin
from .models import OTP,SharedKey
# Register your models here.
admin.site.register(OTP)
admin.site.register(SharedKey)