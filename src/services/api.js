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

export default api;