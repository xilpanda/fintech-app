import os


def _build_database_url() -> str:
    db_host = os.getenv("DB_HOST", "postgres")
    db_port = os.getenv("DB_PORT", "5432")
    db_name = os.getenv("DB_NAME", "fintech")
    db_user = os.getenv("DB_USER", "user")
    db_password = os.getenv("DB_PASSWORD", "password")
    return f"postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"


DATABASE_URL = os.getenv("DATABASE_URL", _build_database_url())
APP_ENV = os.getenv("APP_ENV", "development")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO").upper()
PORT = int(os.getenv("PORT", "8000"))
FRONTEND_ORIGINS = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGINS", "*").split(",")
    if origin.strip()
]
