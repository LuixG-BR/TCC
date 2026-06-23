from database import conectar


conn = conectar()

cursor = conn.cursor()


cursor.execute(
    """
    INSERT INTO leituras_cinta
    (idPaciente, bpm, status)

    VALUES (%s,%s,%s)
    """,

    (1, 85, "Normal")

)


conn.commit()


print("Dados enviados!")


conn.close()