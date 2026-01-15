// Seletores
const elementsWithBorder = document.querySelectorAll(".about h1, .nome h1");
const darkBtn = document.querySelector(".darkmode"); // Clique na div inteira
const body = document.querySelector("body");
const themeIcon = document.getElementById("theme-icon");

// Seletores de Idioma
const langBtn = document.querySelector(".language-toggle h1"); // O texto do botão
const langToggleDiv = document.querySelector(".language-toggle");
const enTexts = document.querySelectorAll(".lang-en");
const ptTexts = document.querySelectorAll(".lang-pt");

// 1. Inicializa Tema
function initializeTheme() {
    // Verifica se tem preferência salva (opcional, aqui usa a classe do HTML)
    if (body.classList.contains("light-theme")) {
        themeIcon.src = "./icons/sun.svg";
    } else {
        body.classList.add("dark-theme");
        themeIcon.src = "./icons/moon.svg";
    }
}
initializeTheme();

// 2. Lógica de Hover/Active no Menu
elementsWithBorder.forEach(element => {
    element.addEventListener("click", () => {
        elementsWithBorder.forEach(el => el.classList.remove("active"));
        element.classList.add("active");
    });
});

// 3. Alternar Tema (Dark/Light)
darkBtn.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
        // Muda para Light
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        themeIcon.src = "./icons/sun.svg";
    } else {
        // Muda para Dark
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        themeIcon.src = "./icons/moon.svg";
    }
});

// 4. Alternar Idioma (EN/PT)
langToggleDiv.addEventListener("click", () => {
    const isEnglish = langBtn.textContent === "BR"; // Se está mostrando BR, o site está em Inglês

    if (isEnglish) {
        // Mudar para Português
        langBtn.textContent = "EN"; // Botão agora mostra opção de voltar pra inglês

        enTexts.forEach(el => el.style.display = "none");
        ptTexts.forEach(el => el.style.display = "inline"); // ou block dependendo do layout
    } else {
        // Mudar para Inglês
        langBtn.textContent = "BR";

        ptTexts.forEach(el => el.style.display = "none");
        enTexts.forEach(el => el.style.display = "inline");
    }
});