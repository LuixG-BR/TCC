import requests
import time
import random


url = "http://127.0.0.1:8000/monitoramento/"


while True:

    bpm = random.randint(60,170)
    movimento = random.randint(100,800)

    if bpm >= 150 and movimento >=700:
        status = "Emergencia"

    elif bpm >=120 or movimento >=400:
        status = "Alerta"

    else:
        status = "Normal"

    dados = {
        "id_paciente":1,
        "id_dispositivo":1,
        "frequencia_cardiaca":bpm,
        "movimento":movimento,
        "status":status
    }

    resposta = requests.post(
        url,
        json=dados
    )

    print(dados)
    print(resposta.json())

    time.sleep(5)