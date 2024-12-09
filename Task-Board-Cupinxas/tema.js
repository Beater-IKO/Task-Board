import { API_URL } from "../Task-Board-Cupinxas/config/apiConfig.js";

var email = localStorage.getItem("Email");
const usuario = document.querySelector("#usuario");
usuario.innerHTML = email;

var PersonId = localStorage.getItem("PersonId");

async function temaPadrao(PersonId) {
  const request = await fetch(`${API_URL}/PersonConfigById?PersonId=${PersonId}`);

  const data = await request.json();

  if (!request.ok) {
    throw new Error(`Ocorreu um erro na Api: ${request.status}`);
  }

  if (data.DefaultThemeId === 1) {
    console.log("Modo Escuro");
    document.querySelector("#mudarTema").textContent = "Modo Escuro";
    document.body.classList.add("tema-escuro"); // Iniciar com tema escuro
  } else {
    console.log("Modo Claro");
    document.querySelector("#mudarTema").textContent = "Modo Claro";
    document.body.classList.remove("tema-escuro"); // Iniciar com tema claro
  }
}

async function toggleTema(PersonId) {
  const request = await fetch(`${API_URL}/PersonConfigById?PersonId=${PersonId}`);
  const data = await request.json();

  if (!request.ok) {
    throw new Error(`Ocorreu um erro na API: ${request.status}`);
  }

  console.log("Dados recebidos da API:", data); // Debug para verificar o conteúdo

  const themeId = data.DefaultThemeId;

  if (!themeId) {
    console.error("DefaultThemeId não encontrado na resposta da API");
    return;
  }

  // Alterna entre o tema claro e escuro
  if (themeId === 1) {
    document.body.classList.remove("tema-escuro");
    document.querySelector("header").classList.remove("tema-escuro");
    document.querySelector("#fundo").classList.remove("tema-escuro");

    await EnviarParaApi(2); // Envia tema claro para a API
    document.querySelector("#mudarTema").textContent = "Modo Claro";
  } else {
    document.body.classList.add("tema-escuro");
    document.querySelector("header").classList.add("tema-escuro");
    document.querySelector("#fundo").classList.add("tema-escuro");

    await EnviarParaApi(1); // Envia tema escuro para a API
    document.querySelector("#mudarTema").textContent = "Modo Escuro";
  }
}

async function EnviarParaApi(themeId) {
  try {
    const response = await fetch(`${API_URL}/ConfigPersonTheme?PersonId=${PersonId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ThemeId: themeId, 
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar o tema: ${response.status}`);
    }
    console.log("Tema atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar o tema na API:", error);
  }
}

// Adiciona o evento de clique para o botão de troca de tema
document.querySelector("#mudarTema").addEventListener("click", () => toggleTema(PersonId));

// Carregar o tema padrão ao iniciar
temaPadrao(PersonId);