async function carregarPerfil() {

    const token = localStorage.getItem("token");


    /* =====================================
       VERIFICA SE EXISTE TOKEN
    ====================================== */

    if (!token) {

        window.location.href =
            "login.html";

        return;
    }


    try {

        /* =====================================
           BUSCA USUÁRIO LOGADO
        ====================================== */

        const resposta =
            await fetch(
                `${API}/usuarios/me`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        /* =====================================
           TOKEN INVÁLIDO OU EXPIRADO
        ====================================== */

        if (resposta.status === 401) {

            localStorage.removeItem(
                "token"
            );

            localStorage.removeItem(
                "usuario"
            );

            window.location.href =
                "login.html";

            return;
        }


        /* =====================================
           OUTRO ERRO
        ====================================== */

        if (!resposta.ok) {

            throw new Error(
                `Erro ao buscar perfil: ${resposta.status}`
            );

        }


        /* =====================================
           DADOS DO USUÁRIO
        ====================================== */

        const usuario =
            await resposta.json();

        console.log(
            "Usuário logado:",
            usuario
        );

        const nomesUsuario =
            document.querySelectorAll(".nomeUsuario");

        nomesUsuario.forEach(elemento => {
            elemento.textContent =
                usuario.nome;
        });


        const emailUsuario =
            document.getElementById(
                "emailUsuario"
            );

        if (emailUsuario) {
            emailUsuario.textContent =
                usuario.email;
        }


        const telefoneUsuario =
            document.getElementById(
                "telefoneUsuario"
            );

        if (telefoneUsuario) {
            telefoneUsuario.textContent =
                usuario.telefone;
        }

        const perfilUsuario =
            document.getElementById(
                "perfilUsuario"
            );

        if (perfilUsuario) {
            perfilUsuario.textContent =
                usuario.tipo;
        }


        const idUsuario =
            document.getElementById(
                "idUsuario"
            );

        if (idUsuario) {
            idUsuario.textContent =
                usuario.id_usuario;
        }

        if (usuario.tipo === "medico" && usuario.dados) {

            const crmUsuario =
                document.getElementById(
                    "crmUsuario"
                );

            if (crmUsuario) {
                crmUsuario.textContent =
                    usuario.dados.crm ?? "Não informado";
            }


            const especialidadesUsuario =
                document.querySelectorAll(
                    ".especialidadeUsuario"
                );

            especialidadesUsuario.forEach(elemento => {
                elemento.textContent =
                    usuario.dados?.especialidade ??
                    "Não informado";
            });
        }

        if (usuario.tipo === "paciente" && usuario.dados) {

            const cpfUsuario =
                document.getElementById(
                    "cpfUsuario"
                );

            if (cpfUsuario) {
                cpfUsuario.textContent =
                    usuario.dados.cpf ?? "Não informado";
            }


            const cnsUsuario =
                document.getElementById(
                    "cnsUsuario"
                );

            if (cnsUsuario) {
                cnsUsuario.textContent =
                    usuario.dados.cns ?? "Não informado";
            }


            const dataNascimentoUsuario =
                document.getElementById(
                    "dataNascimentoUsuario"
                );

            if (dataNascimentoUsuario) {
                dataNascimentoUsuario.textContent =
                    usuario.dados.data_nascimento ?? "Não informado";
            }


            const sexoUsuario =
                document.getElementById(
                    "sexoUsuario"
                );

            if (sexoUsuario) {
                sexoUsuario.textContent =
                    usuario.dados.sexo ?? "Não informado";
            }


            const contatoEmergenciaUsuario =
                document.getElementById(
                    "contatoEmergenciaUsuario"
                );

            if (contatoEmergenciaUsuario) {
                contatoEmergenciaUsuario.textContent =
                    usuario.dados.contato_emergencia ?? "Não informado";
            }


            const tipoSanguineoUsuario =
                document.getElementById(
                    "tipoSanguineoUsuario"
                );

            if (tipoSanguineoUsuario) {
                tipoSanguineoUsuario.textContent =
                    usuario.dados.tipo_sanguineo ?? "Não informado";
            }
        }

    } catch (erro) {
        console.error(
            "Erro ao carregar perfil:",
            erro
        );
    }

} carregarPerfil();


function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    window.location.href = "login.html";
}