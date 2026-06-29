from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import conectar
from core.security import verificar_token

from schemas.usuario import UsuarioCreate, UsuarioMeResponse
from controllers.usuario import (criar_usuario, listar_usuarios)
from models.usuario import Usuario
from models.medico import Medico
from models.paciente import Paciente

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


@router.get("/usuarios/me")
def usuario_logado(
usuario_token = Depends(verificar_token),
db: Session = Depends(conectar)
):
    
    id_usuario = int(usuario_token["sub"])

    usuario = (
        db.query(Usuario)
        .filter(
            Usuario.id_usuario == id_usuario
        )
        .first()
    )

    resposta = {
        "id_usuario": usuario.id_usuario,
        "nome": usuario.nome,
        "email": usuario.email,
        "perfil": usuario.id_perfil
    }

    if usuario.id_perfil == 2:
        medico = (
        db.query(Medico)
        .filter(
            Medico.id_usuario == id_usuario
            ).first()
        )
        
        resposta["crm"] = medico.crm
        resposta["especialidade"] = medico.especialidade

    return resposta