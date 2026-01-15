// Seletores Gerais
const elementsWithBorder = document.querySelectorAll(".about h1, .nome h1");
const darkBtn = document.querySelector(".darkmode");
const body = document.querySelector("body");
const themeIcon = document.getElementById("theme-icon");

// Seletores de Idioma
const langBtn = document.querySelector(".language-toggle h1");
const langToggleDiv = document.querySelector(".language-toggle");
const enTexts = document.querySelectorAll(".lang-en");
const ptTexts = document.querySelectorAll(".lang-pt");

// Seletores de Animação
const textEn = document.getElementById("animated-text-en");
const textPt = document.getElementById("animated-text-pt");

// 1. Inicializa Tema
function initializeTheme() {
    if (body.classList.contains("light-theme")) {
        themeIcon.src = "./icons/sun.svg";
    } else {
        body.classList.add("dark-theme");
        themeIcon.src = "./icons/moon.svg";
    }
}
initializeTheme();

// 2. Hover Menu
elementsWithBorder.forEach(element => {
    element.addEventListener("click", () => {
        elementsWithBorder.forEach(el => el.classList.remove("active"));
        element.classList.add("active");
    });
});

// 3. Alternar Tema
darkBtn.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        themeIcon.src = "./icons/sun.svg";
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        themeIcon.src = "./icons/moon.svg";
    }
});

// 4. Função de Digitação (Typewriter)
function typeWriter(element) {
    const text = element.getAttribute("data-text") || element.textContent; // Pega o texto original
    element.textContent = ""; // Limpa
    element.style.display = "inline-block"; // Garante visibilidade
    element.style.borderRight = "3px solid"; // Cursor piscando

    let i = 0;
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, 70); // Velocidade
        } else {
            element.style.borderRight = "none"; // Remove cursor no fim
        }
    }
    typing();
}

// Inicializa a digitação em Inglês ao carregar
document.addEventListener("DOMContentLoaded", () => {
    // Salva o texto original em um atributo para poder redigitar depois
    textEn.setAttribute("data-text", textEn.textContent.trim());
    textPt.setAttribute("data-text", textPt.textContent.trim());

    typeWriter(textEn); // Começa em inglês
});

// 5. Alternar Idioma com Re-animação
langToggleDiv.addEventListener("click", () => {
    const isEnglish = langBtn.textContent === "BR";

    if (isEnglish) {
        // Mudar para Português
        langBtn.textContent = "EN";

        // Esconde textos estáticos
        enTexts.forEach(el => el.style.display = "none");
        ptTexts.forEach(el => el.style.display = "inline");

        // Troca e Anima o Subtítulo
        textEn.style.display = "none";
        typeWriter(textPt); // Dispara animação no texto PT

    } else {
        // Mudar para Inglês
        langBtn.textContent = "BR";

        ptTexts.forEach(el => el.style.display = "none");
        enTexts.forEach(el => el.style.display = "inline");

        // Troca e Anima o Subtítulo
        textPt.style.display = "none";
        typeWriter(textEn); // Dispara animação no texto EN
    }
});