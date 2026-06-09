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

// -------------------------
// CARREGAR PACIENTES
// -------------------------
function carregarPacientes(){

    pacienteSelect.innerHTML = "";

    pacientes.forEach(p => {
        pacienteSelect.innerHTML += `
            <option value="${p.nome}">
                ${p.nome}
            </option>
        `;
    });
}

// -------------------------
// CARREGAR MÉDICOS
// -------------------------
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

// -------------------------
// RENDER PRONTUÁRIOS
// -------------------------
function render(){

    lista.innerHTML = "";

    const filtro = prontuarios.filter(p =>
        p.paciente === pacienteSelect.value
    );

    filtro.forEach((p, index) => {

        lista.innerHTML += `
            <div class="item">
                <strong>${p.data}</strong> - ${p.medico}
                <p>${p.diagnostico}</p>
                <small>${p.observacoes || ""}</small>

                <button id="excluir" onclick="excluirProntuario(${index})">
                    Excluir
                </button>
            </div>
        `;
    });
}

// -------------------------
// ABRIR MODAL
// -------------------------
btnNovo.onclick = () => {
    modal.classList.remove("hidden");
    carregarMedicos();
};

// -------------------------
// FECHAR MODAL
// -------------------------
cancelar.onclick = () => {
    modal.classList.add("hidden");
};

// -------------------------
// SALVAR PRONTUÁRIO
// -------------------------
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

// -------------------------
// TROCA PACIENTE
// -------------------------
pacienteSelect.onchange = () => {
    render();
};

// -------------------------
// EXCLUIR PRONTUÁRIO
// -------------------------
function excluirProntuario(index) {

    if (!confirm("Deseja excluir este registro do prontuário?")) return;

    const pacienteFiltrado = prontuarios.filter(p =>
        p.paciente === pacienteSelect.value
    );

    const item = pacienteFiltrado[index];

    const realIndex = prontuarios.indexOf(item);

    prontuarios.splice(realIndex, 1);

    localStorage.setItem(
        "prontuarios",
        JSON.stringify(prontuarios)
    );

    render();
}

// -------------------------
// INIT
// -------------------------
carregarPacientes();
carregarMedicos();
render();

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {

    sidebar.classList.toggle("open");
    menuToggle.classList.toggle("active");

    menuToggle.textContent =
        sidebar.classList.contains("open") ? "✕" : "☰";

});