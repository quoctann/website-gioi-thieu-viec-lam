"""
Tập tin cấu hình một app trong django, để sử dụng app này phải khai báo trong
settings.py mục INSTALLED_APPS
"""
from django.apps import AppConfig


class GioithieuvieclamAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'gioithieuvieclam_app'
