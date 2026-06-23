from sqlalchemy import Column, Integer, String, Date
from database import Base
from pydantic import BaseModel

class Medico(Base):
    __tablename__ = "medico"

    idMedico = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    cpf = Column(String(11), unique=True, index=True, nullable=False)  
    crm = Column(String(20), unique=True, nullable=False)
    dataNasc = Column(Date, nullable=False)
    sexo = Column(String(1))                                           
    telMedico = Column(String(15))                                     
    email = Column(String(255), unique=True, nullable=False)
    especialidade = Column(String(50))
    senha = Column(String(255), nullable=False)  
    
class MedicoResponse(BaseModel):
    idMedico: int
    nome: str
    cpf: str
    crm: str
    email: str