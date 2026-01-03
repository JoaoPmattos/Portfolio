// Seleciona todos os itens que podem ter a borda animada, exceto "Dark"
const elementsWithBorder = document.querySelectorAll(".about h1, .nome h1");
// Seleciona o elemento "Dark" separadamente
const darkElement = document.querySelector(".darkmode h1");

// Seleciona o body para aplicar as classes de tema
const body = document.querySelector("body");

// Seleciona o ícone do tema
const themeIcon = document.getElementById("theme-icon");

// Inicializa o tema com base no estado inicial do body
function initializeTheme() {
    if (body.classList.contains("light-theme")) {
        // Se o tema for Light
        darkElement.textContent = "Light"; // Configura o texto para Light
        themeIcon.src = "./icons/sun.svg"; // Ícone de sol
    } else {
        // Se o tema for Dark (ou padrão)
        body.classList.add("dark-theme"); // Garante que o tema Dark seja padrão
        darkElement.textContent = "Dark"; // Configura o texto para Dark
        themeIcon.src = "./icons/moon.svg"; // Ícone de lua
    }
}

// Chama a função ao carregar a página
initializeTheme();

// Adiciona o evento de clique para os itens do menu, excluindo "Dark"
elementsWithBorder.forEach(element => {
    element.addEventListener("click", () => {
        // Remove a classe 'active' de todos os itens
        elementsWithBorder.forEach(el => el.classList.remove("active"));
        // Adiciona a classe 'active' ao item clicado
        element.classList.add("active");
    });
});

// Adiciona o evento de clique para alternar os temas
darkElement.addEventListener("click", () => {
    // Alterna entre os temas Light e Dark
    if (body.classList.contains("dark-theme")) {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        darkElement.textContent = "Light"; // Atualiza o texto do botão
        themeIcon.src = "./icons/sun.svg"; // Atualiza o ícone para sol
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        darkElement.textContent = "Dark"; // Atualiza o texto do botão
        themeIcon.src = "./icons/moon.svg"; // Atualiza o ícone para lua
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("animated-text");
    const text = textElement.textContent; // Texto original
    textElement.textContent = ""; // Limpa o conteúdo para começar a digitação
    textElement.style.visibility = "visible"; // Torna o texto visível
    let index = 0;

    function typeText() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index); // Adiciona uma letra ao texto
            index++;
            setTimeout(typeText, 100); // Velocidade de digitação (100ms por letra)
        } else {
            textElement.style.borderRight = "none"; // Remove o cursor ao terminar a digitação
        }
    }

    typeText(); // Inicia o efeito de digitação
});
