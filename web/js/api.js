const API = "https://emps-backend-17ip.onrender.com";


async function requisicao(endpoint, options = {}){

    const resposta = await fetch(
        `${API}${endpoint}`,
        {

            headers:{
                "Content-Type":"application/json"
            },

            ...options
        }
    );

    if(!resposta.ok){
        throw new Error(
            "Erro na API"
        );
    }

    return await resposta.json();
}