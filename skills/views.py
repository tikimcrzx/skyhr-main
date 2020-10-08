from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from decouple import config
from json import JSONDecodeError

from . import models
from . import serializers

import jwt


# Create your views here.
class SkillView(APIView):
    """Skill & SubSkill View"""

    @staticmethod
    def get(request, *args, **kwargs):
        try:
            token = request.auth.token
            jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])
            skills = models.Skill.objects.all()
            sub_skills = models.SubSkill.objects.all()

            if skills.exists() and sub_skills.exists():
                skill_serializer = serializers.SkillSerializer(skills, many=True)
                sub_skill_serializer = serializers.SubSkillSerializer(sub_skills, many=True)
                return Response([skill_serializer.data, sub_skill_serializer.data])
            else:
                return Response([])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Request timeout. Please start over"},
                            status=status.HTTP_408_REQUEST_TIMEOUT)
        except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError) as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)
