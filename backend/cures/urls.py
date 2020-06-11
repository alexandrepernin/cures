from django.urls import path, re_path, include
from . import views
from django.conf.urls import url
from .views import current_user, UserList, CureViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'api/cures', CureViewSet, basename='cure')

urlpatterns = [
    re_path(r'^api/cures-list/$', views.cures_list),
    re_path(r'^api/symptoms/$', views.symptoms_list),
    # Function-based view => just give the function's name.
    path('cures/current_user/', current_user),
    # Class-based view => specify as_view()
    path('cures/signup/', UserList.as_view()),
]

urlpatterns += router.urls
