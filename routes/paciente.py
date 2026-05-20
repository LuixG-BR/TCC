from fastapi import APIRouter
from schemas.paciente import PacienteCreate, PacienteLogin
from models.paciente import Paciente, PacienteResponse
from typing import List
from database import SessionLocal

router = APIRouter()

@router.get("/pacientes",response_model=List[PacienteResponse])
def listar_pacientes():
    
    db = SessionLocal()
    
    pacientes = db.query(Paciente).all()
    
    return pacientes

@router.post("/pacientes/cadastro")
def cadastrar_paciente(paciente: PacienteCreate):
    
    db = SessionLocal()
    
    novo_paciente = Paciente(
        nome=paciente.nome,
        cpf=paciente.cpf,
        cns=paciente.cns,
        dataNasc=paciente.dataNasc,
        sexo=paciente.sexo,
        telPaciente=paciente.telPaciente,
        email=paciente.email,
        end=paciente.end,
        senha=paciente.senha
    )
    
    db.add(novo_paciente)
    db.commit()
    db.refresh(novo_paciente)
    
    return {
        "mensagem": "Paciente cadastrado",
        "cadastro": True,
        "id": novo_paciente.idPaciente
    }

@router.post("/pacientes/login")
def login_paciente(paciente: PacienteLogin):

    db = SessionLocal()

    paciente_db = db.query(Paciente).filter(
        Paciente.cpf == paciente.cpf
    ).first()


    if not paciente_db or paciente_db.senha != paciente.senha:
        return {
            "mensagem": "Login ou Senha incorretos",
            "login": False
        }

    return {
        "mensagem": "Login realizado",
        "login": True
    }

@router.get("/pacientes/{id}")
def visualizar_paciente(id: int):

    db = SessionLocal()

    paciente = db.query(Paciente).filter(
        Paciente.idPaciente == id
    ).first()

    if not paciente:
        return {
            "mensagem": "Médico não encontrado"
        }

    return paciente

@router.put("/pacientes/{id}")
def atualizar_paciente(id: int, paciente: PacienteCreate):

    db = SessionLocal()

    paciente_db = db.query(Paciente).filter(
        Paciente.idPaciente == id
    ).first()

    if not paciente_db:
        return {
            "mensagem": "Médico não encontrado"
        }

    paciente_db.nome = paciente.nome
    paciente_db.cpf = paciente.cpf
    paciente_db.cns = paciente.cns
    paciente_db.dataNasc = paciente.dataNasc
    paciente_db.sexo = paciente.sexo
    paciente_db.telPaciente = paciente.telPaciente
    paciente_db.email = paciente.email
    paciente_db.end = paciente.end
    paciente_db.senha = paciente.senha
    paciente_db.status = paciente.status

    db.commit()

    return {
        "mensagem": "Dados atualizados"
    }
    
@router.delete("/pacientes/{id}")
def deletar_paciente(id: int):

    db = SessionLocal()

    paciente = db.query(Paciente).filter(
        Paciente.idPaciente == id
    ).first()

    if not paciente:
        return {
            "mensagem": "Médico não encontrado"
        }

    db.delete(paciente)

    db.commit()

    return {
        "mensagem": "Paciente deletado com sucesso"
    }
    