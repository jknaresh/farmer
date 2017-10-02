# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your views here.
from rest_framework import viewsets, renderers
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from api.serializers import (
    FarmerBioDataSerializer, FarmSerializer, FarmFieldSerializer)
from bio_data.models import FarmerBioData
from farm_field.models import Farm, FarmField


class FarmerViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    # authentication_classes = (TokenAuthentication,)
    # renderer_classes = (renderers.JSONRenderer,)
    queryset = FarmerBioData.objects.all().order_by('-update_on')
    serializer_class = FarmerBioDataSerializer


class FarmViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    # authentication_classes = (TokenAuthentication,)
    # renderer_classes = (renderers.JSONRenderer,)
    queryset = Farm.objects.all().order_by('-update_on')
    serializer_class = FarmSerializer


class FarmFieldViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    # authentication_classes = (TokenAuthentication,)
    # renderer_classes = (renderers.JSONRenderer,)
    queryset = FarmField.objects.all().order_by('-update_on')
    serializer_class = FarmFieldSerializer
