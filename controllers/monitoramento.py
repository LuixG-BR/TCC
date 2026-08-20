from models.monitoramento import Monitoramento
from schemas.monitoramento import MonitoramentoCreate


# LIMITES EXPERIMENTAIS DO MPU6050

LIMITE_MOVIMENTO_ALERTA = 3.0
LIMITE_MOVIMENTO_INTENSO = 7.0
LIMITE_MOVIMENTO_MUITO_INTENSO = 10.0


def analisar_risco(bpm, movimento):

    if bpm >= 150 and movimento >= 10:
        return "Emergencia em BPM | Emergencia em Movimento"

    elif bpm >= 150:
        return "Emergencia em BPM"

    elif movimento >= 10:
        return "Emergencia em Movimento"

    elif movimento >= LIMITE_MOVIMENTO_INTENSO:
        return "Movimento Intenso"

    elif bpm >= 120 and movimento >= LIMITE_MOVIMENTO_ALERTA:
        return "Alerta em BPM | Alerta em Movimento"

    elif bpm >= 120:
        return "Alerta em BPM"

    elif movimento >= LIMITE_MOVIMENTO_ALERTA:
        return "Alerta em Movimento"


    else:
        return "Normal"



def registrar_monitoramento(
    db,
    dados: MonitoramentoCreate
):

    status = analisar_risco(
        dados.frequencia_cardiaca,
        dados.movimento
    )

    print(
        "Análise:",
        "BPM =", dados.frequencia_cardiaca,
        "| Movimento =", dados.movimento,
        "| Status =", status
    )

    if status == "Normal":
        return {
            "mensagem": "Dados normais",
            "status": status
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


def listar_monitoramentos_paciente(
    db,
    id_paciente: int
):

    return db.query(
        Monitoramento
    ).filter(
        Monitoramento.id_paciente == id_paciente
    ).all()