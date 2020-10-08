from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from decouple import config
from json import JSONDecodeError
import jwt

from users import models, serializers


class UserSkillView(APIView):
    """User Skill View"""

    @staticmethod
    def get(request, *args, **kwargs):
        token = request.auth.token
        if token is not None:
            try:
                decoded = jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])
                user = models.User.objects.get(id=decoded['user_id'])

                serializer = serializers.UserProfileSerializer(user)

                return Response(serializer.data)
            except jwt.ExpiredSignatureError:
                return Response({"error": "Request timeout. Please start over"},
                                status=status.HTTP_408_REQUEST_TIMEOUT)
            except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError) as e:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Token not found"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
