from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://hospital_db_nzo8_user:ifq2k90axLxs5Pbzp6aGlFyp0wZqIXvc@dpg-d4i4fnqdbo4c73bq0d90-a.oregon-postgres.render.com/hospital_db_nzo8")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()