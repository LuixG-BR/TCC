from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from database import conectar

from schemas.login import LoginSchema
from controllers.login import login_usuario


router = APIRouter(
    prefix="/login",
    tags=["Login"]
)




@router.post("/login")
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