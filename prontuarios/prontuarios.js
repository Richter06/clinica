const pacienteSelect = document.getElementById("pacienteSelect");
const medicoSelect = document.getElementById("medico");
const lista = document.getElementById("lista");
const modal = document.getElementById("modal");
const btnNovo = document.getElementById("btnNovo");
const cancelar = document.getElementById("cancelar");
const form = document.getElementById("form");
const editIndex = document.getElementById("editIndex");

// Campos do prontuário
const diagnostico = document.getElementById("diagnostico");
const observacoes = document.getElementById("observacoes");
const queixa = document.getElementById("queixa");
const alergias = document.getElementById("alergias");
const medicacoes = document.getElementById("medicacoes");
const examesSolicitados = document.getElementById("examesSolicitados");
const procedimentos = document.getElementById("procedimentos");
const evolucao = document.getElementById("evolucao");
const pressao = document.getElementById("pressao");
const temperatura = document.getElementById("temperatura");
const frequenciaCardiaca = document.getElementById("frequenciaCardiaca");
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");
const imc = document.getElementById("imc");

// Filtro opcional separado
const pesquisa = document.getElementById("pesquisa");
const filtroPaciente = document.getElementById("filtroPaciente");

let prontuarios = JSON.parse(localStorage.getItem("prontuarios")) || [];
const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

function salvarStorage() {
    localStorage.setItem("prontuarios", JSON.stringify(prontuarios));
}

function formatarDataHora() {
    return new Date().toLocaleString("pt-BR");
}

function carregarPacientes() {
    if (!pacienteSelect) return;

    pacienteSelect.innerHTML = `<option value="">Selecione um paciente</option>`;

    pacientes.forEach(p => {
        pacienteSelect.innerHTML += `
            <option value="${p.nome}">
                ${p.nome}
            </option>
        `;
    });

    if (filtroPaciente) {
        filtroPaciente.innerHTML = `<option value="">Todos os pacientes</option>`;

        pacientes.forEach(p => {
            filtroPaciente.innerHTML += `
                <option value="${p.nome}">
                    ${p.nome}
                </option>
            `;
        });
    }
}

function carregarMedicos() {
    if (!medicoSelect) return;

    medicoSelect.innerHTML = `<option value="">Selecione um médico</option>`;

    medicos.forEach(m => {
        medicoSelect.innerHTML += `
            <option value="${m.nome}">
                ${m.nome}
            </option>
        `;
    });
}

function calcularIMC() {
    if (!peso || !altura || !imc) return;

    const p = parseFloat(peso.value.replace(",", "."));
    const a = parseFloat(altura.value.replace(",", "."));

    if (!p || !a || a <= 0) {
        imc.value = "";
        return;
    }

    imc.value = (p / (a * a)).toFixed(2);
}

function limparFormulario() {
    form.reset();
    if (editIndex) editIndex.value = "";
    if (imc) imc.value = "";
}

function render() {
    if (!lista) return;

    lista.innerHTML = "";

    const texto = pesquisa ? pesquisa.value.trim().toLowerCase() : "";
    const pacienteFiltro = filtroPaciente ? filtroPaciente.value : "";

    const filtrados = prontuarios
        .map((p, index) => ({ ...p, __index: index }))
        .filter(p => {
            const matchPaciente = !pacienteFiltro || p.paciente === pacienteFiltro;

            const textoBase = `
                ${p.paciente || ""}
                ${p.medico || ""}
                ${p.diagnostico || ""}
                ${p.queixa || ""}
                ${p.alergias || ""}
                ${p.medicacoes || ""}
                ${p.examesSolicitados || ""}
                ${p.procedimentos || ""}
                ${p.evolucao || ""}
                ${p.observacoes || ""}
            `.toLowerCase();

            const matchTexto = !texto || textoBase.includes(texto);

            return matchPaciente && matchTexto;
        });

    if (filtrados.length === 0) {
        lista.innerHTML = `<div class="item vazio">Nenhum prontuário encontrado.</div>`;
        return;
    }

    filtrados.forEach(p => {
        lista.innerHTML += `
            <div class="item">
                <strong>${p.data || formatarDataHora()}</strong>
                <p><strong>Paciente:</strong> ${p.paciente || "Não informado"}</p>
                <p><strong>Médico:</strong> ${p.medico || "Não informado"}</p>
                <p><strong>Diagnóstico:</strong> ${p.diagnostico || "Sem diagnóstico"}</p>
                ${p.queixa ? `<p><strong>Queixa:</strong> ${p.queixa}</p>` : ""}
                ${p.alergias ? `<p><strong>Alergias:</strong> ${p.alergias}</p>` : ""}
                ${p.medicacoes ? `<p><strong>Medicações:</strong> ${p.medicacoes}</p>` : ""}
                ${p.examesSolicitados ? `<p><strong>Exames:</strong> ${p.examesSolicitados}</p>` : ""}
                ${p.procedimentos ? `<p><strong>Procedimentos:</strong> ${p.procedimentos}</p>` : ""}
                ${p.evolucao ? `<p><strong>Evolução:</strong> ${p.evolucao}</p>` : ""}
                ${p.pressao ? `<p><strong>Pressão:</strong> ${p.pressao}</p>` : ""}
                ${p.temperatura ? `<p><strong>Temperatura:</strong> ${p.temperatura}</p>` : ""}
                ${p.frequenciaCardiaca ? `<p><strong>Frequência cardíaca:</strong> ${p.frequenciaCardiaca}</p>` : ""}
                ${p.peso ? `<p><strong>Peso:</strong> ${p.peso} kg</p>` : ""}
                ${p.altura ? `<p><strong>Altura:</strong> ${p.altura} m</p>` : ""}
                ${p.imc ? `<p><strong>IMC:</strong> ${p.imc}</p>` : ""}
                ${p.observacoes ? `<small>${p.observacoes}</small>` : ""}

                <div class="acoes">
                    <button onclick="editarProntuario(${p.__index})">Editar</button>
                    <button onclick="excluirProntuario(${p.__index})">Excluir</button>
                </div>
            </div>
        `;
    });
}

btnNovo && btnNovo.addEventListener("click", () => {
    limparFormulario();
    carregarPacientes();
    carregarMedicos();
    modal.classList.remove("hidden");
});

cancelar && cancelar.addEventListener("click", () => {
    modal.classList.add("hidden");
});

form && form.addEventListener("submit", (e) => {
    e.preventDefault();

    calcularIMC();

    const novo = {
        paciente: pacienteSelect ? pacienteSelect.value : "",
        medico: medicoSelect ? medicoSelect.value : "",
        queixa: queixa ? queixa.value.trim() : "",
        diagnostico: diagnostico ? diagnostico.value.trim() : "",
        alergias: alergias ? alergias.value.trim() : "",
        medicacoes: medicacoes ? medicacoes.value.trim() : "",
        examesSolicitados: examesSolicitados ? examesSolicitados.value.trim() : "",
        procedimentos: procedimentos ? procedimentos.value.trim() : "",
        evolucao: evolucao ? evolucao.value.trim() : "",
        pressao: pressao ? pressao.value.trim() : "",
        temperatura: temperatura ? temperatura.value.trim() : "",
        frequenciaCardiaca: frequenciaCardiaca ? frequenciaCardiaca.value.trim() : "",
        peso: peso ? peso.value.trim() : "",
        altura: altura ? altura.value.trim() : "",
        imc: imc ? imc.value.trim() : "",
        observacoes: observacoes ? observacoes.value.trim() : "",
        data: formatarDataHora()
    };

    const index = editIndex ? editIndex.value : "";

    if (index === "") {
        prontuarios.push(novo);
    } else {
        prontuarios[index] = novo;
    }

    salvarStorage();
    render();
    modal.classList.add("hidden");
});

function editarProntuario(index) {
    const p = prontuarios[index];
    if (!p) return;

    carregarPacientes();
    carregarMedicos();

    if (pacienteSelect) pacienteSelect.value = p.paciente || "";
    if (medicoSelect) medicoSelect.value = p.medico || "";
    if (diagnostico) diagnostico.value = p.diagnostico || "";
    if (observacoes) observacoes.value = p.observacoes || "";
    if (queixa) queixa.value = p.queixa || "";
    if (alergias) alergias.value = p.alergias || "";
    if (medicacoes) medicacoes.value = p.medicacoes || "";
    if (examesSolicitados) examesSolicitados.value = p.examesSolicitados || "";
    if (procedimentos) procedimentos.value = p.procedimentos || "";
    if (evolucao) evolucao.value = p.evolucao || "";
    if (pressao) pressao.value = p.pressao || "";
    if (temperatura) temperatura.value = p.temperatura || "";
    if (frequenciaCardiaca) frequenciaCardiaca.value = p.frequenciaCardiaca || "";
    if (peso) peso.value = p.peso || "";
    if (altura) altura.value = p.altura || "";
    if (imc) imc.value = p.imc || "";
    if (editIndex) editIndex.value = index;

    modal.classList.remove("hidden");
}

function excluirProntuario(index) {
    if (!confirm("Deseja excluir este registro do prontuário?")) return;

    prontuarios.splice(index, 1);
    salvarStorage();
    render();
}

if (peso) peso.addEventListener("input", calcularIMC);
if (altura) altura.addEventListener("input", calcularIMC);

if (filtroPaciente) {
    filtroPaciente.addEventListener("change", render);
}

if (pesquisa) {
    pesquisa.addEventListener("input", render);
}

carregarPacientes();
carregarMedicos();
render();

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuToggle.classList.toggle("active");
        menuToggle.textContent = sidebar.classList.contains("open") ? "✕" : "☰";
    });
}

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

if (themeToggle && themeIcon) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeIcon.src = "../icons/dark.png";
        } else {
            themeIcon.src = "../icons/light.png";
        }
    });
}