// Seleciona os elementos do menu e o botão Dark Mode
const elementsWithBorder = document.querySelectorAll(".about h1, .nome h1");
const darkElement = document.querySelector(".darkmode h1");
const body = document.querySelector("body");
const themeIcon = document.getElementById("theme-icon");

// Inicializa o tema com base no estado inicial
function initializeTheme() {
    if (body.classList.contains("light-theme")) {
        darkElement.textContent = "Light";
        themeIcon.src = "./icons/sun.svg";
    } else {
        body.classList.add("dark-theme");
        darkElement.textContent = "Dark";
        themeIcon.src = "./icons/moon.svg";
    }
}

initializeTheme();

// Adiciona o evento de clique para os itens do menu
elementsWithBorder.forEach(element => {
    element.addEventListener("click", () => {
        elementsWithBorder.forEach(el => el.classList.remove("active"));
        element.classList.add("active");
    });
});

// Alterna entre os temas Light e Dark
darkElement.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        darkElement.textContent = "Light";
        themeIcon.src = "./icons/sun.svg";
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        darkElement.textContent = "Dark";
        themeIcon.src = "./icons/moon.svg";
    }
});
