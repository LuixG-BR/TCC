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


        /* =====================================
           NOME
        ====================================== */

        const nomeUsuario =
            document.getElementById(
                "nomeUsuario"
            );

        if (nomeUsuario) {

            nomeUsuario.textContent =
                usuario.nome;

        }


        /* =====================================
           EMAIL
        ====================================== */

        const emailUsuario =
            document.getElementById(
                "emailUsuario"
            );

        if (emailUsuario) {
            emailUsuario.textContent =
                usuario.email;
        }

    } catch (erro) {
        console.error(
            "Erro ao carregar perfil:",
            erro
        );
    }
}

carregarPerfil();

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    window.location.href = "login.html";
}