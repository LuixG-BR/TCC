from sqlalchemy import Column, Integer, String, Date
from database import Base

class Medico(Base):
    _tablename_ = "medico"

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