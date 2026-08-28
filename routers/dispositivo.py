from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import conectar

from schemas.dispositivo import DispositivoCreate

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
    db: Session = Depends(conectar)
):
    resultado = criar_dispositivo(db, dispositivo)

    return resultado


@router.get("/")
def listar(
    db: Session = Depends(conectar)
):
    resultado = listar_dispositivos(db)

    return resultado