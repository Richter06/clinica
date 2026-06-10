document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // impede recarregar a página

    window.location.href = "dashboard/dashboard.html"; // redireciona para o dashboard
});