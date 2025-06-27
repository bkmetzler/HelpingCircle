from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_and_list_volunteer():
    response = client.post('/volunteers', json={'id': 1, 'name': 'Alice', 'zipcode': '12345', 'skills': ['cooking']})
    assert response.status_code == 200
    data = response.json()
    assert data['name'] == 'Alice'

    response = client.get('/volunteers')
    assert response.status_code == 200
    volunteers = response.json()
    assert len(volunteers) == 1


def test_donate_opportunity():
    client.post('/opportunities', json={'id': 1, 'name': 'Park Cleanup', 'zipcode': '12345', 'skills': ['cleaning']})
    response = client.post('/donate/opportunity', json={'opportunity_id': 1, 'amount': 50})
    assert response.status_code == 200
    assert response.json()['total'] == 50
