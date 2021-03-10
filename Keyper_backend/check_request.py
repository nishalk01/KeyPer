import requests

url = 'http://127.0.0.1:8000/api/key/'
headers = {'Authorization': 'Token 921866a4e16365c99ed5a4ab34a9cc64967de361'}
r = requests.get(url, headers=headers)
print(r.json() )