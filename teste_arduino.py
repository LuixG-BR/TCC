import requests
import time
import random


url = "http://127.0.0.1:8000/monitoramento/"


while True:

    bpm = random.randint(60,170)
    movimento = random.randint(100,800)

    if bpm >= 120 and movimento >= 400:
        status = "Alerta em BPM | Alerta em Movimento"

    elif bpm >= 120:
        status = "Alerta em BPM"
        
    elif movimento >= 400:
        status += "Alerta em Movimento"

        # status Emergencia
    elif bpm >= 150 and movimento >= 700:
        status = "Emergencia em BPM | Emergencia em Movimento"

    elif bpm >= 150:
        status = "Emergencia em BPM"
        
    elif movimento >= 700:
        status = "Emergencia em Movimento"

    else: 
        status = "Normal"

    dados = {
        "id_paciente":1,
        "id_dispositivo":1,
        "bpm":bpm,
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