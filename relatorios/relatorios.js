document.addEventListener("DOMContentLoaded", () => {

    const pacientes =
        JSON.parse(localStorage.getItem("pacientes")) || [];

    const medicos =
        JSON.parse(localStorage.getItem("medicos")) || [];

    const consultas =
        JSON.parse(localStorage.getItem("consultas")) || [];

    const agora = new Date();

    const atrasadas = consultas.filter(c =>
        new Date(`${c.data}T${c.horario}`) < agora
    );

    const hoje = consultas.filter(c =>
        c.data === new Date().toISOString().split("T")[0]
    );

    const futuras = consultas.filter(c =>
        new Date(`${c.data}T${c.horario}`) > agora
    );

    // 📊 GRÁFICO REAL
    const ctx = document.getElementById("grafico");

    new Chart(ctx, {
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
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

});