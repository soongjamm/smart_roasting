import pytest

from app import app


@pytest.fixture
def client():
    return app.test_client()


def do_post(client, path):
    response = client.post(path)
    return response.status_code, str(response.data)


def test_app(client):
    data = {'image'}
    response = client.post(
        '/predict', content_type='multipart/form-data', data=data)
    # assert str(response.data) == str('exsits')
