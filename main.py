from fastapi import FastAPI

from database import Base, engine

from models.medico import Medico
from models.paciente import Paciente

from routes.medico import router as medico_router
from routes.paciente import router as paciente_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(medico_router)
app.include_router(paciente_router)

@app.get("/")
def Home():
    return {
        "Mensagem": "API medicos e pacientes",
        "Status": "Online"
    }