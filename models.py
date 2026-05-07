from pydantic import BaseModel

class Monitoramento(BaseModel):

    bpm: int
    movimento: int
    status: str