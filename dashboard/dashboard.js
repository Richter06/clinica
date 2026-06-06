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

    // 🔥 PRIMEIRO separa tudo
    consultas.forEach(c => {

        const dataConsulta = new Date(`${c.data}T${c.horario}`);

        if (dataConsulta < agora) {
            atrasadas.push(c);
        }
        else if (c.data === agora.toISOString().split("T")[0]) {
            hojeLista.push(c);
        }
        else {
            futuras.push(c);
        }
    });

    // 🔥 DEPOIS atualiza os cards
    document.getElementById("atrasadas").textContent = atrasadas.length;
    document.getElementById("hoje").textContent = hojeLista.length;
    document.getElementById("futuras").textContent = futuras.length;

    document.getElementById("totalPacientes").textContent = pacientes.length;
    document.getElementById("totalMedicos").textContent = medicos.length;
    document.getElementById("totalConsultas").textContent = consultas.length;

    // 🔥 TABELA
   const tabela = document.getElementById("consultas");
tabela.innerHTML = "";

// pega todas as consultas e ordena corretamente
const proximas = consultas
    .slice()
    .sort((a, b) =>
        new Date(`${a.data}T${a.horario}`) -
        new Date(`${b.data}T${b.horario}`)
    )
    .slice(0, 5);

// renderiza
proximas.forEach(c => {

        tabela.innerHTML += `
            <tr>
                <td>${c.horario}</td>
                <td>${c.paciente}</td>
                <td>${c.medico}</td>
            </tr>
        `;
    });
});