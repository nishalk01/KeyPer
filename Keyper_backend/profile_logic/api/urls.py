from django.urls import path
from .views import get_user_details


app_name="profile"

urlpatterns=[
    path("user_details/",get_user_details,name="user_details"),
    
]