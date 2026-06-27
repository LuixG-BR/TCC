from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from sqlalchemy.orm import relationship

from database import Base


class Usuario(Base):

    __tablename__ = "usuario"


    id_usuario = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nome = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False
    )

    senha = Column(
        String(255),
        nullable=False
    )

    telefone = Column(
        String(15)
    )

    status = Column(
        Boolean,
        default=True
    )

    id_perfil = Column(
        Integer,
        ForeignKey("perfil_acesso.id_perfil")
    )

    perfil = relationship(
        "PerfilAcesso"
    )