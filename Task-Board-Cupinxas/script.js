const boardsList = document.getElementById("boardslist");
const boardLayout = document.getElementById("boardLayout");

const API_BASE_URL = "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard";

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
        localStorage.setItem("boardId",option.value)
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

        // Busca as tarefas da coluna e as adiciona ao corpo correspondente
        fetchTasksByColumn(column.Id).then((res) => {
            addTasksToColumn(column.Id, res);
        });
    });
}


// Inicia o carregamento dos boards
loadBoards();


// ================================ TASKS =====================================


// Função para buscar as tarefas de uma coluna específica
function fetchTasksByColumn(columnId) {
    const endpoint = `${API_BASE_URL}/TasksByColumnId?ColumnId=${columnId}`;
    return fetch(endpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar tasks para ColumnId ${columnId}: ${response.status}`);
            }
            return response.json(); // Converte a resposta JSON para objeto
        })
        .catch((error) => {
            console.error(error); // Loga erros no console
            return []; // Retorna uma lista vazia em caso de erro
        });
}



// Função para adicionar as tarefas ao corpo de uma coluna
function addTasksToColumn(columnId, tasks) {
    const columnBody = document.getElementById(`tasks-${columnId}`); // Seleciona o corpo da coluna pelo ID

    tasks.forEach((task) => {
        const taskItem = document.createElement("div"); // Cria um elemento para a tarefa
        taskItem.className = "task-item";
        taskItem.innerHTML = `
            <h6>${task.Title || "Sem título"}</h6> <!-- Exibe o título da tarefa -->
            <p>${task.Description || "Sem descrição"}</p> <!-- Exibe a descrição da tarefa -->
        `;
        columnBody.appendChild(taskItem); // Adiciona a tarefa ao corpo da coluna
    });
}



/*


document.getElementById("criarColuna").addEventListener("click", () => {
    const newColumn = createNewColumn();
    boardLayout.appendChild(newColumn); // Adiciona a nova coluna ao layout
});

// Função para criar uma nova coluna
function createNewColumn() {
    // Criação de um artigo para a nova coluna
    const columnItem = document.createElement("article");
    columnItem.className = "column-item";

    // Criação do cabeçalho da coluna
    const columnHeader = document.createElement("header");
    columnHeader.className = "column-header";

    // Campo de input para o título da nova coluna
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Digite o título da coluna...";
    titleInput.className = "column-title-input"; // Estiliza o input

    // Adiciona o input ao cabeçalho
    columnHeader.appendChild(titleInput);

    // Criação do corpo da coluna (onde as tarefas serão colocadas)
    const columnBody = document.createElement("div");
    columnBody.className = "column-body";
    columnBody.id = `tasks-new`; // ID para as tarefas da nova coluna

    // Adiciona o cabeçalho e o corpo ao item da coluna
    columnItem.appendChild(columnHeader);
    columnItem.appendChild(columnBody);

    // Evento para salvar o título quando o campo de input perde o foco
    titleInput.addEventListener("blur", () => {
        if (titleInput.value.trim()) {
            columnHeader.innerHTML = `<h5>${titleInput.value.trim()}</h5>`;
        } else {
            columnHeader.innerHTML = `<h5>Nova Coluna</h5>`; // Título padrão
        }
    });

    return columnItem;
}
*/