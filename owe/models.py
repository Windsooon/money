from django.db import models
from lend.models import Lend


class Owe(models.Model):
    lend = models.ForeignKey(
        Lend, related_name="owe", on_delete=models.CASCADE)
    email = models.EmailField()
    money = models.IntegerField()
    reason = models.CharField(max_length=100)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name + '  ---  ' + self.email
