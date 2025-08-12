from django.urls import path
from . import views

urlpatterns = [
    path('', views.my_page, name='my_page'),
    path('my_profile/', views.profile_view, name='my_profile'),
    path('my_groups/', views.my_groups_view, name='my_groups'),
    path('my_activities/', views.my_activities_view, name='my_activities'),
    path('logout/', views.logout_view, name='logout'),
]