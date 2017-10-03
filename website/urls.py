from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.views.generic import RedirectView

from website import views as website_view

app_name = 'website'
urlpatterns = [
    url(r'^index/$', website_view.index, name="index"),
    url(r'^$',
        RedirectView.as_view(url="/index/", permanent=False),
        name="init"),
    url(r'^farm/$', website_view.farm, name="farm"),

]

urlpatterns += [
    url('^', include('django.contrib.auth.urls')),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.STATIC_URL, document_root=settings.STATIC_ROOT)
