const GRAVIDADE = 9.81;

let movimentos = [];
let batimentos = [];


function calcularMovimento(ax, ay, az) {
    const magnitude = Math.sqrt(
        ax ** 2 +
        ay ** 2 +
        az ** 2
    );

    const movimento = Math.abs(magnitude - GRAVIDADE);
    return Number(movimento.toFixed(2));
}


function adicionarAmostra(bpm, ax, ay, az) {
    const movimento = calcularMovimento(ax, ay, az);

    if (Number.isFinite(bpm) && bpm > 0) {
        batimentos.push(bpm);
    }

    if (Number.isFinite(movimento)) {
        movimentos.push(movimento);
    }

    return { bpm, movimento };
}


function calcularMedias() {
    if (batimentos.length === 0 || movimentos.length === 0) {
        return null;
    }

    const somaBatimentos = batimentos.reduce(
        (soma, valor) => soma + valor, 0
    );
    const somaMovimentos = movimentos.reduce(
        (soma, valor) => soma + valor, 0
    );

    const mediaBatimentos = somaBatimentos / batimentos.length;
    const mediaMovimento = somaMovimentos / movimentos.length;

    return {
        frequencia_cardiaca: Math.round(mediaBatimentos),
        movimento: Number(mediaMovimento.toFixed(2)),
        quantidade_amostras: movimentos.length
    };
}


function limparAmostras() {
    movimentos = [];
    batimentos = [];
}


function finalizarPeriodo() {
    const medias = calcularMedias();

    limparAmostras();

    return medias;
}


const monitoramentoService = {
    calcularMovimento,
    adicionarAmostra,
    calcularMedias,
    finalizarPeriodo,
    limparAmostras
};

export default monitoramentoService;