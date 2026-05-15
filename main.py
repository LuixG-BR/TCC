from fastapi import FastAPI
from routes.medico import router as medico_router

app = FastAPI()

@app.get("/")
def Home():
    return {
        "Mensagem": "API medicos e pacientes",
        "Status": "Online"
    }
    
app.include_router(medico_router)