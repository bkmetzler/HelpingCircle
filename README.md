# HelpingCircle

A simple demo application connecting volunteers with opportunities.

## Backend

The backend is a FastAPI application located in `backend/app/main.py`.

### Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Frontend

The frontend is a small React application in the `frontend` folder.

### Setup

```bash
cd frontend
npm install
npm start
```

The webpack dev server proxies API requests to the backend running on port 8000.

## Tests

Run backend tests with:

```bash
cd backend
pytest
```
