"""
ASGI config for Keyper_backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import tracking_logic.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Keyper_backend.settings')

application = get_asgi_application()


application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": AuthMiddlewareStack(
        URLRouter(
            tracking_logic.routing.websocket_urlpatterns
        )
    ),
})
