from sqlalchemy import Column, Integer, String, Date, Boolean
from database import Base
from pydantic import BaseModel

class Paciente(Base):
    __tablename__ = "paciente"
    
    idPaciente = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String)
    cpf = Column(String, unique=True)
    cns = Column(String, unique=True)
    dataNasc = Column(Date)
    sexo = Column(String)
    telPaciente = Column(String)
    email = Column(String, unique=True)
    end = Column(String)
    status = Column(Boolean)
    senha = Column(String)
    
class PacienteResponse(BaseModel):
    idPaciente: int
    nome: str
    cpf: str
    cns: str
    email: str