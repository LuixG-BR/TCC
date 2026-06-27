from pydantic import BaseModel


class UsuarioCreate(BaseModel):

    nome: str
    email: str
    senha: str
    telefone: str | None = None
    id_perfil: int

class UsuarioResponse(BaseModel):

    id_usuario: int
    nome: str
    email: str
    telefone: str | None
    status: bool
    id_perfil: int

    class Config:
        from_attributes = True
    
class UsuarioMeResponse(BaseModel):

    id_usuario: int
    nome: str
    email: str
    perfil: int

    class Config:
        from_attributes = True