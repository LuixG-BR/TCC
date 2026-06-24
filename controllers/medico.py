from models.medico import Medico
from schemas.medico import MedicoCreate


def criar_medico(db, medico: MedicoCreate):

    novo = Medico(
        id_usuario=medico.id_usuario,
        crm=medico.crm,
        especialidade=medico.especialidade
    )
    
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo


def listar_medicos(db):

    return db.query(Medico).all()