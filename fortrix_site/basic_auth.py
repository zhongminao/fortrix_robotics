import base64
import binascii
import hmac

from django.conf import settings
from django.http import HttpResponse


class BasicAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not settings.BASIC_AUTH_ENABLED:
            return self.get_response(request)

        if not settings.BASIC_AUTH_USERNAME or not settings.BASIC_AUTH_PASSWORD:
            return HttpResponse(
                "Basic auth is enabled but credentials are not configured.",
                status=503,
            )

        if self._is_allowed(request):
            return self.get_response(request)

        return self._challenge()

    def _is_allowed(self, request) -> bool:
        try:
            authorization = request.META["HTTP_AUTHORIZATION"]
        except KeyError:
            return False

        scheme, separator, encoded_credentials = authorization.partition(" ")
        if separator != " " or scheme.lower() != "basic":
            return False

        try:
            decoded_credentials = base64.b64decode(
                encoded_credentials,
                validate=True,
            ).decode("utf-8")
        except (binascii.Error, UnicodeDecodeError):
            return False

        username, separator, password = decoded_credentials.partition(":")
        if separator != ":":
            return False

        username_is_valid = hmac.compare_digest(
            username,
            settings.BASIC_AUTH_USERNAME,
        )
        password_is_valid = hmac.compare_digest(
            password,
            settings.BASIC_AUTH_PASSWORD,
        )

        return username_is_valid and password_is_valid

    def _challenge(self):
        realm = settings.BASIC_AUTH_REALM.replace('"', "")
        response = HttpResponse("Authentication required.", status=401)
        response["WWW-Authenticate"] = f'Basic realm="{realm}"'
        return response

