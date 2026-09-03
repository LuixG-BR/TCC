from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import conectar

from schemas.paciente import PacienteCreate, PacienteResponse
from controllers.paciente import (criar_paciente, listar_pacientes)
from core.security import criar_hash
from core.permissions import administrador_ou_medico


router = APIRouter(
    prefix="/pacientes",
    tags=["Pacientes"]
)

@router.post("/")
def cadastrar(
    paciente: PacienteCreate,
    db: Session = Depends(conectar),
    usuario_token = Depends(administrador_ou_medico)
):
    resultado = criar_paciente(db, paciente)

    return resultado


@router.get("/")
def listar(
    db: Session = Depends(conectar),
    usuario_token = Depends(administrador_ou_medico)

):
    resultado = listar_pacientes(db)

    return resultado

@router.put("/{id_paciente}", response_model=PacienteResponse)
def editar_completo(
    id_paciente: int,
    dados: PacienteCreate,
    db: Session = Depends(conectar),

    usuario_token = Depends(administrador_ou_medico)
):
    