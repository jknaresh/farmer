# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from farm_field.models import Farm, FarmField

admin.site.register(Farm)
admin.site.register(FarmField)
