from passlib.context import CryptContext
from jose import jwt
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from jose import JWTError

from datetime import datetime, timedelta


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/login"
)

SECRET_KEY = "EMPS_SECRET_KEY"
ALGORITHM = "HS256"
TEMPO_EXPIRACAO = 60


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def criar_hash(senha: str):

    return pwd_context.hash(senha)


def verificar_senha(
    senha_digitada,
    senha_hash
):
    return pwd_context.verify(
        senha_digitada,
        senha_hash
    )


def criar_token(dados: dict):

    dados_token = dados.copy()

    expiracao = datetime.utcnow() + timedelta(
        minutes=TEMPO_EXPIRACAO
    )

    dados_token["exp"] = expiracao

    return jwt.encode(
        dados_token,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def verificar_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )