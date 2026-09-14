import React, { useEffect, useState } from "react";

import authStorage from "../storage/authStorage";

import TelaLogin from "../telas/TelaLogin";
import TelaInicio from "../telas/TelaInicio";
import TelaPerfil from "../telas/TelaPerfil";
import TelaMedicacoes from "../telas/TelaMedicacoes";
import TelaAnalises from "../telas/TelaAnalises";
import TelaCintaCardiaca from "../telas/TelaCintaCardiaca";
import TelaRegistrarCrise from "../telas/TelaRegistrarCrise";

export default function AppNavigator() {
  const [tela, setTela] = useState(null);

  useEffect(() => {

    async function verificarLogin() {

        const token = await authStorage.buscarToken();

        if (token) {
            setTela("inicio");
        } else {
            setTela("login");
        }

    }

    verificarLogin();

}, []);

  switch (tela) {
    case "login":
    return (
        <TelaLogin
            setTela={setTela}
        />
    );

    case "inicio":
      return (
        <TelaInicio
          tela={tela}
          setTela={setTela}
        />
      );

    case "perfil":
      return (
        <TelaPerfil
          tela={tela}
          setTela={setTela}
        />
      );

    case "medicacoes":
      return (
        <TelaMedicacoes
          tela={tela}
          setTela={setTela}
        />
      );

    case "analises":
      return (
        <TelaAnalises
          tela={tela}
          setTela={setTela}
        />
      );

    case "cinta":
      return (
        <TelaCintaCardiaca
          tela={tela}
          setTela={setTela}
        />
      );

    case "registrarCrise":
      return (
        <TelaRegistrarCrise
          tela={tela}
          setTela={setTela}
        />
      );

    default:
      return (
        <TelaInicio
          tela="inicio"
          setTela={setTela}
        />
      );
  }
}