async function carregarPerfil() {

    const token = localStorage.getItem("token");

    try {
        const resposta = await fetch(`${API}/usuarios/me`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!resposta.ok) {
            throw new Error(
                "Erro ao buscar perfil"
            )
        }

        const usuario = await resposta.json();
        console.log(usuario);

        document.getElementById("perfil").innerHTML = `
<h2>
${usuario.nome}
</h2>

<p>
CRM:
${usuario.crm ?? "Não informado"}
</p>

<p>
Especialidade:
${usuario.especialidade ?? "Não informado"}
</p>

<p>
Telefone:
${usuario.telefone ?? "Não informado"}
</p>

<p>
Email:
${usuario.email}
</p>
`;

    } catch (error) {
        console.error(error);
        document.getElementById(
            "perfil"
        )
            .innerHTML =
            "Erro ao carregar perfil";
    }
}

carregarPerfil();