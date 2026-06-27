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


@router.get("/me")
def usuario_logado(
    db: Session = Depends(conectar),
    token = Depends(verificar_token)
):
    id_usuario = token["sub"]

    usuario = db.query(Usuario).filter(
        Usuario.id_usuario == id_usuario
    ).first()


    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    resposta = {
        "id_usuario": usuario.id_usuario,
        "nome": usuario.nome,
        "email": usuario.email,
        "perfil": usuario.id_perfil.nome
    }

    if usuario.id_perfil.nome == "Medico":
        
        medico = db.query(Medico).filter(
            Medico.id_usuario == usuario.id_usuario
        ).first()

        resposta["medico"] = {
            "id_medico": medico.id_medico,
            "nome": usuario.nome,
            "crm": medico.crm,
            "especialidade": medico.especialidade,
            "telefone": usuario.telefone,
            "email": usuario.email
        }

    elif usuario.id_perfil.nome == "Paciente":

        paciente = db.query(Paciente).filter(
            Paciente.id_usuario == usuario.id_usuario
        ).first()
        
        resposta["paciente"] = {
            "id_paciente": paciente.id_paciente,
            "cpf": paciente.cpf,
            "tipo_sanguineo": paciente.tipo_sanguineo
        }

    return resposta