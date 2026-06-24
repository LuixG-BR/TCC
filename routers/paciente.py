from fastapi import APIRouter

from database import conectar

from schemas.paciente import PacienteCreate, PacienteResponse
from controllers.paciente import (criar_paciente, listar_pacientes)


router = APIRouter(
    prefix="/pacientes",
    tags=["Pacientes"]
)

@router.post("/")
def cadastrar(paciente: PacienteCreate):
    db = conectar()

    resultado = criar_paciente(db, paciente)
    db.close()
    return resultado


@router.get("/")
def listar():

    db = conectar()
    resultado = listar_pacientes(db)
    db.close()

    return resultado