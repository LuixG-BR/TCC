from sqlalchemy import Column, Integer, Float, String
from database import Base

class DadoSaude(Base):
    __tablename__ = "dados"

    id = Column(Integer, primary_key=True, index=True)
    bpm = Column(Integer)
    spo2 = Column(Integer)
    ax = Column(Float)
    ay = Column(Float)
    az = Column(Float)
    status = Column(String)