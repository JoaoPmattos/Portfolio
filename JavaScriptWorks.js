// Incremento: Carrossel Automático e Modal Segmentado

// Seleciona todos os carrosséis
const carouselsAuto = document.querySelectorAll('.carousel');

carouselsAuto.forEach(carousel => {
    let images = carousel.querySelectorAll('img');
    let currentIndex = 0;

    // Exibe apenas a primeira imagem
    images.forEach((img, index) => {
        img.style.display = (index === 0) ? 'block' : 'none';
    });

    // Troca automática das imagens no carrossel
    setInterval(() => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = 'block';
    }, 3000); // Troca a cada 3 segundos

    // Ao clicar no carrossel, abre o modal segmentado
    carousel.addEventListener('click', () => {
        openModalSegmented(carousel.getAttribute('data-gallery'));
    });
});

// Modal Segmentado
const modal = document.createElement('div');
modal.classList.add('modal-gallery');
document.body.appendChild(modal);

let currentGallery = [];
let currentModalIndex = 0;

// Abre o modal com imagens segmentadas
function openModalSegmented(group) {
    currentGallery = Array.from(document.querySelectorAll(`[data-gallery="${group}"] img`)).map(img => img.src);
    currentModalIndex = 0;
    updateModal();
    modal.style.display = 'flex';
}

// Atualiza o conteúdo do modal
function updateModal() {
    modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img src="${currentGallery[currentModalIndex]}" class="modal-image">
      <div class="modal-navigation">
        <span class="prev">&lt;</span>
        <span class="next">&gt;</span>
      </div>
    </div>
  `;

    // Eventos de navegação no modal
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.next').addEventListener('click', nextImage);
    modal.querySelector('.prev').addEventListener('click', prevImage);
}

// Fecha o modal
function closeModal() {
    modal.style.display = 'none';
}

// Próxima imagem no modal
function nextImage() {
    currentModalIndex = (currentModalIndex + 1) % currentGallery.length;
    updateModal();
}

// Imagem anterior no modal
function prevImage() {
    currentModalIndex = (currentModalIndex - 1 + currentGallery.length) % currentGallery.length;
    updateModal();
}

// 🔥 Restauro do Dark Mode 🔥

// Seleciona os elementos necessários
const darkModeToggle = document.querySelector(".darkmode h1");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// Função para inicializar o tema
function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        darkModeToggle.textContent = "Light";
        themeIcon.src = "./icons/sun.svg";
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        darkModeToggle.textContent = "Dark";
        themeIcon.src = "./icons/moon.svg";
    }
}

// Inicializa o tema ao carregar a página
initializeTheme();

// Evento de clique para alternar o tema
darkModeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        darkModeToggle.textContent = "Light";
        themeIcon.src = "./icons/sun.svg";
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        darkModeToggle.textContent = "Dark";
        themeIcon.src = "./icons/moon.svg";
        localStorage.setItem("theme", "dark");
    }
});
