import random

def gerar_dados():
    bpm = random.randint(60, 160)
    spo2 = random.randint(90, 100)

    ax = round(random.uniform(-2, 2), 2)
    ay = round(random.uniform(-2, 2), 2)
    az = round(random.uniform(8, 12), 2)

    status = "Normal"

    if bpm > 140 or spo2 < 92:
        status = "Alerta"

    if bpm > 160:
        status = "Crise"

    return {
        "bpm": bpm,
        "spo2": spo2,
        "ax": ax,
        "ay": ay,
        "az": az,
        "status": status
    }