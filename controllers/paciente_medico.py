from models.paciente_medico import PacienteMedico


def vincular_medico(
        db,
        id_paciente: int,
        id_medico: int
):

    relacionamento = PacienteMedico(
        id_paciente=id_paciente,
        id_medico=id_medico
    )

    db.add(relacionamento)
    db.commit()
    db.refresh(relacionamento)
    return relacionamento

def listar_medicos_paciente(db, id_paciente: int
):

    return db.query(
        PacienteMedico
    ).filter(
        PacienteMedico.id_paciente == id_paciente
    ).all()

def listar_pacientes_medico(db, id_medico: int):

    return db.query(
        PacienteMedico
    ).filter(
        PacienteMedico.id_medico == id_medico
    ).all()