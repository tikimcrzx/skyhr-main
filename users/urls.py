# users/url.s.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import auth_views, skill_views, sector_views, video_views

router = DefaultRouter()
router.register('signup', auth_views.SignUpView)

urlpatterns = [
    path('', include(router.urls)),
    path('hello-view/', auth_views.HelloApiView.as_view()),

    path('activate/<str:token>/', auth_views.ActivateAccountView.as_view()),
    path('profile/', auth_views.UserProfileView.as_view()),
    path('employment/', auth_views.UserEmploymentView.as_view()),
    path('employment/<int:id>/', auth_views.UserEmploymentView.as_view()),
    path('skill/', skill_views.UserSkillView.as_view()),
    path('sectors/', sector_views.UserSectorView.as_view()),
    path('video/', video_views.UserVideoView.as_view()),

    path('signin/', auth_views.signin),
    path('google-login/', auth_views.google_login),
    path('facebook-login/', auth_views.facebook_login),
    path('linkedin-login/', auth_views.linkedin_login),

    path('forgot-password/', auth_views.post_email_for_reset_password),
    path('reset-password/<str:token>/', auth_views.reset_password),

] + router.urls
