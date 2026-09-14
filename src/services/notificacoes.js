import Toast from "react-native-toast-message";

const notificacoes = {

    sucesso(mensagem) {
        Toast.show({
            type: "success",
            text1: "Sucesso",
            text2: mensagem,
        });
    },

    erro(mensagem) {
        Toast.show({
            type: "error",
            text1: "Erro",
            text2: mensagem,
        });
    },

    info(mensagem) {
        Toast.show({
            type: "info",
            text1: "Atenção",
            text2: mensagem,
        });
    },
};

export default notificacoes;