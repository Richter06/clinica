const modal = document.getElementById("modal");
const btnNovo = document.getElementById("btnNovo");
const btnCancelar = document.getElementById("btnCancelar");
const form = document.getElementById("pacienteForm");
const lista = document.getElementById("listaPacientes");
const search = document.getElementById("search");

let pacientes =
JSON.parse(localStorage.getItem("pacientes")) || [];

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
        "pacientes",
        JSON.stringify(pacientes)
    );
}

function renderizar(filtro=""){

    lista.innerHTML = "";

    pacientes
    .filter(p =>
        p.nome.toLowerCase()
        .includes(filtro.toLowerCase())
    )
    .forEach((paciente,index)=>{

        lista.innerHTML += `
        <tr>
            <td>${paciente.nome}</td>
            <td>${paciente.cpf}</td>
            <td>${paciente.telefone}</td>
            <td>${paciente.convenio}</td>

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

    const paciente = {
        nome: nome.value,
        cpf: cpf.value,
        telefone: telefone.value,
        convenio: convenio.value
    };

    const index = editIndex.value;

    if(index === ""){
        pacientes.push(paciente);
    }else{
        pacientes[index] = paciente;
    }

    salvarStorage();
    renderizar();

    modal.classList.add("hidden");
});

function editar(index){

    const paciente = pacientes[index];

    nome.value = paciente.nome;
    cpf.value = paciente.cpf;
    telefone.value = paciente.telefone;
    convenio.value = paciente.convenio;

    editIndex.value = index;

    modal.classList.remove("hidden");
}

function excluir(index){

    if(confirm("Deseja excluir este paciente?")){

        pacientes.splice(index,1);

        salvarStorage();
        renderizar();
    }
}

search.addEventListener("input",e=>{
    renderizar(e.target.value);
});

renderizar();

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuToggle.textContent =
        sidebar.classList.contains("open") ? "✕" : "☰";
});