# jobs/url.s.py
from django.urls import path

from . import views


urlpatterns = [
    path('categories/', views.JobCategoryView.as_view()),
    path('kinds/', views.JobKindView.as_view()),
    path('supplements/', views.JobSupplementView.as_view()),
    path('benefits/', views.JobBenefitView.as_view()),
    path('availabilities/', views.JobAvailabilityView.as_view()),
    path('job/', views.JobView.as_view()),
]
