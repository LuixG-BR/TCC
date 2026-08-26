import api from "./api";

const usuarioService = {

    async buscarUsuarioLogado() {

        const resposta = await api.get(
            "/usuarios/me"
        );

        return resposta.data;
    }

};

export default usuarioService;