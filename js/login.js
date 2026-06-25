async function login() {


    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // const resultado = document.getElementById("resultado");

    const dados = new URLSearchParams();

    dados.append("username", email);
    dados.append("password", senha
    );

    try {

        const resposta = await fetch(
            `${API}/login/`,
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                body: dados
            }
        );
        console.log("Status:", resposta.status);

        const texto = await resposta.text();
        console.log("Resposta API:", texto);

        if (!resposta.ok) {

            throw new Error(
                "Email ou senha inválidos"
            );
        }

        const token = JSON.parse(texto);
        console.log("Token:", token);

        localStorage.setItem(
            "token",
            token.access_token
        );

        localStorage.setItem(
            "usuario",
            JSON.stringify(
                token.usuario
            )
        );

        // if (resultado) {
        //     console.log("Login realizado com sucesso")
        //     //resultado.innerHTML = "Login realizado com sucesso";
        // }

        // redireciona
        setTimeout(() => {
            window.location.href = "CadastroMedico.html";
        }, 1000);

    }
    catch (error) {
        console.error(
            error
        );

        // if (resultado) {
        //     resultado.innerHTML =
        //         "Erro no login";

        // }
    }
}