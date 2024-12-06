import { API_URL } from "../Task-Board-Cupinxas/config/apiConfig.js";

var email = localStorage.getItem("Email");
const usuario = document.querySelector("#usuario");
usuario.innerHTML = email;

var PersonId = localStorage.getItem("PersonId");

async function temaPadrao(PersonId) {
  const request = await fetch(
    `${API_URL}/PersonConfigById?PersonId=${PersonId}`
  );

  const data = await request.json();

  if (!request.ok) {
    throw new Error(`Ocorreu um erro na Api: ${request.status}`);
  }

  if (data.DefaultThemeId === 1) {
    console.log("Modo Escuro");
    mudarTema.textContent = "modo escuro";
  } else {
    console.log("Modo Claro");
    document.body.classList.add("tema-escuro");
    document.querySelector("header").classList.add("tema-escuro");
    document.querySelector("#fundo").classList.add("tema-escuro");
    mudarTema.textContent = "modo claro";
  }
}
temaPadrao(PersonId);

async function mudarTema(PersonId) {
  const request = await fetch(`${API_URL}/PersonConfigById?PersonId=${PersonId}`);

  const data = await request.json();

  if (!request.ok) {
    throw new Error(`Ocorreu um erro na Api: ${request.status}`);
  }
}
