from sqlalchemy import Column, Integer, ForeignKey

from database import Base


class PacienteMedico(Base):

    __tablename__ = "paciente_medico"


    id_paciente = Column(

        Integer,
        ForeignKey(
            "paciente.id_paciente",
            ondelete="CASCADE"
        ),
        primary_key=True
    )

    id_medico = Column(
        
        Integer,
        ForeignKey(
            "medico.id_medico",
            ondelete="CASCADE"
        ),
        primary_key=True
    )