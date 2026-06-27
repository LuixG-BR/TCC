from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta


SECRET_KEY = "EMPS_SECRET_KEY_TROCAR_DEPOIS"

ALGORITHM = "HS256"


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def criar_hash(senha):

    return pwd_context.hash(senha)


def verificar_senha(senha_digitada, senha_hash):
    return pwd_context.verify(
        senha_digitada,
        senha_hash
    )


def criar_token(data):

    dados = data.copy()

    expiracao = datetime.utcnow() + timedelta(
        minutes=60
    )

    dados.update(
        {
            "exp": expiracao
        }
    )

    token = jwt.encode(
        dados,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token