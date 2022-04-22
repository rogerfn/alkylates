import os
from .base import *

from dotenv import load_dotenv

load_dotenv(dotenv_path=BASE_DIR / '.env.production', verbose=True)

CORS_ALLOW_ALL_ORIGINS = True


DATABASES = {
    'default': {
      "ENGINE":  "django.db.backends.postgresql",
      "NAME": os.getenv('DB_NAME'),
      "USER": os.getenv("DB_USER"),
      "PASSWORD": os.getenv("DB_PASSWORD"),
      "HOST": os.getenv("DB_HOST"),
      "PORT": os.getenv("DB_PORT"),
    }
}
