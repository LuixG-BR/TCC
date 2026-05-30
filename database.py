from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = (
    "mysql+pymysql://root:pLHqpxJduVjuDNMvWaoHMUuyBjOvBCVi@trolley.proxy.rlwy.net:34277/railway"
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()