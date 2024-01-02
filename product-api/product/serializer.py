from rest_framework import routers, serializers, viewsets

from . import models
from .external.userclient import UserApiClient


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = "__all__"


class UserSerializer(serializers.BaseSerializer):
    user_api_client = UserApiClient()

    def to_representation(self, user_id):
        user_info = self.user_api_client.get_user_info(user_id)
        return user_info['data']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ("id", "product", "user",)

    product = ProductSerializer()
    user = UserSerializer(source="user_id")
