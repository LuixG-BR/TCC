from fastapi import APIRouter
from schemas.medico import MedicoCreate, MedicoLogin
from models.medico import Medico, MedicoResponse
from typing import List
from database import SessionLocal

router = APIRouter()

@router.get("/medicos",response_model=List[MedicoResponse])
def listar_medicos():

    db = SessionLocal()

    medicos = db.query(Medico).all()

    return medicos

@router.post("/medicos/cadastro")
def cadastrar_medico(medico: MedicoCreate):

    db = SessionLocal()

    novo_medico = Medico(
        nome=medico.nome,
        cpf=medico.cpf,
        crm=medico.crm,
        dataNasc=medico.dataNasc,
        sexo=medico.sexo,
        telMedico=medico.telMedico,
        email=medico.email,
        especialidade=medico.especialidade,
        senha=medico.senha
    )

    db.add(novo_medico)
    db.commit()
    db.refresh(novo_medico)

    return {
        "mensagem": "Médico cadastrado",
        "cadastro": True,
        "id": novo_medico.idMedico
    }

@router.post("/medicos/login")
def login_medico(medico: MedicoLogin):

    db = SessionLocal()

    medico_db = db.query(Medico).filter(
        Medico.cpf == medico.cpf
    ).first()


    if not medico_db or medico_db.senha != medico.senha:
        return {
            "mensagem": "Login ou Senha incorretos",
            "login": False
        }

    return {
        "mensagem": "Login realizado",
        "login": True
    }
    
@router.get("/medicos/{id}")
def visualizar_medico(id: int):

    db = SessionLocal()

    medico = db.query(Medico).filter(
        Medico.idMedico == id
    ).first()

    if not medico:
        return {
            "mensagem": "Médico não encontrado"
        }

    return medico
    
@router.put("/medicos/{id}")
def atualizar_medico(id: int, medico: MedicoCreate):

    db = SessionLocal()

    medico_db = db.query(Medico).filter(
        Medico.idMedico == id
    ).first()

    if not medico_db:
        return {
            "mensagem": "Médico não encontrado"
        }

    medico_db.nome = medico.nome
    medico_db.cpf = medico.cpf
    medico_db.crm = medico.crm
    medico_db.dataNasc = medico.dataNasc
    medico_db.sexo = medico.sexo
    medico_db.telMedico = medico.telMedico
    medico_db.email = medico.email
    medico_db.especialidade = medico.especialidade
    medico_db.senha = medico.senha

    db.commit()

    return {
        "mensagem": "Dados atualizados"
    }