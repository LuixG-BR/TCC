import { BleManager, State } from "react-native-ble-plx";
import { PermissionsAndroid, Platform } from "react-native";
import { decode as decodeBase64 } from "base-64";

import notificacoes from "./notificacoes";

// Instância única do gerenciador BLE
const bleManager = new BleManager();

// Nome anunciado pelo ESP32
const NOME_ESP32 = "EMPS_ESP32";
const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
const CHARACTERISTIC_UUID = "abcd1234-1234-1234-1234-1234567890ab";

/*
|--------------------------------------------------------------------------
| PERMISSÕES
|--------------------------------------------------------------------------
*/

async function solicitarPermissoes() {
    // iOS trata as permissões de forma diferente.
    // Por enquanto nosso foco é Android.
    if (Platform.OS !== "android") {
        return true;
    }

    try {
        // Android 12+
        if (Platform.Version >= 31) {
            const resultado = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            ]);

            const scanPermitido =
                resultado[
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
                ] === PermissionsAndroid.RESULTS.GRANTED;

            const connectPermitido =
                resultado[
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
                ] === PermissionsAndroid.RESULTS.GRANTED;

            return scanPermitido && connectPermitido;
        }

        // Android 11 ou inferior
        const resultado = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        return resultado === PermissionsAndroid.RESULTS.GRANTED;
    } catch (erro) {
        console.log(
            "Erro ao solicitar permissões BLE:",
            erro
        );

        return false;
    }
}


/*
|--------------------------------------------------------------------------
| ESTADO DO BLUETOOTH
|--------------------------------------------------------------------------
*/

async function verificarBluetooth() {
    const estado = await bleManager.state();

    console.log("Estado Bluetooth:", estado);

    return estado === State.PoweredOn;
}


/*
|--------------------------------------------------------------------------
| PROCURAR ESP32
|--------------------------------------------------------------------------
*/

async function procurarCinta() {
    console.log("Solicitando permissões BLE...");

    const permitido = await solicitarPermissoes();

    if (!permitido) {
        throw new Error(
            "Permissões Bluetooth não concedidas."
        );
    }

    console.log("Permissões BLE concedidas.");

    const bluetoothLigado =
        await verificarBluetooth();

    if (!bluetoothLigado) {
        throw new Error(
            "Bluetooth está desligado."
        );
    }

    console.log("Bluetooth ligado.");
    console.log("Iniciando busca por:", NOME_ESP32);

    return new Promise((resolve, reject) => {
        let finalizado = false;

        // Tempo máximo da busca
        const timeout = setTimeout(() => {
            if (finalizado) {
                return;
            }

            finalizado = true;

            bleManager.stopDeviceScan();

            reject(
                new Error(
                    "Cinta EMPS não encontrada."
                )
            );
        }, 15000);

        bleManager.startDeviceScan(
            null,
            null,
            (erro, dispositivo) => {
                if (finalizado) {
                    return;
                }

                if (erro) {
                    finalizado = true;

                    clearTimeout(timeout);

                    bleManager.stopDeviceScan();

                    console.log(
                        "Erro durante scan BLE:",
                        erro
                    );

                    reject(erro);

                    return;
                }

                if (!dispositivo) {
                    return;
                }

                // Útil durante os primeiros testes.
                if (dispositivo.name) {
                    console.log(
                        "BLE encontrado:",
                        dispositivo.name
                    );
                }

                const nome =
                    dispositivo.name ||
                    dispositivo.localName;

                if (nome === NOME_ESP32) {
                    finalizado = true;

                    clearTimeout(timeout);

                    bleManager.stopDeviceScan();

                    console.log(
                        "EMPS_ESP32 encontrado!"
                    );

                    console.log(
                        "ID:",
                        dispositivo.id
                    );

                    resolve(dispositivo);
                }
            }
        );
    });
}


/*
|--------------------------------------------------------------------------
| CONECTAR
|--------------------------------------------------------------------------
*/

async function conectarCinta(dispositivo) {
    if (!dispositivo) {
        throw new Error(
            "Dispositivo BLE inválido."
        );
    }

    console.log(
        "Conectando ao EMPS_ESP32..."
    );

    const conectado =
        await dispositivo.connect();

    console.log(
        "Conexão BLE estabelecida."
    );

    console.log(
        "Descobrindo serviços..."
    );

    await conectado.discoverAllServicesAndCharacteristics();

    console.log(
        "Serviços e características encontrados."
    );

    return conectado;
}

async function desconectarCinta(dispositivo) {
    if (!dispositivo) {
        return;
    }

    try {
        await dispositivo.cancelConnection();

        console.log(
            "Cinta desconectada."
        );
    } catch (erro) {
        console.log(
            "Erro ao desconectar cinta:",
            erro
        );
    }
}

function monitorarDados(dispositivo, aoReceberDados) {

    if (!dispositivo) {
        throw new Error(
            "Dispositivo BLE não conectado."
        );
    }

    console.log(
        "Iniciando monitoramento BLE..."
    );

    const subscription =
        dispositivo.monitorCharacteristicForService(
            SERVICE_UUID,
            CHARACTERISTIC_UUID,

            (erro, characteristic) => {

                if (erro) {
                    console.log(
                        "Erro ao receber dados BLE:",
                        erro
                    );

                    return;
                }

                if (!characteristic?.value) {
                    return;
                }

                try {

                    const mensagem =
                        decodeBase64(
                            characteristic.value
                        );

                    console.log(
                        "Pacote recebido:",
                        mensagem
                    );

                    if (aoReceberDados) {
                        aoReceberDados(mensagem);
                    }
                } catch (erroDecode) {
                    notificacoes.erro("Erro ao decodificar pacote BLE:",erroDecode);
                }
            }
        );

    return subscription;
}

const bleService = {
    solicitarPermissoes,
    verificarBluetooth,
    procurarCinta,
    conectarCinta,
    desconectarCinta,
    monitorarDados
};

export default bleService;