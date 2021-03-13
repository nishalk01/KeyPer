import requests


headers = {'Authorization': 'Token 921866a4e16365c99ed5a4ab34a9cc64967de361'}
url_="http://127.0.0.1:8000/api/"
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
    
make_shared_key_invalid()
check_for_valid()