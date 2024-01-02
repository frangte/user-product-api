from rest_framework.mixins import RetrieveModelMixin
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from . import models, serializer


class OrderView(RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    serializer_class = serializer.OrderSerializer
    queryset = models.Order.objects.select_related("product").all()
