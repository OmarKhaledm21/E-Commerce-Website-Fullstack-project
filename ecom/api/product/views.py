from rest_framework import viewsets
from .serializers import ProductSerializer
from.models import Product
# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all().order_by('id')
    