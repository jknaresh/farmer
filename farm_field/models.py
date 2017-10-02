# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.db import models

# Create your models here.
from bio_data.models import FarmerBioData


class Farm(models.Model):
    farmer = models.ForeignKey(FarmerBioData)
    name = models.CharField(max_length=75)
    details = models.CharField(max_length=75)
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(editable=False, auto_now_add=True)
    # Only on creation
    update_on = models.DateTimeField(editable=False, auto_now=True)
    # On every save


class FarmField(models.Model):
    farm = models.ForeignKey(Farm)
    season = models.CharField(max_length=1, choices=settings.SEASON)
    is_active = models.BooleanField(default=True)
    field_from = models.DateTimeField()
    field_to = models.DateTimeField()
    # point 1:point2:point3:point 4
    # 1.234568,2.34343:13.234324,15.23234234:..etc
    land_coordinates = models.CharField(
        max_length=150, default=None, null=True)
    created_on = models.DateTimeField(editable=False, auto_now_add=True)
    # Only on creation
    update_on = models.DateTimeField(editable=False, auto_now=True)
    # On every save
