from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import conectar
from core.security import verificar_token
from core.security import criar_hash

from schemas.usuario import UsuarioCreate, UsuarioResponse, UsuarioMeResponse
from controllers.usuario import (criar_usuario, listar_usuarios)
from models.usuario import Usuario
from models.medico import Medico
from models.paciente import Paciente

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuários"]
)

def somente_administrador(
    usuario_token = Depends(verificar_token)
):

    id_perfil = usuario_token.get("id_perfil")

    if id_perfil != 1:
        raise HTTPException(
            status_code=403,
            detail="Acesso permitido apenas para administradores."
        )

    return usuario_token


@router.post("/")
def cadastrar_usuario(
    usuario: UsuarioCreate,
    db: Session = Depends(conectar),
    usuario_token = Depends(somente_administrador)
):
    resultado = criar_usuario(
        db,
        usuario
    )

    return resultado


@router.get("/")
def buscar_usuarios(
    db: Session = Depends(conectar),
    usuario_token = Depends(somente_administrador)
):
    resultado = listar_usuarios(db)

    return resultado


@router.get("/me")
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

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado."
        )

    resposta = {
        "id_usuario": usuario.id_usuario,
        "nome": usuario.nome,
        "email": usuario.email,
        "telefone": usuario.telefone,
        "perfil": usuario.id_perfil
    }


    if usuario.id_perfil == 1:

        resposta["tipo"] = "administrador"

        resposta["dados"] = {
            "acesso_total": True
        }


    elif usuario.id_perfil == 2:

        medico = (
            db.query(Medico)
            .filter(
                Medico.id_usuario == id_usuario
            )
            .first()
        )
        resposta["tipo"] = "medico"

        if medico:
            resposta["dados"] = {
                "id_medico": medico.id_medico,
                "crm": medico.crm,
                "especialidade": medico.especialidade
            }

        else:
            resposta["dados"] = None


    elif usuario.id_perfil == 3:

        paciente = (
            db.query(Paciente)
            .filter(
                Paciente.id_usuario == id_usuario
            )
            .first()
        )
        resposta["tipo"] = "paciente"

        if paciente:
            resposta["dados"] = {
                "id_paciente": paciente.id_paciente,
                "cpf": paciente.cpf,
                "cns": paciente.cns,
                "data_nascimento": paciente.data_nascimento,
                "sexo": paciente.sexo,
                "contato_emergencia": paciente.contato_emergencia,
                "tipo_sanguineo": paciente.tipo_sanguineo
            }

        else:
            resposta["dados"] = None

    return resposta

@router.put("/{id_usuario}", response_model=UsuarioResponse)
def editar(
    id_usuario: int,
    dados: UsuarioCreate,
    db: Session = Depends(conectar),

    usuario_token = Depends(somente_administrador)
):
    usuario = ( db.query(Usuario)
    .filter(
        Usuario.id_usuario == id_usuario
    ).first())

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado."
        )
    
    usuario.nome = dados.nome
    usuario.email = dados.email
    usuario.senha = criar_hash(dados.senha)
    usuario.telefone = dados.telefone
    usuario.id_perfil = dados.id_perfil
    
    db.commit()
    db.refresh(usuario)

    return usuario
