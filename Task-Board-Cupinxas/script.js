const mudarTema = document.getElementById("mudarTema");
const boardsList = document.getElementById("boardslist");
const boardLayout = document.getElementById("boardLayout");

const API_BASE_URL = "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard";

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

// Função para carregar os boards
async function loadBoards() {
    try {
        const response = await fetch(`${API_BASE_URL}/Boards`);
        if (!response.ok) throw new Error("Erro ao carregar boards");

        const boards = await response.json();
        populateBoardsDropdown(boards);
    } catch (error) {
        console.error("Erro ao carregar boards:", error);
    }
}

// Preenche o dropdown com boards
function populateBoardsDropdown(boards) {
    boards.forEach((board) => {
        const option = document.createElement("option");
        option.value = board.Id;
        option.textContent = board.Name;
        boardsList.appendChild(option);
    });

    // Adiciona evento de mudança para carregar colunas do board selecionado
    boardsList.addEventListener("change", (e) => {
        loadBoard(e.target.value); // Carregar colunas do board selecionado
    });
}

// Carregar as colunas de um board
async function loadBoard(boardId) {
    try {
        const response = await fetch(`${API_BASE_URL}/ColumnByBoardId?BoardId=${boardId}`);
        if (!response.ok) throw new Error("Erro ao carregar colunas");

        const columns = await response.json();
        populateColumns(columns);
    } catch (error) {
        console.error("Erro ao carregar colunas:", error);
    }
}

// Preenche o layout com as colunas
function populateColumns(columns) {
    boardLayout.innerHTML = ""; // Limpa o layout

    columns.forEach((column) => {
        const columnItem = document.createElement("article");
        columnItem.className = "column-item";

        const columnHeader = document.createElement("header");
        columnHeader.className = "column-header";
        columnHeader.innerHTML = `<h5>${column.Name}</h5>`;

        const columnBody = document.createElement("div");
        columnBody.className = "column-body";
        columnBody.id = `tasks-${column.Id}`;

        columnItem.appendChild(columnHeader);
        columnItem.appendChild(columnBody);
        boardLayout.appendChild(columnItem);

        // Busca tarefas da coluna (simulado aqui como vazio)
        fetchTasksByColumn(column.Id).then((tasks) => {
            addTasksToColumn(column.Id, tasks);
        });
    });
}

// Simula tarefas (por enquanto, vazio)
async function fetchTasksByColumn(columnId) {
    return [];
}

// Simula adição de tarefas (a ser implementado)
function addTasksToColumn(columnId, tasks) {
    console.log(`Tarefas para a coluna ${columnId}:`, tasks);
}

// Inicia o carregamento dos boards
loadBoards();
