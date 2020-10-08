from rest_framework import serializers

from . import models


class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.JobCategory
        fields = [
            'id', 'category_name'
        ]
        extra_kwargs = {}

    def create(self, validated_data):
        """
        Create and return a new `JobCategory` instance, given the validated data.
        """
        return models.JobCategory.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `JobCategory` instance, given the validated data.
        """
        instance.category_name = validated_data.get('category_name', instance.category_name)
        instance.save()

        return instance


class JobKindSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.JobKinds
        fields = [
            'id', 'kind_name'
        ]
        extra_kwargs = {}

    def create(self, validated_data):
        """
        Create and return a new `JobKinds` instance, given the validated data.
        """
        return models.JobKinds.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `JobKinds` instance, given the validated data.
        """
        instance.name = validated_data.get('kind_name', instance.kind_name)
        instance.save()

        return instance


class JobSupplementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SupplementalPay
        fields = [
            'id', 'supplement_name'
        ]
        extra_kwargs = {}

    def create(self, validated_data):
        """
        Create and return a new `SupplementalPay` instance, given the validated data.
        """
        return models.SupplementalPay.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `SupplementalPay` instance, given the validated data.
        """
        instance.supplement_name = validated_data.get('supplement_name', instance.supplement_name)
        instance.save()

        return instance


class JobBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Benefits
        fields = [
            'id', 'benefit_name'
        ]
        extra_kwargs = {}

    def create(self, validated_data):
        """
        Create and return a new `Benefits` instance, given the validated data.
        """
        return models.Benefits.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Benefits` instance, given the validated data.
        """
        instance.benefit_name = validated_data.get('benefit_name', instance.benefit_name)
        instance.save()

        return instance


class JobAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Availabilities
        fields = [
            'id', 'availability_name'
        ]
        extra_kwargs = {}

    def create(self, validated_data):
        """
        Create and return a new `Availabilities` instance, given the validated data.
        """
        return models.Availabilities.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Availabilities` instance, given the validated data.
        """
        instance.availability_name = validated_data.get('availability_name', instance.availability_name)
        instance.save()

        return instance


class JobSerializer(serializers.ModelSerializer):
    benefit = JobBenefitSerializer(read_only=True, many=True)
    availability = JobAvailabilitySerializer(read_only=True, many=True)

    class Meta:
        model = models.Jobs
        fields = [
            'company_name', 'company', 'title', 'category', 'street', 'country', 'state', 'zipcode', 'paid_kind',
            'paid_type', 'range_pay_lower', 'range_pay_higher', 'range_pay_starting', 'range_pay_upto', 'kind',
            'range_pay_exact', 'supplement', 'benefit', 'hire_count', 'deadline', 'description', 'availability',
            'receive_method', 'first_email', 'second_email', 'third_email', 'phone', 'status', 'inform_method'
        ]
        extra_kwargs = {
            # 'password': {'required': False, 'write_only': True},
            'range_pay_lower': {'required': False},
            'range_pay_higher': {'required': False},
            'range_pay_starting': {'required': False},
            'range_pay_upto': {'required': False},
            'supplement': {'required': False},
        }
        validators = []

    def create(self, validated_data):
        """
        Create and return a new `Jobs` instance, given the validated data.
        """
        return models.Jobs.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Jobs` instance, given the validated data.
        """
        instance.company_name = validated_data.get('company_name', instance.company_name)
        instance.company_id = validated_data.get('company_id', instance.company_id)
        instance.title = validated_data.get('title', instance.title)
        instance.category = validated_data.get('category', instance.category)
        instance.employer_address = validated_data.get('employer_address', instance.employer_address)
        instance.kind = validated_data.get('kind', instance.kind)
        instance.paid_type = validated_data.get('paid_type', instance.paid_type)
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
