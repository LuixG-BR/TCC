from pydantic import BaseModel
from datetime import date

class MedicoCreate(BaseModel):
    nome: str
    cpf: str
    crm: str
    dataNasc: date
    sexo: str
    telMedico: str
    email: str
    especialidade: str
    senha: str

class MedicoLogin(BaseModel):
    cpf: str
    senha: str