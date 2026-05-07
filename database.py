import sqlite3

def conectar():

    conn = sqlite3.connect("dados.db")

    return conn