from pydantic import BaseModel
from datetime import date

class PacienteCreate(BaseModel):
    nome: str
    cpf: str
    cns: str
    dataNasc: date
    sexo: str
    telPaciente: str
    email: str
    end: str
    status: bool
    senha: str
    
class PacienteLogin(BaseModel):
    cpf: str
    senha: str