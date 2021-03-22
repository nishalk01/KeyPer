from django.shortcuts import render

def index(request):
    return render(request, 'tracking_logic/index.html')


def room(request, room_name):
    return render(request, 'tracking_logic/room.html', {
        'room_name': room_name
    })