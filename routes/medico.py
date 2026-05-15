from fastapi import APIRouter
from schemas.medico import MedicoCreate, MedicoLogin

router = APIRouter()

@router.get("/medicos")
def listar_medicos():
    return {"mensagem": "Lista de médicos"}

@router.post("/medicos/cadastro")
def cadastrar_medicos(medico: MedicoCreate):
    return {
        "mensagem":"cadastro medicos",
        "cadastro": True,
        "dados": medico
    }
    
@router.post("/medicos/login")
def login_medicos(medico: MedicoLogin):
    return{
        "mensagem": "login medicos",
        "login": True
    }