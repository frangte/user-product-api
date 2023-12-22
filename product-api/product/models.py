from django.db import models


class Category(models.Model):
    id = models.UUIDField(primary_key=True)
    name = models.CharField(max_length=100)
        


class Product(models.Model):
    label = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    quantity = models.IntegerField()
