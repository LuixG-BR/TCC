from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import conectar
from core.security import verificar_token, verificar_senha
from core.permissions import administrador_ou_medico

from schemas.dispositivo import DispositivoCreate
from models.dispositivo import Dispositivo

from controllers.dispositivo import (
    criar_dispositivo,
    listar_dispositivos
)


router = APIRouter(

    prefix="/dispositivos",
    tags=["Dispositivo Wearable"]
)

@router.post("/")
def cadastrar(
    dispositivo: DispositivoCreate,
    db: Session = Depends(conectar),
    usuario_token = Depends(administrador_ou_medico)
):
    resultado = criar_dispositivo(db, dispositivo)

    return resultado


@router.get("/")
def listar(
    usuario_token = Depends(administrador_ou_medico),
    db: Session = Depends(conectar)
):
    resultado = listar_dispositivos(db)

    return resultado

@router.put("/{id_dispositivo}")
def editar(
    id_dispositivo: int,
    dados: DispositivoCreate,
    db: Session = Depends(conectar),
    
    usuario_token = Depends(administrador_ou_medico)
):
    dispositivo = (db.query(Dispositivo)
    .filter(
        Dispositivo.id_dispositivo == id_dispositivo
    ).first())
    
    if not dispositivo:
        raise HTTPException(
            status_code=404,
            detail="Dispositivo não encontrado."
        )
        
    dispositivo.numero_serie = dados.numero_serie,
    dispositivo.id_paciente = dados.id_paciente,