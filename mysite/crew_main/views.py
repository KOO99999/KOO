from django.shortcuts import render

def crew(request):
    return render(request, 'crew_main/crew_main.html')
