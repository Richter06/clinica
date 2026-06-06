const pacienteSelect = document.getElementById("pacienteSelect");
const medicoSelect = document.getElementById("medico");

const lista = document.getElementById("lista");

const modal = document.getElementById("modal");
const btnNovo = document.getElementById("btnNovo");
const cancelar = document.getElementById("cancelar");
const form = document.getElementById("form");

const diagnostico = document.getElementById("diagnostico");
const observacoes = document.getElementById("observacoes");

let prontuarios =
JSON.parse(localStorage.getItem("prontuarios")) || [];

const pacientes =
JSON.parse(localStorage.getItem("pacientes")) || [];

const medicos =
JSON.parse(localStorage.getItem("medicos")) || [];

let pacienteAtual = "";

// preencher selects
function carregarPacientes(){

    pacienteSelect.innerHTML = "";

    pacientes.forEach(p => {
        pacienteSelect.innerHTML += `
            <option value="${p.nome}">
                ${p.nome}
            </option>
        `;
    });

    pacienteAtual = pacienteSelect.value;
}

// médicos
function carregarMedicos(){

    medicoSelect.innerHTML = "";

    medicos.forEach(m => {
        medicoSelect.innerHTML += `
            <option value="${m.nome}">
                ${m.nome}
            </option>
        `;
    });
}

// render histórico
function render(){

    lista.innerHTML = "";

    const filtro = prontuarios.filter(p =>
        p.paciente === pacienteSelect.value
    );

    filtro.forEach(p => {

        lista.innerHTML += `
            <div class="item">
                <strong>${p.data}</strong> - ${p.medico}
                <p>${p.diagnostico}</p>
                <small>${p.observacoes || ""}</small>
            </div>
        `;
    });
}

// abrir modal
btnNovo.onclick = () => {
    modal.classList.remove("hidden");
    carregarMedicos();
};

// fechar modal
cancelar.onclick = () => {
    modal.classList.add("hidden");
};

// salvar
form.onsubmit = (e) => {

    e.preventDefault();

    const novo = {
        paciente: pacienteSelect.value,
        medico: medicoSelect.value,
        diagnostico: diagnostico.value,
        observacoes: observacoes.value,
        data: new Date().toLocaleDateString()
    };

    prontuarios.push(novo);

    localStorage.setItem(
        "prontuarios",
        JSON.stringify(prontuarios)
    );

    modal.classList.add("hidden");

    render();
};

// troca paciente
pacienteSelect.onchange = () => {
    render();
};

// init
carregarPacientes();
carregarMedicos();
render();