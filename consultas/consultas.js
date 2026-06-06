const modal = document.getElementById("modal");
const btnNovo = document.getElementById("btnNovo");
const btnCancelar = document.getElementById("btnCancelar");
const form = document.getElementById("consultaForm");
const lista = document.getElementById("listaConsultas");
const pesquisa = document.getElementById("pesquisa");
const paciente = document.getElementById("paciente");
const medico = document.getElementById("medico");
const data = document.getElementById("data");
const horario = document.getElementById("horario");
const status = document.getElementById("status");
const observacoes = document.getElementById("observacoes");
const editIndex = document.getElementById("editIndex");

const selectPaciente = document.getElementById("paciente");
const selectMedico = document.getElementById("medico");

let consultas =
JSON.parse(localStorage.getItem("consultas")) || [];

const pacientes =
JSON.parse(localStorage.getItem("pacientes")) || [];

const medicos =
JSON.parse(localStorage.getItem("medicos")) || [];

function carregarSelects(){

    selectPaciente.innerHTML = "";
    selectMedico.innerHTML = "";

    pacientes.forEach(paciente => {

        selectPaciente.innerHTML += `
            <option value="${paciente.nome}">
                ${paciente.nome}
            </option>
        `;
    });

    medicos.forEach(medico => {

        selectMedico.innerHTML += `
            <option value="${medico.nome}">
                ${medico.nome}
            </option>
        `;
    });
}

btnNovo.addEventListener("click", () => {

    form.reset();
    editIndex.value = "";

    carregarSelects();

    modal.classList.remove("hidden");
});

btnCancelar.addEventListener("click", () => {
    modal.classList.add("hidden");
});

function salvarStorage(){

    localStorage.setItem(
        "consultas",
        JSON.stringify(consultas)
    );
}

function renderizar(filtro=""){

    lista.innerHTML = "";

    consultas
    .filter(c =>
        c.paciente.toLowerCase().includes(filtro.toLowerCase()) ||
        c.medico.toLowerCase().includes(filtro.toLowerCase())
    )
    .forEach((consulta,index)=>{

        lista.innerHTML += `
        <tr>

            <td>${consulta.paciente}</td>

            <td>${consulta.medico}</td>

            <td>${consulta.data}</td>

            <td>${consulta.horario}</td>

            <td>${consulta.status}</td>

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

    const consulta = {

        paciente: paciente.value,
        medico: medico.value,
        data: data.value,
        horario: horario.value,
        status: status.value,
        observacoes: observacoes.value
    };

    const index = editIndex.value;

    if(index === ""){

        consultas.push(consulta);

    }else{

        consultas[index] = consulta;
    }

    salvarStorage();
    renderizar();

    modal.classList.add("hidden");
});

function editar(index){

    carregarSelects();

    const consulta = consultas[index];

    paciente.value = consulta.paciente;
    medico.value = consulta.medico;
    data.value = consulta.data;
    horario.value = consulta.horario;
    status.value = consulta.status;
    observacoes.value = consulta.observacoes;

    editIndex.value = index;

    modal.classList.remove("hidden");
}

function excluir(index){

    if(confirm("Deseja excluir esta consulta?")){

        consultas.splice(index,1);

        salvarStorage();
        renderizar();
    }
}

pesquisa.addEventListener("input",(e)=>{

    renderizar(e.target.value);
});

renderizar();