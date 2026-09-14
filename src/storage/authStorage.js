import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@emps:token";

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
    }

};

export default authStorage;