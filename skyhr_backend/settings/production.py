from .base import *
import django_heroku

django_heroku.settings(locals())

DEBUG = True
ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
    'skyhr.com.mx',
    'www.skyhr.com.mx',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
    }
}
