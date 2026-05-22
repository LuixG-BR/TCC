from fastapi import APIRouter
from schemas.cinta import CintaCreate
from models.cinta import Cinta, CintaResponse
from typing import List
from database import SessionLocal

router = APIRouter()

@router.get("/cintas", response_model=List[CintaResponse])
def listar_cintas():
    
    db = SessionLocal()

    cintas = db.query(Cinta).all()

    return cintas

@router.post("/cinta/cadastro")
def cadastro_cinta(cinta: CintaCreate):

    db = SessionLocal()

    novo_cinta = Cinta(
        numeroSerie=cinta.numeroSerie,
        modelo=cinta.modelo,
        statusConexao=cinta.statusConexao,
        dataAtivacao=cinta.dataAtivacao,
        sensorCardiaco=cinta.sensorCardiaco,
        sensorEDA=cinta.sensorEDA
    )

    db.add(novo_cinta)
    db.commit()
    db.refresh(novo_cinta)

    return {
        "mensagem": "Paciente cadastrado",
        "cadastro": True,
        "id": novo_cinta.idCinta
    }

@router.get("/cintas/{id}")
def visualizar_cinta(id: int):

    db = SessionLocal()

    cinta = db.query(Cinta).filter(
        Cinta.idCinta == id
    ).first()

    if not cinta:
        return {
            "mensagem": "Médico não encontrado"
        }

    return cinta

@router.put("/cintas/{id}")
def atualizar_cinta(id: int, cinta: CintaCreate):

    db = SessionLocal()

    cinta_db = db.query(Cinta).filter(
        Cinta.idCinta == id
    ).first()

    if not cinta_db:
        return {
            "mensagem": "Médico não encontrado"
        }

    cinta_db.numeroSerie = cinta.numeroSerie
    cinta_db.modelo = cinta.modelo
    cinta_db.statusConexao = cinta.statusConexao
    cinta_db.dataAtivacao = cinta.dataAtivacao
    cinta_db.sensorCardiaco = cinta.sensorCardiaco
    cinta_db.sensorEDA = cinta.sensorEDA

    db.commit()

    return {
        "mensagem": "Dados atualizados"
    }