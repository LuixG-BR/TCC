from sqlalchemy import Column, Integer, String, Date, Boolean
from database import Base
from pydantic import BaseModel

class Cinta(Base):
    __tablename__ = "cinta"

    idCinta = Column(Integer, primary_key=True, index=True, autoincrement=True)
    numeroSerie = Column(String(100), unique=True, index=True, nullable=False) 
    modelo = Column(String(50), nullable=False)
    statusConexao = Column(Boolean, default=False)                             
    dataAtivacao = Column(Date, nullable=False)
    sensorCardiaco = Column(String(100))                                       
    sensorEDA = Column(String(100)) 

class CintaResponse(BaseModel):
    idCinta: int
    numeroSerie: str
    modelo: str
    statusConexao: bool