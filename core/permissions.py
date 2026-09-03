from fastapi import Depends, HTTPException, status

from core.security import verificar_token


def usuario_autenticado(
    usuario_token = Depends(verificar_token)
):
    return usuario_token


def somente_administrador(
    usuario_token = Depends(verificar_token)
):

    id_perfil = usuario_token.get("id_perfil")

    if id_perfil != 1:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso permitido apenas para administradores."
        )

    return usuario_token


def administrador_ou_medico(
    usuario_token = Depends(verificar_token)
):

    id_perfil = usuario_token.get("id_perfil")

    if id_perfil not in [1, 2]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso permitido apenas para administradores ou médicos."
        )

    return usuario_token