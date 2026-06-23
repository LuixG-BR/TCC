from sqlalchemy import Column, Integer, String, Text

from database import Base


class PerfilAcesso(Base):

    __tablename__ = "perfil_acesso"


    id_perfil = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nome = Column(
        String(50),
        nullable=False
    )

    descricao = Column(
        Text
    )