from pydantic import BaseModel


class MedicoCreate(BaseModel):

    id_usuario: int
    crm: str
    especialidade: str | None = None


class MedicoResponse(BaseModel):

    id_medico: int
    id_usuario: int
    crm: str
    especialidade: str | None

    class Config:
        from_attributes = True