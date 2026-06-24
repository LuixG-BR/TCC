from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Dispositivo(Base):

    __tablename__ = "dispositivo_wearable"


    id_dispositivo = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_paciente = Column(
        Integer,
        ForeignKey(
            "paciente.id_paciente"
        )
    )

    numero_serie = Column(
        String(100),
        unique=True
    )

    data_ativacao = Column(
        Date
    )

    status_conexao = Column(
        Boolean,
        default=False
    )

    paciente = relationship(
        "Paciente"
    )