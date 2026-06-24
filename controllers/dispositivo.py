from models.dispositivo import Dispositivo
from schemas.dispositivo import DispositivoCreate


def criar_dispositivo(

    db,
    dispositivo: DispositivoCreate
):

    novo = Dispositivo(

        id_paciente=dispositivo.id_paciente,
        numero_serie=dispositivo.numero_serie,
        data_ativacao=dispositivo.data_ativacao,
        status_conexao=False
    )

    db.add(novo)
    db.commit()
    db.refresh(novo)
    
    return novo

def listar_dispositivos(db):

    return db.query(
        Dispositivo
    ).all()