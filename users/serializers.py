from rest_framework import serializers
from .helpers.validators import validate_password
from rest_framework.exceptions import ValidationError

from . import models


class ActivateSerializer(serializers.ModelSerializer):
    """Serializers for user profile objests"""

    class Meta:
        model = models.User
        fields = ('email', 'first_name', 'mid_name', 'last_name', 'password', 'is_company')
        extra_kwargs = {
            'password': {'write_only': True},
            'mid_name': {'required': False, 'allow_blank': True}
        }

    def create(self, validated_data):
        """Create and return a new user"""

        user = models.User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            mid_name=validated_data['mid_name'],
            last_name=validated_data['last_name'],
            is_company=False
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        # print(validated_data)
        if validated_data.get('password'):
            validation_errors = validate_password(validated_data.get('password'))
            if validation_errors:
                raise ValidationError({"password": " ".join(validation_errors)})

            instance.set_password(validated_data.get('password'))

        instance.save()

        return instance


class CompanyActivateSerializer(serializers.ModelSerializer):
    """Serializers for company profile objests"""

    class Meta:
        model = models.User
        fields = ['email', 'company_name', 'rfc', 'password', 'sector', 'is_company']
        extra_kwargs = {
            'password': {'write_only': True},
            'sector': {'required': False},
        }

    def create(self, validated_data):
        """Create and return a new company"""

        user = models.User(
            email=validated_data['email'],
            company_name=validated_data['company_name'],
            rfc=validated_data['rfc'],
            is_company=True
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class SignUpSerializer(serializers.Serializer):
    """Serializer for user signup"""
    email = serializers.EmailField(max_length=50)


class EmploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employment
        fields = (
            'id', 'candidate', 'position', 'company', 'achievement', 'enter_date', 'end_date', 'is_current_work'
        )
        extra_kwargs = {
            'password': {'write_only': True},
            'achievement': {'required': False},
            'end_date': {'required': False},
        }

    def create(self, validated_data):
        """
        Create and return a new `Employment` instance, given the validated data.
        """
        return models.Employment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Employment` instance, given the validated data.
        """
        instance.candidate = validated_data.get('candidate', instance.candidate)
        instance.position = validated_data.get('position', instance.position)
        instance.company = validated_data.get('company', instance.company)
        instance.achievement = validated_data.get('achievement', instance.achievement)
        instance.enter_date = validated_data.get('enter_date', instance.enter_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.is_current_work = validated_data.get('is_current_work', instance.is_current_work)
        instance.save()

        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = [
            'first_name', 'mid_name', 'last_name', 'password', 'email', 'mobile', 'rfc', 'curp', 'birth',
            'country', 'state', 'zipcode', 'address1', 'address2', 'linkedin_profile', 'facebook_profile',
            'twitter_profile', 'photo', 'is_profile_completed', 'password', 'skills', 'company_name',
            'is_company', 'sector'
        ]
        extra_kwargs = {
            'password': {'required': False, 'write_only': True},
            'linkedin_profile': {'required': False},
            'facebook_profile': {'required': False},
            'twitter_profile': {'required': False},
            'address2': {'required': False},
            'birth': {'required': False},
            'skills': {'required': False},
            'company_name': {'required': False},
            'is_company': {'required': False},
            'sector': {'required': False},
        }
        validators = []

    def create(self, validated_data):
        """
        Create and return a new `User` instance, given the validated data.
        """
        return models.User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `User` instance, given the validated data.
        """
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.mid_name = validated_data.get('mid_name', instance.mid_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.mobile = validated_data.get('mobile', instance.mobile)
        instance.rfc = validated_data.get('rfc', instance.rfc)
        instance.curp = validated_data.get('curp', instance.curp)
        instance.birth = validated_data.get('birth', instance.birth)
        instance.country = validated_data.get('country', instance.country)
        instance.state = validated_data.get('state', instance.state)
        instance.zipcode = validated_data.get('zipcode', instance.zipcode)
        instance.address1 = validated_data.get('address1', instance.address1)
        instance.address2 = validated_data.get('address2', instance.address2)
        instance.linkedin_profile = validated_data.get('linkedin_profile', instance.linkedin_profile)
        instance.facebook_profile = validated_data.get('facebook_profile', instance.facebook_profile)
        instance.twitter_profile = validated_data.get('twitter_profile', instance.twitter_profile)
        instance.photo = validated_data.get('photo', instance.photo)
        instance.is_profile_completed = validated_data.get('is_profile_completed', instance.is_profile_completed)
        instance.skills = validated_data.get('skills', instance.skills)
        instance.sector = validated_data.get('sector', instance.sector)
        instance.is_company = validated_data.get('is_company', instance.is_company)
        instance.company_name = validated_data.get('company_name', instance.company_name)
        instance.save()

        return instance


class CompanySectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CompanySector
        fields = [
            'id', 'sector_name'
        ]
        extra_kwargs = {}

    def create(self, validated_data):
        """
        Create and return a new `CompanySector` instance, given the validated data.
        """
        return models.CompanySector.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `CompanySector` instance, given the validated data.
        """
        instance.sector_name = validated_data.get('sector_name', instance.sector_name)
        instance.save()

        return instance


class UserVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.IntroductionVideo
        fields = [
            'id', 'video', 'candidate'
        ]
        extra_kwargs = {}

    def create(self, validated_data):
        """
        Create and return a new `IntroductionVideo` instance, given the validated data.
        """
        return models.IntroductionVideo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `IntroductionVideo` instance, given the validated data.
        """
        instance.candidate = validated_data.get('candidate', instance.candidate)
        instance.video = validated_data.get('video', instance.video)
        instance.save()

        return instance
