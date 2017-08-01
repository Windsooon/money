from django.db import models


class Lend(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name + '  ---  ' + self.email
