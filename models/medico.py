from sqlalchemy import Column, Integer, String, Date
from database import Base
from pydantic import BaseModel

class Medico(Base):
    __tablename__ = "medico"

    idMedico = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String)
    cpf = Column(String, unique=True)
    crm = Column(String, unique=True)
    dataNasc = Column(Date)
    sexo = Column(String)
    telMedico = Column(String)
    email = Column(String, unique=True)
    especialidade = Column(String)
    senha = Column(String)
    
class MedicoResponse(BaseModel):
    idMedico: int
    nome: str
    cpf: str
    crm: str
    email: str