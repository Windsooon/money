from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.http import HttpResponse
from lend.models import Lend
from owe.models import Owe


def frontpage(request):
    return render(
        request, 'frontpage.html',
    )


def how(request):
    return render(
        request, 'intro.html',
    )


@csrf_exempt
def email(request):
    email = request.POST.get('email', None)
    if email:
        Lend.objects.get_or_create(email=email)
        return JsonResponse({'email': email})
    else:
        return HttpResponse(status=400)


@csrf_exempt
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


@csrf_exempt
def friends(request):
    lend = request.POST.get('lend', None)
    email = request.POST.get('email', None)
    money = request.POST.get('money', None)
    reason = request.POST.get('reason', None)
    if lend and email and money and reason:
        lend = get_object_or_404(Lend, email=lend)
        owe = Owe.objects.create(
            lend=lend, email=email,
            money=money, reason=reason)
        return JsonResponse({
            'email': owe.email,
            'money': owe.money,
            'reason': owe.reason
            })
    else:
        return HttpResponse(status=400)
