const modal = document.getElementById("modal");
const btnNovo = document.getElementById("btnNovo");
const btnCancelar = document.getElementById("btnCancelar");
const lista = document.getElementById("listaMedicos");
const pesquisa = document.getElementById("pesquisa");
const form = document.getElementById("medicoForm");

let medicos =
JSON.parse(localStorage.getItem("medicos")) || [];

btnNovo.addEventListener("click", () => {
    form.reset();
    editIndex.value = "";
    modal.classList.remove("hidden");
});

btnCancelar.addEventListener("click", () => {
    modal.classList.add("hidden");
});

function salvarStorage(){
    localStorage.setItem(
        "medicos",
        JSON.stringify(medicos)
    );
}

function renderizar(filtro=""){

    lista.innerHTML = "";

    medicos
    .filter(m =>
        m.nome.toLowerCase()
        .includes(filtro.toLowerCase())
    )
    .forEach((medico,index)=>{

        lista.innerHTML += `
        <tr>
            <td>${medico.nome}</td>
            <td>${medico.crm}</td>
            <td>${medico.especialidade}</td>
            <td>${medico.telefone}</td>

            <td>
                <button onclick="editar(${index})">
                    Editar
                </button>

                <button onclick="excluir(${index})">
                    Excluir
                </button>
            </td>
        </tr>
        `;
    });
}

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const medico = {
        nome: nome.value,
        crm: crm.value,
        especialidade: especialidade.value,
        telefone: telefone.value,
        email: email.value
    };

    const index = editIndex.value;

    if(index === ""){
        medicos.push(medico);
    }else{
        medicos[index] = medico;
    }

    salvarStorage();
    renderizar();

    modal.classList.add("hidden");
});

function editar(index){

    const medico = medicos[index];

    nome.value = medico.nome;
    crm.value = medico.crm;
    especialidade.value = medico.especialidade;
    telefone.value = medico.telefone;
    email.value = medico.email;

    editIndex.value = index;

    modal.classList.remove("hidden");
}

function excluir(index){

    if(confirm("Deseja excluir este médico?")){

        medicos.splice(index,1);

        salvarStorage();
        renderizar();
    }
}

pesquisa.addEventListener("input",(e)=>{
    renderizar(e.target.value);
});

renderizar();