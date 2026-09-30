from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from models.medicamento import Medicamento
from models.paciente import Paciente

from schemas.medicamento import (
    MedicamentoCreate,
    MedicamentoUpdate
)


def criar_medicamento(
    db: Session,
    dados: MedicamentoCreate
):

    paciente = (
        db.query(Paciente)
        .filter(
            Paciente.id_paciente == dados.id_paciente
        )
        .first()
    )

    if not paciente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Paciente não encontrado."
        )

    medicamento = Medicamento(
        id_paciente=dados.id_paciente,
        nome=dados.nome,
        dosagem=dados.dosagem,
        frequencia=dados.frequencia,
        horario=dados.horario,
        observacao=dados.observacao,
        status=True
    )

    db.add(medicamento)
    db.commit()
    db.refresh(medicamento)

    return medicamento


def listar_medicamentos_paciente(
    db: Session,
    id_paciente: int
):

    paciente = (
        db.query(Paciente)
        .filter(
            Paciente.id_paciente == id_paciente
        )
        .first()
    )

    if not paciente:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Paciente não encontrado."
        )

    return (
        db.query(Medicamento)
        .filter(
            Medicamento.id_paciente == id_paciente
        )
        .all()
    )


def buscar_medicamento(
    db: Session,
    id_medicamento: int
):

    medicamento = (
        db.query(Medicamento)
        .filter(
            Medicamento.id_medicamento == id_medicamento
        )
        .first()
    )

    if not medicamento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Medicamento não encontrado."
        )

    return medicamento


def atualizar_medicamento(
    db: Session,
    id_medicamento: int,
    dados: MedicamentoUpdate
):

    medicamento = buscar_medicamento(
        db,
        id_medicamento
    )

    dados_atualizacao = dados.model_dump(
        exclude_unset=True
    )

    for campo, valor in dados_atualizacao.items():
        setattr(
            medicamento,
            campo,
            valor
        )

    db.commit()
    db.refresh(medicamento)

    return medicamento


def atualizar_status_medicamento(
    db: Session,
    id_medicamento: int,
    status_medicamento: bool
):

    medicamento = buscar_medicamento(
        db,
        id_medicamento
    )

    medicamento.status = status_medicamento

    db.commit()
    db.refresh(medicamento)

    return medicamento