from sqlalchemy import Column, Integer, String, Date, Boolean
from database import Base

class Cinta(Base):
    __tablename__ = "cinta"

    idCinta = Column(Integer, primary_key=True, index=True, autoincrement=True)
    numeroSerie = Column(String, unique=True)
    modelo = Column(String)
    statusConexao = Column(Boolean)
    dataAtivacao = Column(Date)
    sensorCardiaco = Column(String)
    sensorEDA = Column(String)

