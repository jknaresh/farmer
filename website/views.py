# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.shortcuts import render


# Create your views here.
from bio_data.models import FarmerBioData
from farm_field.models import Farm


def index(request):
    return render(request, "index.html", locals(), content_type="text/html",
                  status=200)

def farm(request):
    farmers = FarmerBioData.objects.all()
    return render(request, "farm.html", locals(), content_type="text/html",
                  status=200)


def farm_field(request):
    farms = Farm.objects.all()
    seasons = settings.SEASON_DICT
    crop_types = settings.CROP_TYPE_DICT

    return render(request, "farm-field.html", locals(), content_type="text/html",
                  status=200)