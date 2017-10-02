# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render


# Create your views here.
def index(request):
    print request
    return render(request, "index.html", locals(), content_type="text/html",
                  status=200)
