from django.urls import path, re_path
from . import views
from django.conf.urls import url
from .views import current_user, UserList


urlpatterns = [
    re_path(r'^api/cures/$', views.cures_list),
    # Function-based view => just give the function's name.
    path('cures/current_user/', current_user),
    # Class-based view => specify as_view()
    path('cures/signup/', UserList.as_view()),
]
