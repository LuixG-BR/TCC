from fastapi import APIRouter

from database import conectar

from schemas.medico import MedicoCreate

from controllers.medico import (criar_medico, listar_medicos)


router = APIRouter(

    prefix="/medicos",
    tags=["Médicos"]
)

@router.post("/")
def cadastrar(
    medico: MedicoCreate
):
    db = conectar()

    resultado = criar_medico(db, medico)

    db.close()

    return resultado


@router.get("/")
def listar():

    db = conectar()

    resultado = listar_medicos(db)
    
    db.close()
    
    return resultado