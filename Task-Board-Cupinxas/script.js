const mudarTema = document.getElementById("mudarTema");

// Configuração inicial do tema
const temaAtual = localStorage.getItem("tema");
if (temaAtual === "escuro") {
    document.body.classList.add("tema-escuro");
    document.querySelector("header").classList.add("tema-escuro");
    document.querySelector("#fundo").classList.add("tema-escuro");
    mudarTema.textContent = "modo claro";
} else {
    mudarTema.textContent = "modo escuro";
}

// Alternar tema
mudarTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-escuro");
    document.querySelector("header").classList.toggle("tema-escuro");
    document.querySelector("#fundo").classList.toggle("tema-escuro");

    if (document.body.classList.contains("tema-escuro")) {
        localStorage.setItem("tema", "escuro");
        mudarTema.textContent = "modo claro";
    } else {
        localStorage.setItem("tema", "claro");
        mudarTema.textContent = "modo escuro";
    }
});

// Referências aos elementos do DOM
const boardsList = document.getElementById("boardslist");

// Função para carregar os boards da API
async function loadBoards() {
    try {
        const response = await fetch(
            "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Boards"
        );
        if (!response.ok) {
            throw new Error("Erro ao carregar boards");
        }
        const boards = await response.json();
        populateBoardsDropdown(boards); // Popula o dropdown com os boards retornados
    } catch (error) {
        console.error("Erro ao carregar boards:", error);
    }
}

// Função para preencher o dropdown com boards
function populateBoardsDropdown(boards) {
    boards.forEach((board) => {
        const option = document.createElement("option"); // Criar <option> para um dropdown <select>
        option.value = board.Id;
        option.textContent = board.Name;
        boardsList.appendChild(option); // Adicionar o <option> ao <select>
    });
}

// Chamar a função para carregar os boards
loadBoards();
