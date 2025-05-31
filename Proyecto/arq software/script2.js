// script.js

// Mostrar/Ocultar el menú desplegable
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
  
  // Activar Modo Oscuro
  document.getElementById('toggleDarkMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  
  // Inicializar partículas
  particlesJS('particles-js', {
    particles: {
      number: { value: 50 },
      size: { value: 3 },
      color: { value: "#4caf50" },
      line_linked: {
        enable: true,
        color: "#4caf50",
        opacity: 0.4
      },
      move: {
        speed: 1
      }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "repulse" }
      }
    }
  });
  