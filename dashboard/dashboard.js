document.addEventListener("DOMContentLoaded", () => {

    const pacientes =
        JSON.parse(localStorage.getItem("pacientes")) || [];

    const medicos =
        JSON.parse(localStorage.getItem("medicos")) || [];

    const consultas =
        JSON.parse(localStorage.getItem("consultas")) || [];

    const agora = new Date();

    const atrasadas = [];
    const hojeLista = [];
    const futuras = [];

    // separa tudo
    consultas.forEach(c => {
        const dataConsulta = new Date(`${c.data}T${c.horario}`);
        const status = c.status || "Agendada";

        if (
            dataConsulta < agora &&
            status !== "Concluída" &&
            status !== "Cancelada"
        ) {
            atrasadas.push(c);
        } else if (c.data === agora.toISOString().split("T")[0]) {
            hojeLista.push(c);
        } else {
            futuras.push(c);
        }
    });

    // atualiza os cards
    document.getElementById("atrasadas").textContent = atrasadas.length;
    document.getElementById("hoje").textContent = hojeLista.length;
    document.getElementById("futuras").textContent = futuras.length;

    document.getElementById("totalPacientes").textContent = pacientes.length;
    document.getElementById("totalMedicos").textContent = medicos.length;
    document.getElementById("totalConsultas").textContent = consultas.length;

    // TABELA
    const tabela = document.getElementById("consultas");
    tabela.innerHTML = "";

    // ordena por data/hora
    const proximas = consultas
        .slice()
        .sort((a, b) =>
            new Date(`${a.data}T${a.horario}`) -
            new Date(`${b.data}T${b.horario}`)
        )
        .slice(0, 5);

    // renderiza
    proximas.forEach(c => {
        const agora = new Date();
        const dataConsulta = new Date(`${c.data}T${c.horario}`);
        const statusBase = c.status || "Agendada";

        let status = "";

        if (
            dataConsulta < agora &&
            statusBase !== "Concluída" &&
            statusBase !== "Cancelada"
        ) {
            status = "🔴 Atrasada";
        } else if (statusBase === "Concluída") {
            status = "✅ Concluída";
        } else if (statusBase === "Cancelada") {
            status = "⚫ Cancelada";
        } else if (statusBase === "Confirmada") {
            status = "🟡 Confirmada";
        } else if (statusBase === "Em Atendimento") {
            status = "🔵 Em Atendimento";
        } else {
            status = "🟢 Agendada";
        }

        tabela.innerHTML += `
        <tr>
            <td>${c.data}</td>
            <td>${c.horario}</td>
            <td>${c.paciente}</td>
            <td>${c.medico}</td>
            <td>${status}</td>
        </tr>
        `;
    });
});

// Menu Hamburguer
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");

        if (sidebar.classList.contains("open")) {
            menuToggle.innerHTML = "✕";
        } else {
            menuToggle.innerHTML = "☰";
        }
    });
}

// DARK MODE
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