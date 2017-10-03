# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render


# Create your views here.
from bio_data.models import FarmerBioData


def index(request):
    return render(request, "index.html", locals(), content_type="text/html",
                  status=200)

def farm(request):
    farmers = FarmerBioData.objects.all()
    return render(request, "farm.html", locals(), content_type="text/html",
                  status=200)
