from fastapi import FastAPI
from models import Monitoramento
from database import conectar


app = FastAPI()


# ==========================
# CRIAR TABELA
# ==========================

conn = conectar()

cursor = conn.cursor()


cursor.execute("""
CREATE TABLE IF NOT EXISTS monitoramento (

    id SERIAL PRIMARY KEY,

    bpm INTEGER,

    movimento INTEGER,

    status VARCHAR(100),

    data_hora TIMESTAMP DEFAULT NOW()

)
""")


conn.commit()

conn.close()



# ==========================
# ROTAS
# ==========================


@app.get("/")
def home():

    return {
        "projeto": "EMPS",
        "status": "online"
    }



# ==========================
# LISTAR DADOS
# ==========================


@app.get("/ocorrencias")
def listar_ocorrencias():


    conn = conectar()

    cursor = conn.cursor()


    cursor.execute("""
        SELECT *
        FROM monitoramento
        ORDER BY id DESC
    """)


    dados = cursor.fetchall()


    conn.close()


    return dados



# ==========================
# RECEBER DADOS DO ARDUINO
# ==========================


@app.post("/dados")
def receber_dados(dados: Monitoramento):


    conn = conectar()

    cursor = conn.cursor()



    cursor.execute(

    """
    INSERT INTO monitoramento

    (
        bpm,
        movimento,
        status
    )

    VALUES

    (
        %s,
        %s,
        %s
    )

    """,

    (

        dados.bpm,

        dados.movimento,

        dados.status

    )

    )


    conn.commit()


    conn.close()



    return {

        "mensagem": "Dados salvos no Supabase"

    }