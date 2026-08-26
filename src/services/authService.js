import api from "./api";


const authService = {

    async login(login, senha) {

        const dados = new URLSearchParams();

        dados.append("username", login);
        dados.append("password", senha);

        const resposta = await api.post(
            "/login",
            dados,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        return resposta.data;
    }
};

export default authService;