from django.urls import path
from .views import get_user_key,generate_user_key,create_share_key,check_for_valid,make_shared_key_invalid,delete_user_key,get_valid_sharekey


app_name="key"

urlpatterns=[
    path("key/",get_user_key,name="user_key"),
    path("generate_key/",generate_user_key,name="generate_key"),
    path("create_share_key/",create_share_key,name="sharekey"),
    path("check_for_valid/",check_for_valid,name="validity"),
    path("make_shared_key_invalid/",make_shared_key_invalid,name="make_invalid"),
    path("delete_userkey/",delete_user_key,name="delete_userkey"),
    path("get_sharekeys/",get_valid_sharekey,name="all_sharekey"),
]