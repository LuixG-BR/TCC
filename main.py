from fastapi import FastAPI

from database import engine
from models.medico import Medico

from routes.medico import router as medico_router

app = FastAPI()

Base = Medico.metadata

Base.create_all(bind=engine)

app.include_router(medico_router) 

@app.get("/")
def Home():
    return {
        "Mensagem": "API medicos e pacientes",
        "Status": "Online"
    }