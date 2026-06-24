from fastapi import FastAPI

from database import Base, engine

import models
from routers import usuario
from routers import paciente
from routers import medico
from routers import paciente_medico
from routers import dispositivo


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="EMPS API"
)

app.include_router(usuario.router)
app.include_router(paciente.router)
app.include_router(medico.router)
app.include_router(paciente_medico.router)
app.include_router(dispositivo.router)

@app.get("/")
def Home():
    return {
        "Mensagem": "API medicos e pacientes",
        "Status": "Online"
    }

