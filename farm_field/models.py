# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.db import models

# Create your models here.
from bio_data.models import FarmerBioData


class Farm(models.Model):
    farmer = models.ForeignKey(
        FarmerBioData, related_name=u"farm", on_delete=models.CASCADE)
    name = models.CharField(max_length=75)
    details = models.CharField(max_length=75)
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(editable=False, auto_now_add=True)
    # Only on creation
    update_on = models.DateTimeField(editable=False, auto_now=True)
    # On every save

    def __unicode__(self):
        return self.name


class FarmField(models.Model):
    farm = models.ForeignKey(Farm, related_name=u"farmfield")
    name = models.CharField(max_length=75)
    season = models.CharField(max_length=2, choices=settings.SEASON)
    crop_type = models.CharField(max_length=2, choices=settings.CROP_TYPE)
    is_active = models.BooleanField(default=True)
    field_from = models.DateField()
    field_to = models.DateField()
    # point 1:point2:point3:point 4
    # 1.234568,2.34343:13.234324,15.23234234:..etc
    land_coordinates = models.CharField(
        max_length=150, default=None, null=True)
    created_on = models.DateTimeField(editable=False, auto_now_add=True)
    # Only on creation
    update_on = models.DateTimeField(editable=False, auto_now=True)
    # On every save
