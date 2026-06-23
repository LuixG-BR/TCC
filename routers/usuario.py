from fastapi import APIRouter

from database import conectar

from schemas.usuario import UsuarioCreate

from controllers.usuario import (criar_usuario, listar_usuarios)

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
def buscar_usuarios():

    db = conectar()
    resultado = listar_usuarios(db)
    db.close()
    return resultado