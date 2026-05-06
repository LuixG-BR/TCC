from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import DadoSaude
from simulator import gerar_dados

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {
        "projeto": "EMPS",
        "status": "online"
    }

# dependência do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🔹 rota para gerar e salvar dados
@app.post("/simular")
def simular(db: Session = Depends(get_db)):
    dados = gerar_dados()

    novo = DadoSaude(**dados)
    db.add(novo)
    db.commit()
    db.refresh(novo)

    return novo

# 🔹 listar dados
@app.get("/dados")
def listar(db: Session = Depends(get_db)):
    return db.query(DadoSaude).all()

# 🔹 último dado
@app.get("/dados/ultimo")
def ultimo(db: Session = Depends(get_db)):
    return db.query(DadoSaude).order_by(DadoSaude.id.desc()).first()