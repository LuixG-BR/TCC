import psycopg2


def conectar():

    conn = psycopg2.connect(

        host="aws-1-us-east-2.pooler.supabase.com",

        database="postgres",

        user="postgres.dcslujwoygarvxqirsaf",

        password="empstcc@2026",

        port="6543",

        sslmode="require"

    )

    return conn