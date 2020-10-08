from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q

from decouple import config
from django.utils import timezone
from json import JSONDecodeError
import jwt
import datetime
import random
import string
import re
import requests as core_requests

from users import models, serializers
from users import permissions

from google.oauth2 import id_token
from google.auth.transport import requests
from linkedin_v2 import linkedin


class HelloApiView(APIView):
    """Test API View"""

    @staticmethod
    def get(request, *args, **kwargs):
        """Returns a list of APIView features"""

        an_apiview = [
            'Uses HTTP methods as function (get, post, patch, put, delete',
            'Some other features'
        ]

        return Response({"message": "Hello World!", 'an_apiview': an_apiview})


class ActivateAccountView(APIView):
    """Account activation view"""

    @staticmethod
    def post(request, *args, **kwargs):
        token = kwargs.get("token", None)
        if token is not None:
            try:
                decoded = jwt.decode(token.encode(), config('EMAIL_VERIFICATION_SECRET'), leeway=10,
                                     algorithms=['HS256'])
                models.User(
                    email=decoded['email'],
                )

                if request.data.get("password") is None:
                    return Response(
                        {"error": "Password not found in request"},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                if request.data.get("account_type") == "candidate":
                    serializer = serializers.ActivateSerializer(data={
                        "email": decoded['email'],
                        "first_name": request.data.get("first_name"),
                        "mid_name": request.data.get("mid_name"),
                        "last_name": request.data.get("last_name"),
                        "password": request.data.get("password")
                    })
                else:
                    serializer = serializers.CompanyActivateSerializer(data={
                        "email": decoded['email'],
                        "company_name": request.data.get("company_name"),
                        "rfc": request.data.get("rfc"),
                        "password": request.data.get("password")
                    })

                if serializer.is_valid():
                    serializer.save()

                    user = authenticate(email=decoded['email'], password=request.data.get("password"))
                    if user is not None:
                        data = {
                            'email': decoded['email'],
                            'password': request.data.get('password')
                        }
                        token_obtain_pair_obj = TokenObtainPairSerializer()
                        data_access_refresh_token_dict = token_obtain_pair_obj.validate(data)

                        if request.data.get("account_type") == "candidate":
                            data_access_refresh_token_dict.update(
                                {"user": serializers.ActivateSerializer(user).data}
                            )
                        else:
                            data_access_refresh_token_dict.update(
                                {"user": serializers.CompanyActivateSerializer(user).data}
                            )

                        return Response(data_access_refresh_token_dict)
                    else:
                        return Response({"error": "Authentication Failure"},
                                        status=status.HTTP_401_UNAUTHORIZED)
                else:
                    return Response(
                        serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST
                    )

            except jwt.ExpiredSignatureError:
                return Response({"error": "Request timeout. Please start over"},
                                status=status.HTTP_408_REQUEST_TIMEOUT)
            except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError) as e:
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception:
                return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Token not found"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


@api_view(["POST", ])
def post_email_for_reset_password(request):
    email = request.data.get("email", None)
    if email and re.match(r"^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$", email):
        if not get_user_model().objects.filter(email=email).exists():
            return Response({'email': ["User with this email does not exists."]},
                            status=status.HTTP_400_BAD_REQUEST)
        encoded_jwt = jwt.encode(
            {
                'email': email,
                'exp': timezone.now() + datetime.timedelta(minutes=3000)
            },
            config('PASSWORD_RESET_SECRET'),
            algorithm='HS256'
        )

        # send email logic

        mail_subject = 'Activate your account.'
        message = render_to_string('emails/reset_password.html', {
            'frontend_url': config("FRONTEND_URL"),
            'token': encoded_jwt.decode()
        })
        email = EmailMessage(
            mail_subject, message, "no-reply@localhost.com", to=[email]
        )
        email.content_subtype = "html"
        try:
            email.send()
        except Exception:
            return Response({"error": "Email couldn't be sent please try again"},
                            status=status.HTTP_406_NOT_ACCEPTABLE)

        return Response({"message": "Please click on the link sent to your email to reset password"})
    else:
        return Response({"error": "Please enter a valid email"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST", ])
def reset_password(request, **kwargs):
    token = kwargs.get("token", None)
    password = request.data.get("password", None)

    print("Token:  ", token)
    if token is not None:
        if password:
            try:
                validate_password(password)
            except ValidationError as e:
                return Response({"errors": e.error_list}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"errors": "Please enter a password"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            decoded = jwt.decode(token.encode(), config('PASSWORD_RESET_SECRET'), leeway=10, algorithms=['HS256'])
            user = get_user_model().objects.get(email=decoded["email"])

            user.set_password(password)
            user.save()

            return Response({
                "message": "Password reset successful loging with new password",
            })
        except jwt.ExpiredSignatureError:
            return Response({"error": "Link expired"},
                            status=status.HTTP_406_NOT_ACCEPTABLE)
        except Exception:
            return Response({"error": "Link Broken. Please try again"},
                            status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": "Token not found"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class SignUpView(viewsets.ModelViewSet):
    """Handle user signup."""

    serializer_class = serializers.ActivateSerializer
    queryset = models.User.objects.all()
    # default authentication class is mentioned in settings.py file
    authentication_classes = (JWTAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)

    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def create(self, request, *args, **kwargs):
        """Create a new hello message"""

        try:
            serializer = serializers.SignUpSerializer(data=request.data)

            if serializer.is_valid():
                try:
                    if get_user_model().objects.filter(email=serializer.validated_data.get('email')).exists():
                        return Response({'email': ["user with this email already exists."]},
                                        status=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                    return Response({'email': str(e)},
                                    status=status.HTTP_400_BAD_REQUEST)

                encoded_jwt = jwt.encode(
                    {
                        'email': serializer.validated_data.get('email'),
                        'exp': timezone.now() + datetime.timedelta(minutes=10000)
                    },
                    config('EMAIL_VERIFICATION_SECRET'),
                    algorithm='HS256'
                )

                # send email logic
                try:
                    mail_subject = 'Activate your account.'
                    message = render_to_string('emails/confirm_registration.html', {
                        'frontend_url': config("FRONTEND_URL"),
                        'token': encoded_jwt.decode()
                    })
                    email = EmailMessage(
                        mail_subject, message, to=[serializer.validated_data.get('email')]
                    )
                    email.content_subtype = "html"

                    email.send()
                except Exception:
                    return Response({"error": "Email coudn't be sent please try again"},
                                    status=status.HTTP_406_NOT_ACCEPTABLE)

                return Response({"message": "Please click on the link sent to your email to complete the registration"})
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )
        except ConnectionAbortedError:
            return Response({"error": "Server error on sending email with ConnectionAbortedError"},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "Server error on sending email"},
                            status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST", ])
def signin(request):
    try:
        user = authenticate(email=request.data.get("email"), password=request.data.get("password"))
        if user is not None:
            token_obtain_pair_obj = TokenObtainPairSerializer()
            data_access_refresh_token_dict = token_obtain_pair_obj.validate(request.data)
            data_access_refresh_token_dict.update({"user": serializers.UserProfileSerializer(user).data})
            return Response(data_access_refresh_token_dict)
        else:
            return Response({"error": "Authentication Failure"},
                            status=status.HTTP_401_UNAUTHORIZED)
    except Exception:
        return Response(
            {"error": "Internal Server Error. We are extreamly sorry for the inconvenience. We will be back soon."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST", "GET"])
def google_login(request):
    try:
        user_model = get_user_model()
        id_info = id_token.verify_oauth2_token(
            request.data.get("token"),
            requests.Request(),
            config("GOOGLE_CLIENT_ID")
        )
        """
        JSON Response
        {"iss": "accounts.google.com", 
         "azp": "834282223486-gktfpdnk6taup9ureq3rsh3jk86gbeed.apps.googleusercontent.com",
         "aud": "834282223486-gktfpdnk6taup9ureq3rsh3jk86gbeed.apps.googleusercontent.com", 
         "sub": "111898867240311214691", "email": "nirupamdebnath4@gmail.com", "email_verified": true, 
         "at_hash": "w86x9APgkBzhaRvT0LCSeA", "name": "nirupam debnath", 
         "picture": "https://lh3.googleusercontent.com/a-/AOh14GhTvRSiPJSq_McvITrnhFll9SNDL_T2EvIICUAZWw=s96-c", 
         "given_name": "nirupam", "family_name": "debnath", "locale": "en", "iat": 1588447339, 
         "exp": 1588450939, "jti": "80b33121e879004b17180aeb333576947df644fc"}
         """
        if not id_info.get("email_verified"):
            return Response({"error": "Unverified email!"},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            user = user_model.objects.get(email=id_info.get("email"))
            serializer = serializers.UserProfileSerializer(user)
        except user_model.DoesNotExist:
            first_name = ''
            mid_name = ''
            last_name = ''

            if id_info['name'] is not "":
                names = id_info['name'].split(" ")
                if len(names) == 3:
                    first_name = names[0]
                    mid_name = names[1]
                    last_name = names[2]
                elif len(names) == 2:
                    first_name = names[0]
                    last_name = names[1]
                    mid_name = ''
            serializer = serializers.ActivateSerializer(data={
                "email": id_info.get('email'),
                "first_name": first_name,
                "mid_name": mid_name,
                "last_name": last_name,
                "password": ''.join(random.choices(string.ascii_uppercase + string.digits, k=15))
            })

            if serializer.is_valid():
                user = serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            "user": serializer.data
        })
    except Exception:
        return Response({"error": "Google Token error please try again!"},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST", "GET"])
def facebook_login(request):
    try:
        user_model = get_user_model()
        user_id = request.data.get("userID")
        access_token = request.data.get("accessToken")
        # sending get request and saving the response as response object
        # import pdb; pdb.set_trace()
        url = "https://graph.facebook.com/v2.11/{userID}/?fields=id,name,email&access_token={accessToken}".format(
            userID=user_id, accessToken=access_token
        )
        r = core_requests.get(url=url)

        # extracting data in json format
        data = r.json()

        try:
            user = user_model.objects.get(email=data["email"])
            serializer = serializers.ActivateSerializer(user)
        except user_model.DoesNotExist:
            first_name = ''
            mid_name = ''
            last_name = ''

            if data['name'] is not "":
                names = data['name'].split(" ")

                if len(names) == 3:
                    first_name = names[0]
                    mid_name = names[1]
                    last_name = names[2]
                elif len(names) == 2:
                    first_name = names[0]
                    last_name = names[1]
                    mid_name = ""

            serializer = serializers.ActivateSerializer(data={
                "email": data['email'],
                "first_name": first_name,
                "mid_name": mid_name,
                "last_name": last_name,
                "password": ''.join(random.choices(string.ascii_uppercase + string.digits, k=15))
            })

            if serializer.is_valid():
                user = serializer.save()
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            "user": serializer.data
        })
    except Exception:
        return Response({"error": "Google Token error please try again!"},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST", "GET"])
def linkedin_login(request):
    try:
        code = request.data.get("code")
        user_model = get_user_model()

        redirect_uri = config('FRONTEND_LOGIN_URL')
        authentication = linkedin.LinkedInAuthentication(
            config('LINKEDIN_CLIENT_ID'),
            config('LINKEDIN_SECRET_KEY'),
            redirect_uri,
            ['r_liteprofile', 'r_emailaddress']
        )
        authentication.authorization_code = code
        result = authentication.get_access_token()

        application = linkedin.LinkedInApplication(token=result.access_token)
        # profile = application.get_profile()
        # profile = application.get_profile(
        #     selectors=['id', 'first-name', 'last-name', 'maiden-name', 'formatted-name', 'headline', 'location',
        #                'industry', 'summary', 'picture-url', 'picture-urls::(original)', 'public-profile-url',
        #                'num-connections', 'email-address']
        # )
        profile = application.get_profile(
            selectors=['id', 'first-name', 'last-name', 'picture-url', 'email-address']
        )

        data = {
            'q': 'members',
            'projection': '(elements*(handle~))',
            'oauth2_access_token': result.access_token,
        }
        headers = {
            'Content-Type': 'application/json',
            'x-li-format': 'json'
        }
        resp = core_requests.get(config('LINKEDIN_API_URL'), params=data, headers=headers)
        email = resp.json()['elements'][0]['handle~']['emailAddress']

        try:
            user = user_model.objects.get(email=email)
            serializer = serializers.ActivateSerializer(user)
        except user_model.DoesNotExist:
            first_name = ''
            mid_name = ''
            last_name = ''

            if profile['localizedLastName'] is not "":
                last_name = profile['localizedLastName']

            if profile['localizedFirstName'] is not "":
                first_name = profile['localizedFirstName']

            serializer = serializers.ActivateSerializer(data={
                "email": email,
                "first_name": first_name,
                "mid_name": mid_name,
                "last_name": last_name,
                "password": ''.join(random.choices(string.ascii_uppercase + string.digits, k=15))
            })

            if serializer.is_valid():
                user = serializer.save()
            else:
                return Response(
                    serializer.errors,
                    status=status.HTTP_400_BAD_REQUEST
                )

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            "user": serializer.data
        })
    except Exception:
        return Response({"error": "Google Token error please try again!"},
                        status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    """User Profile View"""

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
            except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError):
                return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception:
                return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Token not found"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    @staticmethod
    def post(request, *args, **kwargs):
        try:
            token = request.auth.token
            data = request.data
            decoded = jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])
            user = models.User.objects.get(id=decoded['user_id'])

            try:
                if data['rfc'] is not None and data['is_company'] is not None and data['is_company'] == 'true':
                    existRFC = models.User.objects. \
                        filter(~Q(id=decoded['user_id'])). \
                        filter(rfc=data['rfc']). \
                        filter(is_company=True)

                    if existRFC.exists():
                        return Response(
                            {"error": "Your RFC already exists. please check your inputting RFC"},
                            status=status.HTTP_226_IM_USED
                        )
            except Exception:
                pass

            try:
                if data['rfc'] is not None and data['is_company'] is not None and data['is_company'] == 'false':
                    existRFC = models.User.objects. \
                        filter(~Q(id=decoded['user_id'])). \
                        filter(rfc=data['rfc']). \
                        filter(is_company=False)

                    if existRFC.exists():
                        return Response(
                            {"error": "Your RFC already exists. please check your inputting RFC"},
                            status=status.HTTP_226_IM_USED
                        )
            except Exception:
                pass

            serializer = serializers.UserProfileSerializer(user, data=data)

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


class UserEmploymentView(APIView):
    """User Employment View"""

    @staticmethod
    def get(request, *args, **kwargs):
        try:
            token = request.auth.token
            decoded = jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])
            employment = models.Employment.objects.filter(candidate_id=decoded['user_id'])

            if employment.exists():
                serializer = serializers.EmploymentSerializer(employment, many=True)
                return Response(serializer.data)
            else:
                return Response([])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Request timeout. Please start over"},
                            status=status.HTTP_408_REQUEST_TIMEOUT)
        except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError):
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def post(request, *args, **kwargs):
        try:
            token = request.auth.token
            data = request.data.copy()
            decoded = jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])

            employment = models.Employment.objects.get(id=data['id'])
            data.__setitem__('candidate', decoded['user_id'])
            serializer = serializers.EmploymentSerializer(employment, data=data)

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
    def put(request, *args, **kwargs):
        try:
            token = request.auth.token
            employment = request.data.copy()
            decoded = jwt.decode(token, config('JWT_SIGN_KEY'), leeway=10, algorithms=['HS256'])

            employment.__setitem__('candidate', decoded['user_id'])
            serializer = serializers.EmploymentSerializer(data=employment)

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
            employment_id = kwargs.get("id", None)
            employment = models.Employment.objects.get(pk=employment_id)
            employment.delete()

            return Response(status=status.HTTP_204_NO_CONTENT)
        except jwt.ExpiredSignatureError:
            return Response({"error": "Request timeout. Please start over"},
                            status=status.HTTP_408_REQUEST_TIMEOUT)
        except (jwt.exceptions.DecodeError, JSONDecodeError, ValueError):
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response({"error": "Some error occured please try again"}, status=status.HTTP_400_BAD_REQUEST)
