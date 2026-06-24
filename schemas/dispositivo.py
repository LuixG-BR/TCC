from pydantic import BaseModel
from datetime import date


class DispositivoCreate(BaseModel):

    id_paciente: int
    numero_serie: str
    data_ativacao: date | None = None

class DispositivoResponse(BaseModel):
    
    id_dispositivo: int
    id_paciente: int
    numero_serie: str
    data_ativacao: date | None
    status_conexao: bool

    class Config:
        from_attributes = True