from django.db import models

class Product(models.Model):
    id = models.UUIDField(primary_key=True)
    label = models.CharField(max_length=50)
    description = models.CharField(max_length=512)
    quantity = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Order(models.Model):
    id = models.UUIDField(primary_key=True)
    user_id = models.IntegerField(null=False)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
