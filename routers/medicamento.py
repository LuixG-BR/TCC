from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import conectar

from schemas.medicamento import (
    MedicamentoCreate,
    MedicamentoUpdate,
    MedicamentoStatusUpdate,
    MedicamentoResponse
)

from controllers.medicamento import (
    criar_medicamento,
    listar_medicamentos_paciente,
    buscar_medicamento,
    atualizar_medicamento,
    atualizar_status_medicamento
)
from core.permissions import (administrador_ou_medico, paciente_proprio_ou_admin_medico)


router = APIRouter(
    prefix="/medicamentos",
    tags=["Medicamentos"]
)


@router.post("/", response_model=MedicamentoResponse)
def cadastrar(
    dados: MedicamentoCreate,
    db: Session = Depends(conectar),
    usuario_token=Depends(administrador_ou_medico)
):

    return criar_medicamento(
        db,
        dados
    )


@router.get("/paciente/{id_paciente}", response_model=list[MedicamentoResponse])
def listar_por_paciente(
    id_paciente: int,
    db: Session = Depends(conectar),
    usuario_token=Depends(
        paciente_proprio_ou_admin_medico
    )
):

    return listar_medicamentos_paciente(
        db,
        id_paciente
    )
    

@router.get("/paciente/{id_paciente}/{id_medicamento}", response_model=MedicamentoResponse)
def consultar(
    id_paciente: int,
    id_medicamento: int,
    db: Session = Depends(conectar),
    usuario_token=Depends(
        paciente_proprio_ou_admin_medico
    )
):

    medicamento = buscar_medicamento(
        db,
        id_medicamento
    )

    if medicamento.id_paciente != id_paciente:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=404,
            detail="Medicamento não encontrado para este paciente."
        )

    return medicamento


@router.put("/{id_medicamento}", response_model=MedicamentoResponse)
def editar(
    id_medicamento: int,
    dados: MedicamentoUpdate,
    db: Session = Depends(conectar),
    usuario_token=Depends(administrador_ou_medico)
):
    return atualizar_medicamento(
        db,
        id_medicamento,
        dados
    )


@router.patch("/{id_medicamento}/status", response_model=MedicamentoResponse)
def alterar_status(
    id_medicamento: int,
    dados: MedicamentoStatusUpdate,
    db: Session = Depends(conectar),
    usuario_token=Depends(administrador_ou_medico)
):

    return atualizar_status_medicamento(
        db,
        id_medicamento,
        dados.status
    )