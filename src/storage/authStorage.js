import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@emps:token";
const REFRESH_TOKEN_KEY = "@emps:refresh_token";

const authStorage = {

    async salvarToken(token) {
        await AsyncStorage.setItem(
            TOKEN_KEY,
            token
        );
    },

    async buscarToken() {
        return await AsyncStorage.getItem(
            TOKEN_KEY
        );
    },

    async removerToken() {
        await AsyncStorage.removeItem(
            TOKEN_KEY
        );
    },

    async salvarRefreshToken(refreshToken) {
        await AsyncStorage.setItem(
            REFRESH_TOKEN_KEY,
            refreshToken
        );
    },

    async buscarRefreshToken() {
        return await AsyncStorage.getItem(
            REFRESH_TOKEN_KEY
        );
    },

    async removerRefreshToken() {
        await AsyncStorage.removeItem(
            REFRESH_TOKEN_KEY
        );
    },

    async limparTokens() {
        await AsyncStorage.multiRemove([
            TOKEN_KEY,
            REFRESH_TOKEN_KEY
        ]);
    }
};

export default authStorage;