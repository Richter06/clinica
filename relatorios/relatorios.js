document.addEventListener("DOMContentLoaded", () => {
    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];

    const hojeStr = new Date().toISOString().split("T")[0];
    const agora = new Date();

    const atrasadas = consultas.filter(c => {
        const dataConsulta = new Date(`${c.data}T${c.horario}`);
        return dataConsulta < agora;
    });

    const hoje = consultas.filter(c => c.data === hojeStr);

    const futuras = consultas.filter(c => {
        const dataConsulta = new Date(`${c.data}T${c.horario}`);
        return dataConsulta > agora;
    });

    // Cards, caso existam no HTML
    const elPacientes = document.getElementById("pacientes");
    const elMedicos = document.getElementById("medicos");
    const elConsultas = document.getElementById("consultas");
    const elAtrasadas = document.getElementById("atrasadas");

    if (elPacientes) elPacientes.textContent = pacientes.length;
    if (elMedicos) elMedicos.textContent = medicos.length;
    if (elConsultas) elConsultas.textContent = consultas.length;
    if (elAtrasadas) elAtrasadas.textContent = atrasadas.length;

    // Gráfico
    const canvas = document.getElementById("grafico");

    if (canvas && typeof Chart !== "undefined") {
        new Chart(canvas, {
            type: "bar",
            data: {
                labels: [
                    "Pacientes",
                    "Médicos",
                    "Consultas",
                    "Hoje",
                    "Atrasadas",
                    "Futuras"
                ],
                datasets: [{
                    label: "Quantidade",
                    data: [
                        pacientes.length,
                        medicos.length,
                        consultas.length,
                        hoje.length,
                        atrasadas.length,
                        futuras.length
                    ],
                    backgroundColor: [
                        "#d52b1e",
                        "#b2221a",
                        "#ff3b30",
                        "#8b0000",
                        "#ff6b6b",
                        "#c0392b"
                    ],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            precision: 0
                        }
                    }
                }
            }
        });
    }

    // Resumo por médicos
    const tabelaMedicos = document.getElementById("medicosTabela");

    if (tabelaMedicos) {
        tabelaMedicos.innerHTML = "";

        medicos.forEach(medico => {
            const totalConsultas = consultas.filter(
                consulta => consulta.medico === medico.nome
            ).length;

            tabelaMedicos.innerHTML += `
                <tr>
                    <td>${medico.nome}</td>
                    <td>${medico.especialidade || "-"}</td>
                    <td>${totalConsultas}</td>
                </tr>
            `;
        });
    }
});

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {

    sidebar.classList.toggle("open");
    menuToggle.classList.toggle("active");

    menuToggle.textContent =
        sidebar.classList.contains("open") ? "✕" : "☰";

});