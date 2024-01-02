import requests

from django.conf import settings

ROUTES = {
    'user_info': '/api/users/'
}


class UserApiClient():
    _base_url = ''

    def __init__(self):
        self._base_url = settings.USER_API_BASE_URL

    def get_user_info(self, user_id):
        url = f'{self._base_url}{ROUTES["user_info"]}{user_id}'
        print('call to: ', url)
        res = requests.get(url)
        return res.json()
