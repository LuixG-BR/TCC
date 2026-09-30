from pydantic import BaseModel


class MedicamentoCreate(BaseModel):

    id_paciente: int
    nome: str
    dosagem: str
    frequencia: str | None = None
    horario: str | None = None
    observacao: str | None = None


class MedicamentoUpdate(BaseModel):

    nome: str | None = None
    dosagem: str | None = None
    frequencia: str | None = None
    horario: str | None = None
    observacao: str | None = None


class MedicamentoStatusUpdate(BaseModel):

    status: bool


class MedicamentoResponse(BaseModel):

    id_medicamento: int
    id_paciente: int
    nome: str
    dosagem: str
    frequencia: str | None
    horario: str | None
    observacao: str | None
    status: bool

    class Config:
        from_attributes = True