from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from lend.models import Lend


def frontpage(request):
    return render(
        request, 'frontpage.html',
    )


def how(request):
    return render(
        request, 'intro.html',
    )


def email(request):
    name = request.POST.get('name', None)
    email = request.POST.get('email', None)
    if email and name:
        Lend.objects.get_or_create(email=email)
        return JsonResponse({'email': email})
    else:
        return HttpResponse(status=400)
