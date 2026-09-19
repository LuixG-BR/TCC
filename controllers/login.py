from fastapi import HTTPException

from core.security import verificar_senha, criar_token, criar_refresh_token
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

    dados_token = {
        "sub": str(usuario.id_usuario),
        "email": usuario.email,
        "perfil": usuario.id_perfil
    }     

    access_token = criar_token(dados_token)
    refresh_token = criar_refresh_token(dados_token)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "usuario": {
            "id": usuario.id_usuario,
            "nome": usuario.nome,
            "email": usuario.email,
            "id_perfil": usuario.id_perfil
        }
}