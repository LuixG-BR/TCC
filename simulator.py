import serial
import requests
import time

arduino = serial.Serial('COM3', 9600)

time.sleep(2)

while True:

    linha = arduino.readline().decode().strip()

    print("Recebido:", linha)

    try:

        partes = linha.split("|")

        bpm = int(partes[0].split(":")[1])
        movimento = int(partes[1].split(":")[1])

        # ==========================
        # DEFINIR STATUS
        # ==========================

        if bpm >= 150 or movimento >= 700:
            status = "Emergencia"

        elif bpm >= 120 or movimento >= 400:
            status = "Alerta"

        else:
            status = "Normal"

        print(f"Status: {status}")

        # ==========================
        # SALVAR APENAS ALERTAS
        # ==========================

        if status != "Normal":

            dados = {
                "bpm": bpm,
                "movimento": movimento,
                "status": status
            }

            resposta = requests.post(
                "http://127.0.0.1:8000/dados",
                json=dados
            )

            print("SALVO NO BANCO")
            print(resposta.json())

        else:
            print("Dados normais - não armazenados")

    except Exception as erro:
        print("Erro:", erro)