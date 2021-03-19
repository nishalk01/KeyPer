import requests


headers = {'Authorization': 'Token 921866a4e16365c99ed5a4ab34a9cc64967de361'}
url_="http://192.168.0.108:8000/api/"
url_p="http://192.168.0.108:8000/api_profile/"
def get_user_key():
    url = url_+'key/'
    r = requests.get(url, headers=headers)
    print(r.json() )

def create_share_key():
    url=url_+"create_share_key/"
    myobj={"to_user":"nishal@gmail.com"}
    r=requests.post(url,data=myobj,headers=headers)
    print(r)

def check_for_valid():
    url=url_+"check_for_valid/"
    myobj={"unique_to_check":"22f1a696-707d-44a6-8fff-da096423d675"}
    r=requests.post(url,headers=headers,data=myobj)
    print(r.json())
    print(r)

def make_shared_key_invalid():
    url=url_+"make_shared_key_invalid/"
    myobj={"unique_to_check":"22f1a696-707d-44a6-8fff-da096423d675"}
    r=requests.post(url,data=myobj,headers=headers)
    print(r)
    


def get_shared_keys():
    url=url_+"get_sharekeys/"
    r=requests.get(url,headers=headers)
    print(r.json())

def update_time_limit():
    url=url_+"update_sharekey_time/"
    my_obj={"unique_sharekey":"336ede7c-9283-4bac-b329-f05a49fedcba","time_limit":"100"}
    r=requests.post(url,headers=headers,data=my_obj)
    print(r)



def get_user_details():
    url=url_p+"user_details/"
    r=requests.get(url,headers=headers)
    print(r.json())

get_user_details()