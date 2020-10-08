from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from decouple import config
from json import JSONDecodeError

from . import models
from . import serializers

import jwt


# Create your views here.
class JobCategoryView(APIView):
    """Jobs & Category View"""

    @staticmethod
    def get(request, *args, **kwargs):
        try:
            token = request.auth.token
            jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])
            categories = models.JobCategory.objects.all()

            if categories.exists():
                skill_serializer = serializers.JobCategorySerializer(categories, many=True)
                return Response(skill_serializer.data)
            else:
                return Response([])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Request timeout. Please start over"},
                            status=status.HTTP_408_REQUEST_TIMEOUT)
        except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError) as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)


class JobKindView(APIView):
    """Jobs & Kind View"""

    @staticmethod
    def get(request, *args, **kwargs):
        try:
            token = request.auth.token
            jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])
            kinds = models.JobKinds.objects.all()

            if kinds.exists():
                kind_serializer = serializers.JobKindSerializer(kinds, many=True)
                return Response(kind_serializer.data)
            else:
                return Response([])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Request timeout. Please start over"},
                            status=status.HTTP_408_REQUEST_TIMEOUT)
        except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError) as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)


class JobSupplementView(APIView):
    """Jobs & Supplement View"""

    @staticmethod
    def get(request, *args, **kwargs):
        try:
            token = request.auth.token
            jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])
            supplements = models.SupplementalPay.objects.all()

            if supplements.exists():
                supplement_serializer = serializers.JobSupplementSerializer(supplements, many=True)
                return Response(supplement_serializer.data)
            else:
                return Response([])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Request timeout. Please start over"},
                            status=status.HTTP_408_REQUEST_TIMEOUT)
        except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError) as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)


class JobBenefitView(APIView):
    """Jobs & Benefit View"""

    @staticmethod
    def get(request, *args, **kwargs):
        try:
            token = request.auth.token
            jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])
            benefits = models.Benefits.objects.all()

            if benefits.exists():
                benefit_serializer = serializers.JobBenefitSerializer(benefits, many=True)
                return Response(benefit_serializer.data)
            else:
                return Response([])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Request timeout. Please start over"},
                            status=status.HTTP_408_REQUEST_TIMEOUT)
        except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError) as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)


class JobAvailabilityView(APIView):
    """Jobs & Availabilities View"""

    @staticmethod
    def get(request, *args, **kwargs):
        try:
            token = request.auth.token
            jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])
            availabilities = models.Availabilities.objects.all()

            if availabilities.exists():
                availability_serializer = serializers.JobAvailabilitySerializer(availabilities, many=True)
                return Response(availability_serializer.data)
            else:
                return Response([])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Request timeout. Please start over"},
                            status=status.HTTP_408_REQUEST_TIMEOUT)
        except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError) as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)


class JobView(APIView):
    """Job View"""

    @staticmethod
    def post(request, *args, **kwargs):
        try:
            token = request.auth.token
            data = request.data.copy()
            decoded = jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])

            data.__setitem__('company', decoded['user_id'])

            if data['paid_type'] == 'R':
                data.__setitem__('range_pay_lower', data['start_rate'])
                data.__setitem__('range_pay_higher', data['end_rate'])

            if data['paid_type'] == 'S':
                data.__setitem__('range_pay_starting', data['start_rate'])

            if data['paid_type'] == 'U':
                data.__setitem__('range_pay_upto', data['end_rate'])

            if data['paid_type'] == 'E':
                data.__setitem__('range_pay_exact', data['start_rate'])

            if data['receive_method'] == 'E':
                data.__setitem__('phone', '')

            if data['receive_method'] == 'P':
                data.__setitem__('first_email', '')
                data.__setitem__('second_email', '')
                data.__setitem__('third_email', '')

            serializer = serializers.JobSerializer(data=data)

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
        except Exception as e:
            print(e)
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)
