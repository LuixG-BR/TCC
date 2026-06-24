from models.paciente import Paciente
from schemas.paciente import PacienteCreate


def criar_paciente(db, paciente: PacienteCreate):
    
    novo = Paciente(
        id_usuario=paciente.id_usuario,
        cpf=paciente.cpf,
        cns=paciente.cns,
        data_nascimento=paciente.data_nascimento,
        sexo=paciente.sexo,
        endereco=paciente.endereco,
        contato_emergencia=paciente.contato_emergencia,
        tipo_sanguineo=paciente.tipo_sanguineo
    )
    
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo


def listar_pacientes(db):

    return db.query(Paciente).all()