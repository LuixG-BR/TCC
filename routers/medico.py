from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import conectar
from core.security import verificar_senha, verificar_token
from core.permissions import administrador_ou_medico

from schemas.medico import MedicoCreate
from models.medico import Medico
from controllers.medico import (criar_medico, listar_medicos)


router = APIRouter(

    prefix="/medicos",
    tags=["Médicos"]
)

@router.post("/")
def cadastrar(
    medico: MedicoCreate,
    db: Session = Depends(conectar),
    usuario_token = Depends(administrador_ou_medico)
):
    resultado = criar_medico(db, medico)

    return resultado


@router.get("/")
def listar(
    usuario_token = Depends(administrador_ou_medico),
    db: Session = Depends(conectar)
):
    resultado = listar_medicos(db)
    
    return resultado

@router.put("/{id_medico}")
def editar(
    id_medico: int,
    dados: MedicoCreate,
    db: Session = Depends(conectar),
    
    usuario_token = Depends(administrador_ou_medico)
):
    medico = (db.query(Medico)
    .filter(
        Medico.id_medico == id_medico
    ).first())
    
    if not medico:
        raise HTTPException(
            status_code=404,
            detail="Médico não encontrado"
        )
    
    medico.crm = dados.crm,
    medico.especialidade = dados.especialidade
    
    db.commit()
    db.refresh(medico)
    
    return medico