from django.shortcuts import render

def crew(request):
    return render(request, 'crew/crew.html')
