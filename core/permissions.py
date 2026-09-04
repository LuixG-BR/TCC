from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from core.security import verificar_token
from database import conectar
from models.paciente import Paciente

def usuario_autenticado(
    usuario_token = Depends(verificar_token)
):
    return usuario_token


def somente_administrador(
    usuario_token = Depends(verificar_token)
):

    id_perfil = usuario_token.get("perfil")

    if id_perfil != 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso permitido apenas para administradores."
        )

    return usuario_token


def administrador_ou_medico(
    usuario_token = Depends(verificar_token)
):

    id_perfil = usuario_token.get("perfil")

    if id_perfil not in [1, 2]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso permitido apenas para administradores ou médicos."
        )

    return usuario_token

def paciente_proprio_ou_admin_medico(
    id_paciente: int,
    usuario_token = Depends(verificar_token),
    db: Session = Depends(conectar)
):

    id_usuario = int(usuario_token["sub"])
    id_perfil = usuario_token.get("perfil")

    # administrador ou médico
    if id_perfil in [1, 2]:
        return usuario_token

    # paciente
    if id_perfil == 3:

        paciente = (
            db.query(Paciente)
            .filter(Paciente.id_paciente == id_paciente)
            .first()
        )

        if not paciente:
            raise HTTPException(
                status_code=404,
                detail="Paciente não encontrado."
            )

        if paciente.id_usuario != id_usuario:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Você só pode acessar os seus próprios dados."
            )

        return usuario_token

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Acesso não permitido."
    )