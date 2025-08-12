from django.urls import path
from . import views           # 같은 앱 안의 views.py를 가져온다.

urlpatterns = [
    path('', views.chatbot_view, name='chatbot_home'),
]