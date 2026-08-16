import os
from pathlib import Path

# {% extends %}、{% block %}、{% include %} 是 Django 模板语法
# Django 启动时会读取 settings.py
# ROOT_URLCONF 指定总路由文件：fortrix_site.urls
# TEMPLATES["BACKEND"] 指定模板引擎
# "django.template.context_processors.request" 让模板里可以直接使用 request

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-fortrix-robotics-demo-key"

DEBUG = True

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "fortrix_site.basic_auth.BasicAuthMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "fortrix_site.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "fortrix_site.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = "zh-hans"

TIME_ZONE = "Asia/Shanghai"

USE_I18N = True

USE_TZ = True

STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "static"]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

BASIC_AUTH_ENABLED = os.getenv("FORTRIX_BASIC_AUTH_ENABLED", "false").lower() in [
    "1",
    "true",
    "yes",
    "on",
]
BASIC_AUTH_USERNAME = os.getenv("FORTRIX_BASIC_AUTH_USERNAME", "fortrix")
BASIC_AUTH_PASSWORD = os.getenv("FORTRIX_BASIC_AUTH_PASSWORD", "")
BASIC_AUTH_REALM = os.getenv("FORTRIX_BASIC_AUTH_REALM", "Fortrix Preview")

