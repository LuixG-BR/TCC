import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import authService from "../services/authService";
import authStorage from "../storage/authStorage";

import notificacoes from "../services/notificacoes";


export default function TelaLogin({ setTela }) {

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleLogin() {

        if (!login || !senha) {

            notificacoes.info("Preencha login e senha.");

            return;
        }

        try {

            setCarregando(true);

            const resposta = await authService.login(
                login,
                senha
            );

            await authStorage.salvarToken(
                resposta.access_token
            );

            notificacoes.sucesso("Login realizado com sucesso!");

            setTela("inicio");

        } catch (erro) {

            if (erro.response?.status === 401) {

                notificacoes.erro("Login ou senha incorretos.");

            } else {

                notificacoes.erro("Não foi possível realizar o login.");

            }

        } finally {

            setCarregando(false);

        }
    }

    return (
        <View>

            <Text>Login</Text>

            <TextInput
                placeholder="Login"
                value={login}
                onChangeText={setLogin}
                autoCapitalize="none"
                editable={!carregando}
            />

            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                editable={!carregando}
            />

            <TouchableOpacity
                onPress={handleLogin}
                disabled={carregando}
            >
                <Text>
                    {carregando
                        ? "Entrando..."
                        : "Entrar"}
                </Text>
            </TouchableOpacity>

        </View>
    );
}