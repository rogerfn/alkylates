import os
from .base import *
from dotenv import load_dotenv

load_dotenv( dotenv_path = BASE_DIR / '.env.test', verbose=True)


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

DATABASES = {
    'alkylates_api': {
      "ENGINE":  "django.db.backends.postgresql",
      "NAME": os.getenv('alk_DB'),
      "USER": os.getenv("alk_USER"),
      "PASSWORD": os.getenv("alk_PASS"),
      "HOST": os.getenv("alk_SERVER"),
      "PORT": '13163',
      "OPTIONS": {"driver": "ODBC Driver 17 for SQL Server",
        },
    }
}

