from django.shortcuts import render
from django.http import HttpResponse
from owe.models import Owe
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
        owe = Owe.objects.filter(email=email)
        owe_money = 0
        if owe:
            for i in owe:
                owe_money += i.money
        return HttpResponse(owe_money)
    else:
        return HttpResponse(status=400)
