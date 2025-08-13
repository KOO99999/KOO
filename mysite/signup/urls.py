from django.urls import path
from . import views

urlpatterns = [
    path('', views.signup, name='signup'),
    path('hobby/', views.hobby, name='hobby'),
    path('hobby_crew/', views.hobby_crew, name='hobby_crew'),
]

