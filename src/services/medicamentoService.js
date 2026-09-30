import api from "./api";

const medicamentoService = {

    async listarPorPaciente(idPaciente) {

        const resposta = await api.get(
            `/medicamentos/paciente/${idPaciente}`
        );

        return resposta.data;
    }

};

export default medicamentoService;