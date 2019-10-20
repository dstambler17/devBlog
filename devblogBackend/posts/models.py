from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=100)
    likes = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def get_likes(self):
        return self.likes
