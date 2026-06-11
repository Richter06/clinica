document.addEventListener("DOMContentLoaded", () => {
    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];

    const agora = new Date();
    const hojeStr = agora.toISOString().split("T")[0];

    let atrasadas = 0;
    let hoje = 0;
    let futuras = 0;
    let concluidas = 0;
    let canceladas = 0;
    let confirmadas = 0;
    let emAtendimento = 0;
    let agendadas = 0;

    consultas.forEach(c => {
        const dataConsulta = new Date(`${c.data}T${c.horario}`);
        const status = c.status || "Agendada";

        if (status === "Concluída") {
            concluidas++;
        } else if (status === "Cancelada") {
            canceladas++;
        } else if (status === "Confirmada") {
            confirmadas++;
        } else if (status === "Em Atendimento") {
            emAtendimento++;
        } else {
            agendadas++;
        }

        if (
            dataConsulta < agora &&
            status !== "Concluída" &&
            status !== "Cancelada"
        ) {
            atrasadas++;
        }

        if (c.data === hojeStr) {
            hoje++;
        }

        if (c.data > hojeStr) {
            futuras++;
        }
    });

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setText("atrasadas", atrasadas);
    setText("hoje", hoje);
    setText("futuras", futuras);
    setText("concluidas", concluidas);
    setText("canceladas", canceladas);
    setText("confirmadas", confirmadas);
    setText("emAtendimento", emAtendimento);
    setText("agendadas", agendadas);

    setText("totalPacientes", pacientes.length);
    setText("totalMedicos", medicos.length);
    setText("totalConsultas", consultas.length);

    const tabela = document.getElementById("consultas");
    if (tabela) {
        tabela.innerHTML = "";

        const proximas = consultas
            .slice()
            .sort((a, b) =>
                new Date(`${a.data}T${a.horario}`) -
                new Date(`${b.data}T${b.horario}`)
            )
            .slice(0, 5);

        proximas.forEach(c => {
            const dataConsulta = new Date(`${c.data}T${c.horario}`);
            const statusBase = c.status || "Agendada";

            let statusExibido = "";

            if (
                dataConsulta < agora &&
                statusBase !== "Concluída" &&
                statusBase !== "Cancelada"
            ) {
                statusExibido = "🔴 Atrasada";
            } else if (statusBase === "Concluída") {
                statusExibido = "✅ Concluída";
            } else if (statusBase === "Cancelada") {
                statusExibido = "⚫ Cancelada";
            } else if (statusBase === "Confirmada") {
                statusExibido = "🟡 Confirmada";
            } else if (statusBase === "Em Atendimento") {
                statusExibido = "🔵 Em Atendimento";
            } else {
                statusExibido = "🟢 Agendada";
            }

            tabela.innerHTML += `
                <tr>
                    <td>${c.data}</td>
                    <td>${c.horario}</td>
                    <td>${c.paciente}</td>
                    <td>${c.medico}</td>
                    <td>${statusExibido}</td>
                </tr>
            `;
        });
    }
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

// Dark mode
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