// --- VARIÁVEIS GERAIS ---
const darkModeBtn = document.querySelector(".darkmode"); // Clica no container
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
        // Mudar para Português
        langBtn.textContent = "EN";
        enTexts.forEach(el => el.style.display = "none");
        ptTexts.forEach(el => el.style.display = "inline");
    } else {
        // Mudar para Inglês
        langBtn.textContent = "BR";
        ptTexts.forEach(el => el.style.display = "none");
        enTexts.forEach(el => el.style.display = "inline");
    }
});