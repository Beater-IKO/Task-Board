import { API_URL } from "../config/apiConfig.js";

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); 
  const email = document.querySelector("#email").value;
  localStorage.setItem("Email",email);

  try {
    await buscarEmail(email);
  } catch (error) {
    console.log("Erro", error);
    alert("Um erro inesperado ocorreu. Tente novamente mais tarde")
  } 
 
})

async function buscarEmail(email) {
  
  const request = await fetch(`${API_URL}/GetPersonByEmail?Email=${email}`);

  if(!request.ok) {
      throw new Error(`Ocorreu um erro na Api: ${request.status}`);
  }

  const data = await request.json();

  const id = data.Id;

  console.log(id);

  localStorage.setItem("PersonId", id)


 if (email == data.Email) {
    alert("Email encontrado! Logando...");
    window.location.href = "/Task-Board-Cupinxas/Tela-Principal.html";
  } else {
    window.location.reload();
  }
}
