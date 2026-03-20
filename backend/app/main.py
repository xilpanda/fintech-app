import logging
import time

from fastapi import Depends, FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from .config import FRONTEND_ORIGINS
from .database import Base, engine, get_db
from .health import check_db_ready
from .logging_config import setup_logging
from .routes import transactions, users

setup_logging()
logger = logging.getLogger(__name__)

app = FastAPI(title="Mini Fintech Wallet", version="1.0.0")

allow_all_origins = FRONTEND_ORIGINS == ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if allow_all_origins else FRONTEND_ORIGINS,
    allow_credentials=not allow_all_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(transactions.router)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    duration_ms = (time.perf_counter() - start) * 1000
    logger.info(
        "%s %s status=%s duration_ms=%.2f",
        request.method,
        request.url.path,
        response.status_code,
        duration_ms,
    )
    return response


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables ensured.")


@app.get("/")
def root() -> dict:
    return {"status": "ok"}


@app.get("/health/live")
def health_live() -> dict:
    return {"status": "alive"}


@app.get("/health/ready")
def health_ready(db: Session = Depends(get_db)):
    if check_db_ready(db):
        return {"status": "ready"}
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={"status": "not_ready"},
    )
