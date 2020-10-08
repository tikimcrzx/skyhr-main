# skills/url.s.py
from django.urls import path

from . import views


urlpatterns = [
    path('skill/', views.SkillView.as_view()),
    path('skill/<int:id>/', views.SkillView.as_view()),
]
