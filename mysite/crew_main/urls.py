from django.urls import path
from . import views

urlpatterns = [
    path("", views.crew , name="crew_main"),
]