
from django.urls import path, re_path
from core.views import TestView

urlpatterns = [
    path('test/', TestView.as_view()),

]