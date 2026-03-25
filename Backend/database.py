import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Get URL from Render Environment (Internal Database URL)
DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Fix 'postgres://' for SQLAlchemy compatibility
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# 3. Fallback for local PC (Change 'password' to your local DB password)
if not DATABASE_URL:
    DATABASE_URL = "postgresql://postgres:password@localhost:5432/medisuite_db"

# 4. Create Engine with pool_pre_ping to prevent connection drops on Render
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 5. Dependency used in main.py routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()