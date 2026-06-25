from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

import models
from routers import usuario
from routers import paciente
from routers import medico
from routers import paciente_medico
from routers import dispositivo
from routers import monitoramento


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="EMPS API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuario.router)
app.include_router(paciente.router)
app.include_router(medico.router)
app.include_router(paciente_medico.router)
app.include_router(dispositivo.router)
app.include_router(monitoramento.router)

@app.get("/")
def Home():
    return {
        "Mensagem": "API medicos e pacientes",
        "Status": "Online"
    }

