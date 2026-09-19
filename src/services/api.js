import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authStorage from "../storage/authStorage";

const api = axios.create({
    baseURL: "https://emps-backend-17ip.onrender.com"
});

// Coloca o access token automaticamente nas requisições
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

// Se o access token expirar, tenta renovar automaticamente
api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const requisicaoOriginal = error.config;

        // Verifica se foi erro 401 e se ainda não tentou renovar
        if (
            error.response?.status === 401 &&
            requisicaoOriginal &&
            !requisicaoOriginal._retry
        ) {
            requisicaoOriginal._retry = true;

            try {
                const refreshToken =
                    await AsyncStorage.getItem("refresh_token");

                // Se não existe refresh token, não há como renovar
                if (!refreshToken) {
                    await AsyncStorage.multiRemove([
                        "token",
                        "refresh_token"
                    ]);
                    return Promise.reject(error);
                }

                // IMPORTANTE:
                // usamos axios diretamente e NÃO "api"
                // para evitar o interceptor entrar em loop
                const resposta = await axios.post(
                    "https://emps-backend-17ip.onrender.com/login/refresh",
                    {
                        refresh_token: refreshToken
                    }
                );

                const novoToken = resposta.data.access_token;

                // Salva o novo access token
                await AsyncStorage.setItem(
                    "token",
                    novoToken
                );

                // Atualiza a requisição que havia falhado
                requisicaoOriginal.headers =
                    requisicaoOriginal.headers || {};

                requisicaoOriginal.headers.Authorization =
                    `Bearer ${novoToken}`;

                // Repete a requisição original
                return api(requisicaoOriginal);
            } catch (erroRefresh) {
                console.log(
                    "Sessão expirada. Faça login novamente."
                );

                // O refresh token também expirou/inválido
                await AsyncStorage.multiRemove([
                    "token",
                    "refresh_token"
                ]);
                return Promise.reject(erroRefresh);
            }
        }

        return Promise.reject(error);
    }
);

export default api;