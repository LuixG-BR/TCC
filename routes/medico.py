from fastapi import APIRouter
from schemas.medico import MedicoCreate, MedicoLogin

router = APIRouter()

@router.get("/medicos")
def listar_medicos():
    return {"mensagem": "Lista de médicos"}

@router.post("/medicos/cadastro")
def cadastrar_medicos(medico: MedicoCreate):
    return {
        "mensagem":"cadastro medicos de Medicos",
        "cadastro": True,
        "dados": medico
    }