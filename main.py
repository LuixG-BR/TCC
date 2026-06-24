from fastapi import FastAPI

from database import Base, engine

import models
from routers import usuario
from routers import paciente


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="EMPS API"
)

app.include_router(usuario.router)
app.include_router(paciente.router)

@app.get("/")
def Home():
    return {
        "Mensagem": "API medicos e pacientes",
        "Status": "Online"
    }

