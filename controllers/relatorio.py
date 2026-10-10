
from collections import Counter
from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from models.monitoramento import Monitoramento


def classificar_status(status):
    texto = (status or "").strip().lower()

    if "emergência" in texto or "emergencia" in texto:
        return "emergencia"

    if "alerta" in texto or "movimento intenso" in texto:
        return "alerta"

    return "outros"


def gerar_relatorio_paciente(db: Session, id_paciente: int):

    agora = datetime.now(timezone.utc).replace(tzinfo=None)
    inicio_30_dias = agora - timedelta(days=30)
    inicio_7_semanas = agora - timedelta(weeks=7)

    registros = (
        db.query(Monitoramento)
        .filter(
            Monitoramento.id_paciente == id_paciente,
            Monitoramento.data_hora >= inicio_7_semanas,
            Monitoramento.data_hora <= agora
        )
        .order_by(Monitoramento.data_hora.asc())
        .all()
    )

    registros_30_dias = [
        r for r in registros
        if r.data_hora >= inicio_30_dias
    ]

    # Distribuição por classificação
    contagem = Counter(
        classificar_status(r.status)
        for r in registros_30_dias
    )

    total = len(registros_30_dias)

    def percentual(quantidade):
        return round(
            (quantidade / total) * 100, 1
        ) if total else 0

    distribuicao = {
        "alerta": percentual(contagem["alerta"]),
        "emergencia": percentual(contagem["emergencia"]),
        "outros": percentual(contagem["outros"])
    }

    # Tendência das últimas 7 semanas
    tendencia = []

    for indice in range(7):
        inicio_semana = (
            inicio_7_semanas + timedelta(weeks=indice)
        )
        fim_semana = inicio_semana + timedelta(weeks=1)

        quantidade = sum(
            1 for r in registros
            if inicio_semana <= r.data_hora < fim_semana
        )

        tendencia.append({
            "semana": indice + 1,
            "quantidade": quantidade
        })

    # Horários dos registros nos últimos 30 dias
    horarios = []

    for hora in range(0, 24, 4):
        quantidade = sum(
            1 for r in registros_30_dias
            if hora <= r.data_hora.hour < hora + 4
        )

        horarios.append({
            "hora": f"{hora:02d}h",
            "quantidade": quantidade
        })

    return {
        "id_paciente": id_paciente,
        "periodo_dias": 30,
        "tendencia_semanal": tendencia,
        "distribuicao": distribuicao,
        "horarios": horarios,
        "resumo": {
            "total_registros": total,
            "media_semanal": round(total / (30 / 7), 1),
            "total_alertas": contagem["alerta"],
            "total_emergencias": contagem["emergencia"],
            "total_outros": contagem["outros"]
        }
    }
