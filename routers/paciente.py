from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import conectar

from models.paciente import Paciente
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
    paciente = (db.query(Paciente)
    .filter(
        Paciente.id_paciente == id_paciente
    ).first())
    
    if not paciente:
        raise HTTPException(
            status_code=404,
            detail="Paciente não encontrado"
        )
        
    paciente.cpf = dados.cpf,
    paciente.cns = dados.cns,
    paciente.data_nascimento = dados.data_nascimento,
    paciente.sexo = dados.sexo,
    paciente.endereco = dados.endereco,
    paciente.contato_emergencia = dados.contato_emergencia,
    paciente.tipo_sanguineo = dados.tipo_sanguineo
    
    db.commit()
    db.refresh(paciente)
    
    return paciente