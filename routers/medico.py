from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import conectar
from core.security import verificar_senha, verificar_token
from core.permissions import administrador_ou_medico

from schemas.medico import MedicoCreate
from models.medico import Medico
from models.paciente import Paciente
from models.paciente_medico import PacienteMedico
from models.usuario import Usuario
from controllers.medico import (criar_medico, listar_medicos)


router = APIRouter(

    prefix="/medicos",
    tags=["Médicos"]
)

@router.post("/")
def cadastrar(
    medico: MedicoCreate,
    db: Session = Depends(conectar),
    usuario_token = Depends(administrador_ou_medico)
):
    resultado = criar_medico(db, medico)

    return resultado


@router.get("/")
def listar(
    usuario_token = Depends(administrador_ou_medico),
    db: Session = Depends(conectar)
):
    resultado = listar_medicos(db)
    
    return resultado

@router.put("/{id_medico}")
def editar(
    id_medico: int,
    dados: MedicoCreate,
    db: Session = Depends(conectar),
    
    usuario_token = Depends(administrador_ou_medico)
):
    medico = (db.query(Medico)
    .filter(
        Medico.id_medico == id_medico
    ).first())
    
    if not medico:
        raise HTTPException(
            status_code=404,
            detail="Médico não encontrado"
        )
    
    medico.crm = dados.crm,
    medico.especialidade = dados.especialidade
    
    db.commit()
    db.refresh(medico)
    
    return medico

@router.get("/me/pacientes")
def listar_pacientes_medico(
    db: Session = Depends(conectar),
    usuario_token=Depends(verificar_token)
):
    try:
        id_usuario = int(usuario_token["sub"])
    except (KeyError, TypeError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido."
        )

    medico = (
        db.query(Medico)
        .filter(Medico.id_usuario == id_usuario)
        .first()
    )

    if medico is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuário não possui cadastro médico."
        )

    resultados = (
        db.query(Paciente, Usuario)
        .join(
            PacienteMedico,
            PacienteMedico.id_paciente == Paciente.id_paciente
        )
        .join(
            Usuario,
            Usuario.id_usuario == Paciente.id_usuario
        )
        .filter(
            PacienteMedico.id_medico == medico.id_medico
        )
        .order_by(Usuario.id_usuario.asc())
        .all()
    )

    pacientes = []

    for paciente, usuario in resultados:
        pacientes.append({
            "id_paciente": paciente.id_paciente,
            "id_usuario": usuario.id_usuario,
            "nome": usuario.nome,
            "cpf": paciente.cpf,
            "telefone": usuario.telefone,
            "email": usuario.email,
            "data_nascimento": paciente.data_nascimento,
            "status": usuario.status
        })

    return pacientes