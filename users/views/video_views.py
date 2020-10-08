from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from decouple import config
from json import JSONDecodeError
import jwt

from users import models, serializers


class UserVideoView(APIView):
    """User Sector View"""

    @staticmethod
    def get(request, *args, **kwargs):
        try:
            token = request.auth.token
            decoded = jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])

            try:
                video = models.IntroductionVideo.objects.get(candidate_id=decoded['user_id'])
                serializer = serializers.UserVideoSerializer(video)
                return Response(serializer.data)
            except models.IntroductionVideo.DoesNotExist:
                return Response([])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Request timeout. Please start over"},
                            status=status.HTTP_408_REQUEST_TIMEOUT)
        except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError):
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def put(request, *args, **kwargs):
        try:
            token = request.auth.token
            data = request.data.copy()
            decoded = jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])

            # 2M file size
            if request.data.get('video').size > 10 * 1024 * 1024:
                return Response({"error": "max_limited_size"}, status=status.HTTP_400_BAD_REQUEST)

            data.__setitem__('candidate', decoded['user_id'])
            serializer = serializers.UserVideoSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

            return Response(serializer.data)
        except jwt.ExpiredSignatureError:
            return Response({"error": "Request timeout. Please start over"},
                            status=status.HTTP_408_REQUEST_TIMEOUT)
        except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError):
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def delete(request, *args, **kwargs):
        try:
            token = request.auth.token
            decoded = jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])
            video = models.IntroductionVideo.objects.get(candidate_id=decoded['user_id'])
            video.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except jwt.ExpiredSignatureError:
            return Response({"error": "Request timeout. Please start over"},
                            status=status.HTTP_408_REQUEST_TIMEOUT)
        except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError):
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)