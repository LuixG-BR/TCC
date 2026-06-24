from fastapi import APIRouter

from database import conectar

from controllers.paciente_medico import (
    vincular_medico,
    listar_medicos_paciente,
    listar_pacientes_medico
)


router = APIRouter(

    prefix="/relacionamentos",
    tags=["Paciente Médico"]
)


@router.post("/paciente/{id_paciente}/medico/{id_medico}")
def adicionar_medico(
    id_paciente:int,
    id_medico:int
):

    db = conectar()

    resultado = vincular_medico(

        db,
        id_paciente,
        id_medico
    )

    db.close()

    return resultado


@router.get("/paciente/{id_paciente}/medicos")
def buscar_medicos_paciente(id_paciente:int):

    db = conectar()

    resultado = listar_medicos_paciente(

        db,
        id_paciente
    )

    db.close()
    
    return resultado


@router.get("/medico/{id_medico}/pacientes")
def buscar_pacientes_medico(id_medico:int):
    
    db = conectar()

    resultado = listar_pacientes_medico(

        db,
        id_medico
    )
    
    db.close()

    return resultado