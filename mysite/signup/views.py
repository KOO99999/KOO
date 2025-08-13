from django.shortcuts import render

def signup(request):
    return render(request, 'signup/signup.html')

def hobby(request):
    return render(request, 'signup/hobby.html')

def hobby_crew(request):
    return render(request, 'signup/hobby_crew.html')