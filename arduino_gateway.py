import requests


# ============================================================
# CONFIGURAÇÃO
# ============================================================

API = "https://emps-backend-17ip.onrender.com/monitoramento/"

# Abaixo disso, consideramos movimento normal
# e não enviamos para a API.
LIMITE_MOVIMENTO = 3.0


# ============================================================
# PROCESSA UMA LINHA RECEBIDA DO ESP32
# ============================================================
def processar_linha(linha):

    try:

        # Remove espaços e quebras de linha
        linha = linha.strip()

        # Ignora linhas vazias
        if not linha:
            return

        # ====================================================
        # FORMATO ESPERADO
        #
        # BPM:130|MOVIMENTO:6.66
        # ====================================================

        partes = linha.split("|")


        if len(partes) != 2:

            print(
                "Formato invalido:",
                linha
            )

            return


        # ====================================================
        # BPM
        # ====================================================

        bpm = int(
            partes[0].split(":")[1]
        )


        # ====================================================
        # MOVIMENTO
        # ====================================================

        movimento = float(
            partes[1].split(":")[1]
        )


        print()
        print("--------------------------------")
        print("Dados recebidos do ESP32")
        print("BPM:", bpm)
        print(
            "Movimento:",
            movimento,
            "m/s²"
        )
        print("--------------------------------")


        # ====================================================
        # FILTRO DO GATEWAY
        # ====================================================
        #
        # O Gateway NÃO define:
        #
        # Normal
        # Alerta
        # Emergência
        #
        # Ele apenas decide se o evento deve ser
        # encaminhado para a API.
        # ====================================================

        if movimento < LIMITE_MOVIMENTO:

            print(
                "Movimento abaixo do limite."
            )

            print(
                "Dados nao enviados."
            )

            return


        # ====================================================
        # EVENTO RELEVANTE
        # ====================================================

        print(
            "Movimento relevante."
        )

        print(
            "Enviando dados para API..."
        )


        # ====================================================
        # DADOS ENVIADOS PARA FASTAPI
        # ====================================================

        dados = {

            "id_paciente": 1,

            "id_dispositivo": 1,

            "frequencia_cardiaca": bpm,

            "movimento": movimento,

            # Temporário porque o schema atual
            # ainda exige esse campo.
            #
            # O Controller deve recalcular o status.
            "status": "Pendente"
        }


        # ====================================================
        # POST
        # ====================================================

        resposta = requests.post(

            API,

            json=dados,

            timeout=10
        )


        print(
            "Status da API:",
            resposta.status_code
        )


        print(
            "Resposta:",
            resposta.text
        )


    # ========================================================
    # ERROS
    # ========================================================

    except ValueError:

        print(
            "Erro: BPM ou movimento possui valor invalido."
        )


    except requests.RequestException as erro:

        print(
            "Erro ao comunicar com a API:"
        )

        print(erro)


    except Exception as erro:

        print(
            "Erro inesperado:"
        )

        print(erro)


# ============================================================
# PROGRAMA PRINCIPAL
# ============================================================

print()
print("========================================")
print("        EMPS - ARDUINO GATEWAY")
print("========================================")
print(
    "Limite de transmissao:",
    LIMITE_MOVIMENTO,
    "m/s²"
)
print("Aguardando dados do ESP32...")
print()


while True:

    try:

        linha = input()

        processar_linha(linha)


    except KeyboardInterrupt:

        print()
        print("Gateway encerrado.")

        break