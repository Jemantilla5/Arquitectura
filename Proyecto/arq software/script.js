document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const preguntaInicial = document.getElementById("preguntaInicial");
    const preguntasHuella = document.getElementById("preguntasHuella");
    const resultado = document.getElementById("resultado");
    const preguntasContainer = document.getElementById("preguntasContainer");
    const resumen = document.getElementById("resumen");

    let usuarioRegistrado = false;

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        usuarioRegistrado = true;
        alert("Registro exitoso");
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (usuarioRegistrado) {
            alert("Inicio de sesión exitoso");
            preguntaInicial.style.display = "block";
        } else {
            alert("Primero debes registrarte");
        }
    });

    document.getElementById("enviarRespuesta").addEventListener("click", function () {
        preguntaInicial.style.display = "none";
        preguntasHuella.style.display = "block";
        generarPreguntas();
    });

    const preguntas = [
        { texto: "¿Cuántas horas al día usas el computador?", max: 12, co2: 10000 },
        { texto: "¿Cuántas veces a la semana usas transporte público?", max: 7, co2: 5000 },
        { texto: "¿Cuántos litros de agua gastas al día?", max: 100, co2: 2000 },
        { texto: "¿Cuántos días comes carne a la semana?", max: 7, co2: 4000 },
        { texto: "¿Cuántas veces usas plástico desechable al día?", max: 5, co2: 3000 },
        { texto: "¿Cuántas veces cargas tu celular al día?", max: 2, co2: 1000 },
        { texto: "¿Cuántas horas de TV ves al día?", max: 4, co2: 5000 },
        { texto: "¿Cuántas veces a la semana usas aire acondicionado?", max: 7, co2: 8000 },
        { texto: "¿Cuántos viajes en avión haces al año?", max: 2, co2: 50000 },
        { texto: "¿Cuántas prendas de ropa compras al mes?", max: 5, co2: 2000 }
    ];

    function generarPreguntas() {
        preguntasContainer.innerHTML = "";
        preguntas.forEach((pregunta, index) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <label>${pregunta.texto}</label>
                <input type="number" id="pregunta${index}" min="0">
                <span id="alerta${index}"></span>
            `;
            preguntasContainer.appendChild(div);
        });
    }

    document.getElementById("calcularHuella").addEventListener("click", function () {
        let totalCO2 = 0;
        resumen.innerHTML = "<h3>Tu impacto:</h3>";

        preguntas.forEach((pregunta, index) => {
            const valor = parseInt(document.getElementById(`pregunta${index}`).value) || 0;
            const emision = (valor / pregunta.max) * pregunta.co2;
            totalCO2 += emision;

            let impacto = "";
            if (valor > pregunta.max) {
                impacto = `<span class="grave">GRAVE</span>`;
            } else if (valor > pregunta.max * 0.7) {
                impacto = `<span class="moderado">MODERADO</span>`;
            } else {
                impacto = `<span class="ligero">LIGERO</span>`;
            }

            resumen.innerHTML += `<p>${pregunta.texto}: ${valor} → ${impacto}</p>`;
        });

        resultado.style.display = "block";
    });

    document.getElementById("verReto").addEventListener("click", function () {
        window.location.href = "reto.html";
    });
});
