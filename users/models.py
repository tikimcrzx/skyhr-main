from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

from phone_field import PhoneField


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Creates and saves a new user"""
        if not email:
            raise ValueError("User must have an email address")
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.is_active = True
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Creates and saves a new super user"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class CompanySector(models.Model):
    sector_name = models.CharField(max_length=100, blank=True)


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=50, blank=True)
    mid_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    email = models.EmailField(unique=True, blank=True)
    mobile = PhoneField(blank=True, help_text='Contact phone number')

    rfc = models.CharField(max_length=100, blank=True)
    curp = models.CharField(max_length=100, blank=True)

    birth = models.DateField(auto_now_add=False, blank=True, null=True)
    linkedin_profile = models.CharField(max_length=200, blank=True)
    facebook_profile = models.CharField(max_length=200, blank=True)
    twitter_profile = models.CharField(max_length=200, blank=True)
    photo = models.ImageField(upload_to='avatars', blank=True)

    EDUCATION_LEVEL = (
        ('H', 'High School'),
        ('U', 'University'),
        ('M', 'Master'),
    )
    level = models.CharField(max_length=1, choices=EDUCATION_LEVEL, blank=True)
    skills = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True)
    address1 = models.CharField(max_length=200, blank=True)
    address2 = models.CharField(max_length=200, blank=True)
    state = models.CharField(max_length=50, blank=True)
    zipcode = models.CharField(max_length=20, blank=True)

    company_name = models.CharField(max_length=50, blank=True)
    sector = models.CharField(max_length=50, blank=True)

    is_company = models.BooleanField(default=False)

    is_profile_completed = models.BooleanField(default=False)
    reset_password_token = models.CharField(max_length=255, blank=True)

    created_at = models.DateField(auto_now=False, auto_now_add=True)
    is_active = models.BooleanField(default=True)

    objects = UserManager()
    USERNAME_FIELD = 'email'


class Education(models.Model):
    university = models.CharField(max_length=100)
    cert = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    description = models.TextField(null=True, blank=True)


class Employment(models.Model):
    candidate = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.CharField(max_length=50)
    company = models.CharField(max_length=50)
    achievement = models.CharField(max_length=500, blank=True)
    enter_date = models.CharField(max_length=20)
    end_date = models.CharField(max_length=20, blank=True)
    is_current_work = models.BooleanField(default=False)


class IntroductionVideo(models.Model):
    candidate = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.FileField(upload_to='videos', blank=True)
