from sqlalchemy.orm import Session

from models.usuario import Usuario
from schemas.usuario import UsuarioCreate


def criar_usuario(
        db: Session,
        usuario: UsuarioCreate
):

    novo_usuario = Usuario(

        nome=usuario.nome,
        email=usuario.email,
        senha=usuario.senha,
        telefone=usuario.telefone,
        id_perfil=usuario.id_perfil
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario

def listar_usuarios(db: Session):

    return db.query(Usuario).all()