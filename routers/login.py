from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session
from jose import jwt, JWTError

from database import conectar

from controllers.login import login_usuario
from schemas.refresh_token import RefreshTokenSchema

from core.security import (
    SECRET_KEY,
    ALGORITHM,
    criar_token
)


router = APIRouter(
    prefix="/login",
    tags=["Login"]
)


@router.post("/")
def login(
    dados: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(conectar)
):

    usuario = login_usuario(
        dados.username,
        dados.password,
        db
    )

    return usuario


@router.post("/refresh")
def renovar_token(
    dados: RefreshTokenSchema
):
    try:

        payload = jwt.decode(
            dados.refresh_token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        if payload.get("tipo") != "refresh":
            raise HTTPException(
                status_code=401,
                detail="Refresh token inválido"
            )

        dados_novo_token = {
            "sub": payload.get("sub"),
            "email": payload.get("email"),
            "perfil": payload.get("perfil")
        }

        novo_access_token = criar_token(
            dados_novo_token
        )

        return {
            "access_token": novo_access_token,
            "token_type": "bearer"
        }

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Refresh token inválido ou expirado"
        )