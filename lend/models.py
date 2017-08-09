from django.db import models


class Lend(models.Model):
    email = models.EmailField(unique=True)
    notice = models.IntegerField(default=0)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name + '  ---  ' + self.email
