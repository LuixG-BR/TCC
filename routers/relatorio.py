
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import conectar
from controllers.relatorio import gerar_relatorio_paciente
from core.permissions import paciente_proprio_ou_admin_medico

router = APIRouter(
    prefix="/relatorios",
    tags=["Relatórios"]
)


@router.get("/paciente/{id_paciente}")
def buscar_relatorio_paciente(
    id_paciente: int,
    db: Session = Depends(conectar),
    usuario_token = Depends(paciente_proprio_ou_admin_medico)
):
    return gerar_relatorio_paciente(db, id_paciente)
