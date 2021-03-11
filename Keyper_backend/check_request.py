import requests


headers = {'Authorization': 'Token 921866a4e16365c99ed5a4ab34a9cc64967de361'}

def get_user_key():
    url = 'http://127.0.0.1:8000/api/key/'
    r = requests.get(url, headers=headers)
    print(r.json() )

def create_share_key():
    url="http://127.0.0.1:8000/api/create_share_key/"
    myobj={"to_user":"nishal@gmail.com"}
    r=requests.post(url,data=myobj,headers=headers)
    print(r)

create_share_key()