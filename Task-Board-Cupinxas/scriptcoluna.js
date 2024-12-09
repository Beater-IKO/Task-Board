document.getElementById("criarColuna").addEventListener("click", () => {
    const newColumn = createNewColumn();
    boardLayout.appendChild(newColumn); // Adiciona a nova coluna ao layout
});

// Função para criar uma nova coluna
function createNewColumn() {
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

    // Criação de um campo de entrada para adicionar novas tarefas
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.placeholder = "Digite o título da tarefa...";
    taskInput.className = "task-input"; // Estiliza o input da tarefa

    // Botão para adicionar tarefa
    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Adicionar Tarefa";
    addTaskButton.className = "add-task-button";

    // Evento para adicionar a tarefa ao corpo da coluna
    addTaskButton.addEventListener("click", () => {
        const taskTitle = taskInput.value.trim();
        if (taskTitle) {
            addTaskToColumn(columnBody, taskTitle);
            taskInput.value = ""; // Limpa o campo de input após adicionar
        }
    });

    // Evento para adicionar a tarefa pressionando enter
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addTaskButton.click();
        }
    });

    // Botão para excluir a coluna
    const deleteColumnButton = document.createElement("button");
    deleteColumnButton.textContent = "Excluir Coluna";
    deleteColumnButton.className = "delete-column-button";

    // Evento para excluir a coluna
    deleteColumnButton.addEventListener("click", () => {
        columnItem.remove(); // Remove a coluna do layout
    });

    // Adiciona o campo de entrada de tarefa e o botão ao corpo da coluna
    columnItem.appendChild(columnHeader);
    columnItem.appendChild(taskInput);
    columnItem.appendChild(addTaskButton);
    columnItem.appendChild(deleteColumnButton); // Adiciona o botão de excluir
    columnItem.appendChild(columnBody);

    // Evento para salvar o título da coluna quando o campo de título perder o foco
    titleInput.addEventListener("blur", () => {
        if (titleInput.value.trim()) {
            columnHeader.innerHTML = `<h5>${titleInput.value.trim()}</h5>`;
        } else {
            columnHeader.innerHTML = `<h5>Nova Coluna</h5>`; // Título padrão
        }
    });

    return columnItem;
}

// Função para adicionar a tarefa ao corpo da coluna
function addTaskToColumn(columnBody, taskTitle) {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.innerHTML = `<h6>${taskTitle}</h6>`; // Exibe o título da tarefa

    columnBody.appendChild(taskItem);
}
