import serial
import requests
import time

arduino = serial.Serial('COM10', 9600)

time.sleep(2)

while True:

    linha = arduino.readline().decode().strip()

    print("Recebido:", linha)

    try:

        partes = linha.split("|")

        bpm = int(partes[0].split(":")[1])
        movimento = int(partes[1].split(":")[1])


        # DEFINIR STATUS

        # status Normal
        if bpm <= 119 and movimento <= 399:
            status = "Normal"

        # status Alerta
        elif bpm >= 120 and movimento >= 400:
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