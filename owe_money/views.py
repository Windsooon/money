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
    email = request.POST.get('email', None)
    if email:
        Lend.objects.get_or_create(email=email)
        return JsonResponse({'email': email})
    else:
        return HttpResponse(status=400)


def sub_email(request):
    email = request.POST.get('email', None)
    if email:
        obj, created = Lend.objects.update_or_create(
            email=email,
            defaults={'notice': 1},
        )
        return JsonResponse({'email': obj.email, 'notice': obj.notice})
    else:
        return HttpResponse(status=400)
