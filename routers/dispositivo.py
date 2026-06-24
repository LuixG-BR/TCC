from fastapi import APIRouter

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
def cadastrar(dispositivo: DispositivoCreate):

    db = conectar()

    resultado = criar_dispositivo(
        db,
        dispositivo
    )

    db.close()

    return resultado


@router.get("/")
def listar():

    db = conectar()

    resultado = listar_dispositivos(db)

    db.close()

    return resultado