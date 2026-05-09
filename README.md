# API & Simulação — Guia de Inicialização

Este documento tem como objetivo padronizar a execução do ambiente de desenvolvimento da branch, incluindo:

- Inicialização da API
- Configuração do Arduino IDE
- Execução do `main.py`
- Execução do `simulator.py`

---

# Pré-requisitos

Antes de iniciar, verifique se possui instalado:

- Python 3.11+
- Arduino IDE
- Git
- VS Code (recomendado)

---

# Estrutura do Projeto

```bash
projeto/
│
├── venv/
├── dados.db
├── database.py
├── models.py
├── main.py
├── simulator.py
├── requirements.txt
└── README.md
```

---

# 1. Clonar o Projeto

```bash
git clone <https://github.com/LuixG-BR/TCC.git>
```

Entrar na pasta:

```bash
cd TCC
```

---

# 2. Criar Ambiente Virtual (Recomendado)

## Windows

```bash
python -m venv venv
```

Ativar:

```bash
venv\Scripts\activate
```

## Linux / MacOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

# 3. Instalar Dependências

```bash
pip install -r requirements.txt
```

---

# 4. Arquivo requirements.txt

```txt
fastapi
uvicorn
pyserial
pydantic
```

---

# 5. Inicializando o Arduino IDE

## Passos

### 1. Abrir o arquivo `.ino`

Abrir o arquivo localizado na pasta do Arduino do projeto.

### 2. Selecionar a placa

No Arduino IDE:

```text
Ferramentas → Placa
```

Selecionar a placa utilizada no projeto.

Exemplo:

```text
Arduino Uno
```

### 3. Selecionar a porta COM

No Arduino IDE:

```text
Ferramentas → Porta
```

Selecionar a porta correspondente ao Arduino conectado.

Exemplo:

```text
COM10
```

### 4. Fazer Upload

Clique em:

```text
Upload
```

ou utilize:

```text
CTRL + U
```

---

# 6. Executando a API (`main.py`)

Como o `main.py` está na raiz do projeto:

## Método padrão

```bash
python main.py
```

## Alternativa para Windows

```bash
py main.py
```

## Método com Uvicorn

```bash
uvicorn main:app --reload
```

---

# 7. Executando o Simulador (`simulator.py`)

Executar em outro terminal:

```bash
python simulator.py
```

## Alternativa para Windows

```bash
py simulator.py
```

---

# 8. Ordem Recomendada de Inicialização

## 1º

Iniciar o Arduino IDE e conectar a placa.

## 2º

Executar a API:

```bash
uvicorn main:app --reload
```

## 3º

Executar o simulador:

```bash
python simulator.py
```

---

# 9. Problemas Comuns

## Porta COM ocupada

Erro comum:

```bash
PermissionError
```

### Solução

Fechar:

- Monitor Serial do Arduino IDE
- Outros programas utilizando a mesma COM

---

## Python não reconhecido

Erro:

```bash
python is not recognized
```

### Solução

Utilizar:

```bash
py main.py
```

ou adicionar o Python ao PATH.

---

## Erro 404 no navegador

Mensagem:

```json
{"detail":"Not Found"}
```

### Motivo

A rota `/` não foi criada na API.

### Testar documentação automática:

```bash
http://127.0.0.1:8000/docs
```

---

# 10. Encerramento do Ambiente

## API

```bash
CTRL + C
```

## Simulador

```bash
CTRL + C
```

---

# 11. Boas Práticas

- Sempre utilizar ambiente virtual
- Não subir `venv/` para o GitHub
- Validar a porta COM antes de iniciar
- Executar API e simulador em terminais separados
- Fazer commits pequenos e organizados

---

# 12. .gitignore Recomendado

```gitignore
venv/
__pycache__/
*.pyc
```

---

# Observações

- O `simulator.py` é utilizado apenas para testes locais.
- Caso utilize hardware real, o simulador pode ser desativado.
- As portas COM podem variar entre computadores.
