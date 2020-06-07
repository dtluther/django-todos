from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    color = models.TextField(blank=True)

    def __str__(self):
        return self.title