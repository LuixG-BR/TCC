from sqlalchemy import Column, Integer, String, Date, Boolean
from database import Base
from pydantic import BaseModel

class Paciente(Base):
    __tablename__ = "paciente"
    
    idPaciente = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    cpf = Column(String(11), unique=True, index=True, nullable=False)  
    cns = Column(String(15), unique=True, index=True)                  
    dataNasc = Column(Date, nullable=False)
    sexo = Column(String(1))                                           
    telPaciente = Column(String(15))                                   
    email = Column(String(255), unique=True)                           
    end = Column(String(255))                                          
    status = Column(Boolean, default=True)                             
    senha = Column(String(255)) 
    
class PacienteResponse(BaseModel):
    idPaciente: int
    nome: str
    cpf: str
    cns: str
    email: str