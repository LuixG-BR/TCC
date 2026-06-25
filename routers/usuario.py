from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import conectar

from schemas.usuario import UsuarioCreate

from controllers.usuario import (criar_usuario, listar_usuarios)
from core.security import verificar_token


router = APIRouter(
    prefix="/usuarios",
    tags=["Usuários"]
)


@router.post("/")
def cadastrar_usuario(
    usuario: UsuarioCreate
):

    db = conectar()

    resultado = criar_usuario(
        db,
        usuario
    )
    db.close()
    return resultado


@router.get("/")
def buscar_usuarios(
    db: Session = Depends(conectar),
    usuario = Depends(verificar_token)
):
    return listar_usuarios(db)