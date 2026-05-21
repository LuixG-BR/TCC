from pydantic import BaseModel
from datetime import date

class CintaCreate(BaseModel):
    numeroSerie: str
    modelo: str
    statusConexao: bool
    dataAtivacao: date
    sensorCardiaco: str
    sensorEDA: str