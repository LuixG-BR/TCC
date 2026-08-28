from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import conectar

from schemas.monitoramento import MonitoramentoCreate
from controllers.monitoramento import (
    registrar_monitoramento,
    listar_monitoramentos_paciente
)


router = APIRouter(

    prefix="/monitoramento",
    tags=["Monitoramento"]
)


@router.post("/")
def receber_dados(
    dados: MonitoramentoCreate,
    db: Session = Depends(conectar)
):
    resultado = registrar_monitoramento(db, dados)

    return resultado


@router.get("/paciente/{id_paciente}")
def buscar_historico_paciente(
    id_paciente:int,
    db: Session = Depends(conectar)
):
    resultado = listar_monitoramentos_paciente(db, id_paciente)

    return resultado