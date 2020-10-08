from django.db import models


# Create your models here.
class Skill(models.Model):
    name = models.CharField(max_length=50)


class SubSkill(models.Model):
    parent = models.ForeignKey(Skill, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
