from fastapi import APIRouter
from sqlalchemy import text

from database import engine


router = APIRouter(
    prefix="/teste",
    tags=["Teste"]
)


@router.get("/")
def teste_api():

    return {
        "projeto": "EMPS",
        "mensagem": "API funcionando"
    }



@router.get("/database")
def teste_database():

    try:

        with engine.connect() as conn:
            resultado = conn.execute(text("SELECT NOW();")).fetchone()


        return {
            "database": "conectado",
            "hora_servidor": resultado[0]
        }


    except Exception as erro:

        return {
            "database": "erro",
            "detalhes": str(erro)
        }
