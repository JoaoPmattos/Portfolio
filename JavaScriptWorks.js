// --- VARIÁVEIS GERAIS ---
const darkModeBtn = document.querySelector(".darkmode");
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

// Variáveis de Idioma
const langBtn = document.querySelector(".language-toggle h1");
const langToggleDiv = document.querySelector(".language-toggle");
const enTexts = document.querySelectorAll(".lang-en");
const ptTexts = document.querySelectorAll(".lang-pt");

// --- INICIALIZAÇÃO DO TEMA ---
function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        themeIcon.src = "./icons/sun.svg";
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        themeIcon.src = "./icons/moon.svg";
        if (!savedTheme) localStorage.setItem("theme", "dark");
    }
}
initializeTheme();

// --- ALTERNAR TEMA ---
darkModeBtn.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        themeIcon.src = "./icons/sun.svg";
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        themeIcon.src = "./icons/moon.svg";
        localStorage.setItem("theme", "dark");
    }
});

// --- ALTERNAR IDIOMA ---
langToggleDiv.addEventListener("click", () => {
    const isEnglish = langBtn.textContent === "BR";
    if (isEnglish) {
        langBtn.textContent = "EN";
        enTexts.forEach(el => el.style.display = "none");
        ptTexts.forEach(el => el.style.display = "inline");
    } else {
        langBtn.textContent = "BR";
        ptTexts.forEach(el => el.style.display = "none");
        enTexts.forEach(el => el.style.display = "inline");
    }
});


// --- LÓGICA DO CARROSSEL (BOTÕES + SWIPE) ---
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    let currentIndex = 0;

    // --- FUNÇÃO PARA MOSTRAR IMAGEM E ATUALIZAR LINK ---
    const showImage = (index) => {
        // Esconde todas
        images.forEach(img => img.style.display = 'none');

        // Mostra a atual
        const currentImg = images[index];
        currentImg.style.display = 'block';

        // Atualiza o link do botão "Visitar Site" principal do Card
        const card = carousel.closest('.work-card');
        const visitBtn = card.querySelector('.visit-btn');
        const newUrl = currentImg.getAttribute('data-url');

        if (visitBtn && newUrl) {
            visitBtn.href = newUrl;
        }
    };

    // Inicialização
    showImage(currentIndex);

    // --- NAVEGAÇÃO POR CLIQUE (SETAS) ---
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    // --- NAVEGAÇÃO POR SWIPE (TOUCH) ---
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        // Se arrastou mais de 50px para a esquerda ou direita
        if (touchEndX < touchStartX - 50) {
            // Swipe Left (Próximo)
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe Right (Anterior)
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }
    }

    // --- ABRIR MODAL AO CLICAR NA IMAGEM ---
    images.forEach(img => {
        img.addEventListener('click', () => {
            openModalSegmented(carousel.getAttribute('data-gallery'), img.src);
        });
    });
});


// --- MODAL / GALERIA (COM LINK DO PROJETO) ---
const modal = document.createElement('div');
modal.classList.add('modal-gallery');
document.body.appendChild(modal);

// Agora guardamos o SRC e a URL do link
let currentGallery = [];
let currentModalIndex = 0;

function openModalSegmented(group, clickedSrc) {
    // Mapeia as imagens pegando o SRC e o DATA-URL
    currentGallery = Array.from(document.querySelectorAll(`[data-gallery="${group}"] img`)).map(img => ({
        src: img.src,
        url: img.getAttribute('data-url')
    }));

    // Acha o índice da imagem clicada
    currentModalIndex = currentGallery.findIndex(item => item.src === clickedSrc);
    if (currentModalIndex === -1) currentModalIndex = 0;

    updateModal();
    modal.style.display = 'flex';
}

function updateModal() {
    const currentItem = currentGallery[currentModalIndex];

    // Verifica o idioma atual para o texto do botão do modal
    const isEnglish = document.querySelector(".language-toggle h1").textContent === "BR"; // Se mostra BR, tá em inglês
    const btnText = isEnglish ? "Visit Project" : "Visitar Projeto";

    // Se tiver URL, mostra o botão. Se não, não mostra.
    const buttonHtml = currentItem.url
        ? `<a href="${currentItem.url}" target="_blank" class="modal-visit-btn">${btnText}</a>`
        : '';

    modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img src="${currentItem.src}" class="modal-image">
      ${buttonHtml} <div class="modal-navigation">
        <span class="prev">&lt;</span>
        <span class="next">&gt;</span>
      </div>
    </div>
  `;

    // Re-adiciona os eventos pois o HTML foi reescrito
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.next').addEventListener('click', nextImageModal);
    modal.querySelector('.prev').addEventListener('click', prevImageModal);

    // Fecha o modal se clicar fora da imagem
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function closeModal() {
    modal.style.display = 'none';
}

function nextImageModal(e) {
    e.stopPropagation();
    currentModalIndex = (currentModalIndex + 1) % currentGallery.length;
    updateModal();
}

function prevImageModal(e) {
    e.stopPropagation();
    currentModalIndex = (currentModalIndex - 1 + currentGallery.length) % currentGallery.length;
    updateModal();
}