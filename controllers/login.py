from fastapi import HTTPException

from core.security import verificar_senha, criar_token
from models.usuario import Usuario


def login_usuario(email, senha, db):

    usuario = db.query(Usuario).filter(
        Usuario.email == email
    ).first()

    if not usuario:
        raise HTTPException(
        status_code=401,
        detail="Email ou senha inválidos."
    )

    senha_valida = verificar_senha(
        senha,
        usuario.senha
    )

    if not senha_valida:
        raise HTTPException(
        status_code=401,
        detail="Email ou senha inválidos."
    )

    token = criar_token(
        {
            "sub": str(usuario.id_usuario),
            "email": usuario.email,
            "perfil": usuario.id_perfil
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "usuario": {
            "id": usuario.id_usuario,
            "nome": usuario.nome,
            "email": usuario.email,
            "id_perfil": usuario.id_perfil
        }
    }