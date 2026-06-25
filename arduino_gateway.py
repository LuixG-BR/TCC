import serial
import requests
import time


arduino = serial.Serial(
    'COM8',
    9600
)
time.sleep(2)


API = "https://emps-backend-17ip.onrender.com/monitoramento/"


while True:

    linha = arduino.readline().decode().strip()

    print("Recebido:", linha)

    try:
        partes = linha.split("|")
        bpm = int(partes[0].split(":")[1])
        movimento = int(partes[1].split(":")[1])

        # ANALISE DE RISCO


        if bpm >= 150 and movimento >= 700:
            status = "Emergencia"

        elif bpm >= 120 or movimento >= 400:
            status = "Alerta"

        else:
            status = "Normal"

        print("Status:", status)

        # SALVA SOMENTE SE FOR CRISE

        if status != "Normal":
            dados = {

                "id_paciente": 1,
                "id_dispositivo": 1,
                "bpm": bpm,
                "movimento": movimento,
                "status": status
            }

            resposta = requests.post(
                API,
                json=dados
            )

            print("Resposta API:")
            print(resposta.status_code)
            print(resposta.text)

        else:
            print("Normal - não enviado")


    except Exception as erro:
        print("Erro:", erro)