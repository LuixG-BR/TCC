from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Medicamento(Base):

    __tablename__ = "medicamento"

    id_medicamento = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_paciente = Column(
        Integer,
        ForeignKey("paciente.id_paciente"),
        nullable=False
    )

    nome = Column(
        String(100),
        nullable=False
    )

    dosagem = Column(
        String(50),
        nullable=False
    )

    frequencia = Column(
        String(50)
    )

    horario = Column(
        String(100)
    )

    observacao = Column(
        String(255)
    )

    status = Column(
        Boolean,
        default=True,
        nullable=False
    )

    paciente = relationship(
        "Paciente"
    )