from django.apps import AppConfig


class UsercostumerConfig(AppConfig):
    name = 'usercostumer'

    def ready(self) :
        import usercostumer.signal