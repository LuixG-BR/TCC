from fastapi import FastAPI

from database import Base, engine

from models.medico import Medico
from models.paciente import Paciente
from models.cinta import Cinta

from routes.medico import router as medico_router
from routes.paciente import router as paciente_router
from routes.cinta import router as cinta_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(medico_router)
app.include_router(paciente_router)
app.include_router(cinta_router)

@app.get("/")
def Home():
    return {
        "Mensagem": "API medicos e pacientes",
        "Status": "Online"
    }