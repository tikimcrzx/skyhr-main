from rest_framework import serializers

from . import models


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Skill
        fields = [
            'id', 'name'
        ]
        extra_kwargs = {}

    def create(self, validated_data):
        """
        Create and return a new `Skill` instance, given the validated data.
        """
        return models.Skill.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Skill` instance, given the validated data.
        """
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        return instance


class SubSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SubSkill
        fields = (
            'id', 'name', 'parent'
        )
        extra_kwargs = {}

    def create(self, validated_data):
        """
        Create and return a new `SubSkill` instance, given the validated data.
        """
        return models.SubSkill.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `SubSkill` instance, given the validated data.
        """
        instance.parent = validated_data.get('parent', instance.parent)
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        return instance
