from django.shortcuts import render

def my_page(request):
    return render(request, 'my_page/my_page.html')

def profile_view(request):
    return render(request, 'my_page/my_profile.html')

def my_groups_view(request):
    return render(request, 'my_page/my_groups.html')

def my_activities_view(request):
    return render(request, 'my_page/my_activities.html')

def logout_view(request):
    # 로그아웃 처리 후 리다이렉트
    from django.contrib.auth import logout
    from django.shortcuts import redirect

    logout(request)
    return redirect('home')  # 홈 페이지로 이동
