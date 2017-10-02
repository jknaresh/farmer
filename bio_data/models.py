# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.
class FarmerBioData(models.Model):
    name = models.CharField(max_length=75)
    contact_no = models.CharField(max_length=10, blank=True, null=True)
    address = models.TextField(max_length=500, blank=True, null=True)
    pin = models.PositiveIntegerField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(editable=False, auto_now_add=True)
    # Only on creation
    update_on = models.DateTimeField(editable=False, auto_now=True)

    # On every save

    def __unicode__(self):
        return self.name
