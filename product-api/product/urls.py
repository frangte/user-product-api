from rest_framework import routers

from . import apps, apis


app_name = apps.ProductConfig.name
router = routers.DefaultRouter()

router.register(
    "orders",
    apis.OrderView,
    basename="orders"
)

urlpatterns = []
urlpatterns += router.urls
