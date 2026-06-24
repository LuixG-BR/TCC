from pydantic import BaseModel
from datetime import date


class PacienteCreate(BaseModel):

    id_usuario: int
    cpf: str | None = None
    cns: str | None = None
    data_nascimento: date | None = None
    sexo: str | None = None
    endereco: str | None = None
    contato_emergencia: str | None = None
    tipo_sanguineo: str | None = None



class PacienteResponse(BaseModel):

    id_paciente: int
    id_usuario: int
    cpf: str | None
    cns: str | None

    class Config:
        from_attributes = True