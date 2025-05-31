// Mostrar/Ocultar el menú desplegable
document.querySelector('.menu-toggle')?.addEventListener('click', () => {
    const menu = document.getElementById('dropdownMenu');
    if (menu) {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
});

// Activar Modo Oscuro
document.getElementById('toggleDarkMode')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Inicializar partículas (usa particles.js)
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        size: { value: 3 },
        color: { value: "#4caf50" },
        line_linked: { enable: true, color: "#4caf50", opacity: 0.4 },
        move: { speed: 1 }
    },
    interactivity: {
        events: { onhover: { enable: true, mode: "repulse" } }
    }
});

// Obtener valor de input
function getValue(id) {
    return parseInt(document.getElementById(id)?.value) || 0;
}

// Calcular la huella de carbono total
function calculateCarbonFootprint() {
    return (
        getValue('pcHours') * 0.1 +
        getValue('carKm') * 0.2 +
        getValue('meatConsumption') * 0.15 +
        getValue('waterUsage') * 0.05 +
        getValue('recycling') * -0.1 +
        getValue('flights') * 1 +
        getValue('standbyDevices') * 0.05 +
        getValue('plasticBags') * 0.05 +
        getValue('bulbs') * 0.02 +
        getValue('singleUse') * 0.1
    );
}

// Obtener el aspecto más contaminante
function getWorstAspect() {
    const values = {
        pcHours: getValue('pcHours'),
        carKm: getValue('carKm'),
        meatConsumption: getValue('meatConsumption'),
        waterUsage: getValue('waterUsage'),
        recycling: getValue('recycling'),
        flights: getValue('flights'),
        standbyDevices: getValue('standbyDevices'),
        plasticBags: getValue('plasticBags'),
        bulbs: getValue('bulbs'),
        singleUse: getValue('singleUse')
    };

    const factors = {
        pcHours: 0.1,
        carKm: 0.2,
        meatConsumption: 0.15,
        waterUsage: 0.05,
        recycling: -0.1,
        flights: 1,
        standbyDevices: 0.05,
        plasticBags: 0.05,
        bulbs: 0.02,
        singleUse: 0.1
    };

    let worst = '';
    let highestImpact = -Infinity;

    for (const key in values) {
        const impact = values[key] * factors[key];
        if (impact > highestImpact) {
            highestImpact = impact;
            worst = key;
        }
    }

    return worst;
}

// Mostrar resultado al enviar el formulario
document.getElementById('carbonForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const carbonFootprint = calculateCarbonFootprint();

    const resultContainer = document.getElementById('carbonFootprintResult');
    const carbonBar = document.getElementById('carbonBar');
    const carbonBarText = document.getElementById('carbonBarText');
    const redirectMessage = document.getElementById('redirectMessage');

    let width = 0, color = '', message = '', level = '';

    if (carbonFootprint < 20) {
        width = 20;
        color = 'green';
        message = 'Tu huella de carbono es baja, ¡sigue así!';
        level = 'baja';
    } else if (carbonFootprint < 50) {
        width = 50;
        color = 'yellow';
        message = 'Tu huella de carbono es moderada, puedes mejorar.';
        level = 'moderada';
    } else {
        width = 100;
        color = 'red';
        message = '¡Tu huella de carbono es alta! Es importante que tomes medidas para reducirla.';
        level = 'alta';
    }

    resultContainer.style.display = 'block';
    carbonBar.style.width = `${width}%`;
    carbonBar.style.backgroundColor = color;
    carbonBarText.innerText = message;

    redirectMessage.innerText = 'En un momento serás redirigido a cambiar el planeta';
    redirectMessage.style.display = 'block';

    setTimeout(() => {
        showCountdown(level);
    }, 5000);
});

// Mostrar ventana emergente con cuenta regresiva
function showCountdown(level) {
    const modal = document.createElement('div');
    modal.id = 'countdownModal';
    Object.assign(modal.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px',
        zIndex: 9999
    });

    const modalContent = document.createElement('div');
    Object.assign(modalContent.style, {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center'
    });

    const countdownText = document.createElement('p');
    countdownText.innerText = 'Redirigiendo a los retos...';

    const countdownTimer = document.createElement('p');
    countdownTimer.id = 'countdownTimer';
    countdownTimer.innerText = '5';

    modalContent.appendChild(countdownText);
    modalContent.appendChild(countdownTimer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    let counter = 5;
    const timer = setInterval(() => {
        counter--;
        countdownTimer.innerText = counter;
        if (counter === 0) {
            clearInterval(timer);
            const worstCategory = getWorstAspect();
            redirectToChallenges(level, worstCategory);
        }
    }, 1000);
}

// Redireccionar a retos.html y guardar el peor aspecto
function redirectToChallenges(level, worstCategory) {
    localStorage.setItem('worstCategory', worstCategory);
    window.location.href = 'retos.html';
}
