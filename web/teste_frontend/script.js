const API = "https://emps-backend-17ip.onrender.com"



async function buscarPaciente() {


    const nome = document
        .getElementById("nomePaciente")
        .value



    try {


        const resposta = await fetch(
            `${API}/usuarios`
        )



        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar pacientes"
            )

        }



        const pacientes = await resposta.json()



        console.log(pacientes)



        const resultado =
            document.getElementById("resultado")



        resultado.innerHTML = ""



        pacientes.forEach(paciente => {


            if (
                paciente.nome
                    .toLowerCase()
                    .includes(nome.toLowerCase())
            ) {


                resultado.innerHTML +=
                    `
                <hr>

                <p>
                <strong>Nome:</strong>
                ${paciente.nome}
                </p>


                <p>
                <strong>EMAIL:</strong>
                ${paciente.email ?? "Não informado"}
                </p>


                <p>
                <strong>ID:</strong>
                ${paciente.id_usuario}
                </p>

                `

            }


        })


    }


    catch (error) {


        console.error(error)


        document
            .getElementById("resultado")
            .innerHTML =
            `
        Erro ao conectar com API
        `


    }


}