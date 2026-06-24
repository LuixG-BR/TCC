from models.monitoramento import Monitoramento
from schemas.monitoramento import MonitoramentoCreate


def analisar_risco(bpm, movimento):

    if bpm >= 120 and movimento >= 400:
            status = "Alerta em BPM | Alerta em Movimento"
        
    elif bpm >= 120:
            status = "Alerta em BPM"
                
    elif movimento >= 400:
            status += "Alerta em Movimento"
        
    elif bpm >= 150 and movimento >= 700:
            status = "Emergencia em BPM | Emergencia em Movimento"
        
    elif bpm >= 150:
            status = "Emergencia em BPM"
                
    elif movimento >= 700:
            status = "Emergencia em Movimento"
        
    else: 
            status = "Normal"


def registrar_monitoramento(db, dados: MonitoramentoCreate):

    status = analisar_risco(
        dados.frequencia_cardiaca,
        dados.movimento
    )

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