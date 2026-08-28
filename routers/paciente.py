from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import conectar

from schemas.paciente import PacienteCreate, PacienteResponse
from controllers.paciente import (criar_paciente, listar_pacientes)


router = APIRouter(
    prefix="/pacientes",
    tags=["Pacientes"]
)

@router.post("/")
def cadastrar(
    paciente: PacienteCreate,
    db: Session = Depends(conectar)
):
    resultado = criar_paciente(db, paciente)

    return resultado


@router.get("/")
def listar(
    db: Session = Depends(conectar)
):
    resultado = listar_pacientes(db)

    return resultado