# API Médicos e Pacientes

API desenvolvida em Python utilizando FastAPI, SQLAlchemy e SQLite para gerenciamento de médicos e pacientes do projeto TCC.

## Tecnologias Utilizadas

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Uvicorn
- Pydantic
- UV

---

# Funcionalidades Implementadas

## Médicos

- Cadastro de médicos
- Login de médicos
- Listagem de médicos
- Busca de médico por ID
- Atualização de dados

## Pacientes

- Cadastro de pacientes
- Login de pacientes
- Listagem de pacientes
- Busca de paciente por ID
- Atualização de dados
- Exclusão de pacientes

---

# Estrutura do Projeto

```txt
TCC/
│
├── main.py
├── database.py
├── dados.db
│
├── models/
│   ├── medico.py
│   └── paciente.py
│
├── routes/
│   ├── medico.py
│   └── paciente.py
│
├── schemas/
│   ├── medico.py
│   └── paciente.py
│
└── README.md
```

---

# Instalação do Projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/LuixG-BR/TCC.git
```

---

## 2. Entrar na pasta do projeto

```bash
cd TCC
```

---

## 3. Acesse a branch
```bash
git checkout feture/api-medico-paciente
```

---

## 4. Inicializar o projeto com UV

```bash
uv init
```

---

## 5. Instalar dependências

```bash
uv add fastapi
uv add "uvicorn[standard]"
uv add sqlalchemy
uv add pydantic
uv add email-validator
```

---

# Executando o Projeto

Para iniciar a API utilize:

```bash
uv run fastapi dev main.py
```

---

# Acessando a Documentação

Após iniciar o servidor, acesse:

## Swagger UI

```txt
http://127.0.0.1:8000/docs
```

## ReDoc

```txt
http://127.0.0.1:8000/redoc
```

---

# Banco de Dados

O projeto utiliza SQLite como banco de dados local.

O arquivo do banco será criado automaticamente:

```txt
dados.db
```

---

# Rotas da API

## Médicos

| Método | Endpoint | Função |
|---|---|---|
| POST | /medicos/cadastro | Cadastro de médicos |
| POST | /medicos/login | Login de médicos |
| GET | /medicos | Listagem de médicos |
| GET | /medicos/{id} | Buscar médico por ID |
| PUT | /medicos/{id} | Atualizar dados |
---

## Pacientes

| Método | Endpoint | Função |
|---|---|---|
| POST | /pacientes/cadastro | Cadastro de pacientes |
| POST | /pacientes/login | Login de pacientes |
| GET | /pacientes | Listagem de pacientes |
| GET | /pacientes/{id} | Buscar paciente por ID |
| PUT | /pacientes/{id} | Atualizar dados |
| DELETE | /pacientes/{id} | Excluir paciente |

---

# ORM Utilizado

O projeto utiliza SQLAlchemy ORM para:

- Criação das tabelas
- Manipulação dos dados
- Consultas ao banco
- Atualização de registros
- Exclusão de registros

---

# Branch de Desenvolvimento

Esta implementação foi desenvolvida na branch:

```txt
feature/api-medico-paciente
```

---