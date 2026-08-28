from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import conectar

from schemas.medico import MedicoCreate

from controllers.medico import (criar_medico, listar_medicos)


router = APIRouter(

    prefix="/medicos",
    tags=["Médicos"]
)

@router.post("/")
def cadastrar(
    medico: MedicoCreate,
    db: Session = Depends(conectar)
):
    resultado = criar_medico(db, medico)

    return resultado


@router.get("/")
def listar(
    db: Session = Depends(conectar)
):
    resultado = listar_medicos(db)
    
    return resultado