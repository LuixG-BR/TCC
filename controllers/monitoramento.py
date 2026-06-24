from models.monitoramento import Monitoramento
from schemas.monitoramento import MonitoramentoCreate


def analisar_risco(bpm, movimento):

    if bpm >= 150 and movimento >= 700:
        return "Emergencia"

    elif bpm >= 120 or movimento >= 400:
        return "Alerta"

    else:
        return "Normal"


def registrar_monitoramento(db, dados: MonitoramentoCreate):

    status = analisar_risco(
        dados.frequencia_cardiaca,
        dados.movimento
    )

    # se for normal não salva

    if status == "Normal":

        return {
            "mensagem":"Dados normais",
            "status":status
        }

    novo = Monitoramento(
        id_paciente=dados.id_paciente,
        id_dispositivo=dados.id_dispositivo,
        frequencia_cardiaca=dados.frequencia_cardiaca,
        movimento=dados.movimento,
        status=status
    )

    db.add(novo)
    db.commit()
    db.refresh(novo)

    return novo


def listar_monitoramentos_paciente(db, id_paciente:int):

    return db.query(
        Monitoramento
    ).filter(
        Monitoramento.id_paciente == id_paciente
    ).all()