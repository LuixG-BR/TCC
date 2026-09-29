import axios from "axios";
import authStorage from "../storage/authStorage";

const api = axios.create({
    baseURL: "https://emps-backend-17ip.onrender.com"
});


api.interceptors.request.use(
    async (config) => {
        const token = await authStorage.buscarToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (erro) => {
        return Promise.reject(erro);
    }
);

api.interceptors.response.use(

    (response) => {
        return response;
    },

    async (error) => {
        const requisicaoOriginal = error.config;

        if (
            error.response?.status === 401 &&
            requisicaoOriginal &&
            !requisicaoOriginal._retry
        ) {

            requisicaoOriginal._retry = true;

            try {
                console.log("Access token expirado. Tentando renovar...");

                const refreshToken = await authStorage.buscarRefreshToken();

                if (!refreshToken) {
                    console.log("Refresh token não encontrado.");

                    await authStorage.limparTokens();

                    return Promise.reject(error);
                }

                const resposta = await axios.post(
                    "https://emps-backend-17ip.onrender.com/login/refresh",
                    {
                        refresh_token: refreshToken
                    }
                );

                const novoAccessToken = resposta.data.access_token;

                if (!novoAccessToken) {
                    throw new Error(
                        "API não retornou novo access token."
                    );
                }

                await authStorage.salvarToken(
                    novoAccessToken
                );

                if (resposta.data.refresh_token) {

                    await authStorage.salvarRefreshToken(
                        resposta.data.refresh_token
                    );
                }

                console.log("Access token renovado com sucesso.");

                requisicaoOriginal.headers = requisicaoOriginal.headers || {};
                requisicaoOriginal.headers.Authorization = `Bearer ${novoAccessToken}`;

                return api(requisicaoOriginal);

            } catch (erroRefresh) {

                console.log(
                    "Não foi possível renovar a sessão:",
                    erroRefresh.response?.data ||
                    erroRefresh.message
                );

                await authStorage.limparTokens();

                return Promise.reject(
                    erroRefresh
                );
            }
        }

        return Promise.reject(error);
    }
);

export default api;