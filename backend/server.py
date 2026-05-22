"""
Minimal FastAPI stub for the Christ Church Oak Brook static landing page.

The deployed product is a pure static site served from /app/frontend.
This backend exists only so supervisor's expected `backend` service has
something to run; no real API is needed.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Christ Church Timeline (static)", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health() -> dict:
    return {"status": "ok", "service": "christ-church-timeline"}
