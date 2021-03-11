from django.urls import path
from .views import get_user_key,generate_user_key,create_share_key


app_name="key"

urlpatterns=[
    path("key/",get_user_key,name="user_key"),
    path("generate_key/",generate_user_key,name="generate_key"),
    path("create_share_key/",create_share_key,name="sharekey"),
]