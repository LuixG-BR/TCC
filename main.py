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

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bpm INTEGER,
    movimento INTEGER,
    status TEXT
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
    
@app.get("/ocorrencias")
def listar_ocorrencias():

    conn = conectar()

    cursor = conn.cursor()

    cursor.execute("""
    SELECT * FROM monitoramento
    """)

    dados = cursor.fetchall()

    conn.close()

    return dados

# ==========================
# RECEBER DADOS
# ==========================

@app.post("/dados")
def receber_dados(dados: Monitoramento):

    conn = conectar()

    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO monitoramento (
        bpm,
        movimento,
        status
    )

    VALUES (?, ?, ?)
    """, (
        dados.bpm,
        dados.movimento,
        dados.status
    ))

    conn.commit()

    conn.close()

    return {
        "mensagem": "Dados salvos"
    }