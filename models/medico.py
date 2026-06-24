from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Medico(Base):

    __tablename__ = "medico"


    id_medico = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuario.id_usuario"),
        unique=True
    )

    crm = Column(
        String(20),
        nullable=False
    )

    especialidade = Column(
        String(100)
    )

    usuario = relationship(
        "Usuario"
    )