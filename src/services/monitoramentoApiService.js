import api from "./api";


async function enviarMedia({
    idPaciente,
    idDispositivo,
    frequenciaCardiaca,
    movimento,
}) {
    const payload = {
        id_paciente: idPaciente,
        id_dispositivo: idDispositivo,
        frequencia_cardiaca: Math.round(frequenciaCardiaca),
        movimento: Number(movimento.toFixed(2)),
        status: ""
    };

    console.log("Enviando média para API:", payload);

    try {
        const resposta = await api.post("/monitoramento", payload);

        console.log("Resposta do monitoramento:", resposta.data);

        return resposta.data;

    } catch (erro) {

        console.log(
            "Erro ao enviar média:",
            erro.response?.data ||
            erro.message
        );

        throw erro;
    }
}

const monitoramentoApiService = {
    enviarMedia,
};

export default monitoramentoApiService;