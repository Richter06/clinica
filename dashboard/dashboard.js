const consultas = [
    {
        horario: "08:00",
        paciente: "João Silva",
        medico: "Dr. Carlos"
    },
    {
        horario: "08:30",
        paciente: "Maria Santos",
        medico: "Dra. Ana"
    },
    {
        horario: "09:00",
        paciente: "Pedro Oliveira",
        medico: "Dr. Rafael"
    }
];

const tbody = document.getElementById("consultas");

consultas.forEach(consulta => {
    tbody.innerHTML += `
        <tr>
            <td>${consulta.horario}</td>
            <td>${consulta.paciente}</td>
            <td>${consulta.medico}</td>
        </tr>
    `;
});