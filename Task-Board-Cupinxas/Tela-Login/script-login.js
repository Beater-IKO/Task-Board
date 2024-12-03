async function cliqueBotao() {
    const email = document.querySelector("#email").value;
  
    try {
      await buscarEmail(email);
    } catch (error) {
      console.log("Erro", error);
      alert("Um erro inesperado ocorreu. Tente novamente mais tarde")
    }
    
  }
  
  async function buscarEmail(email) {
    const request = await fetch(
      `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/GetPersonByEmail?Email=${email}`
    );
  
    if(!request.ok) {
        throw new Error(`Ocorreu um erro na Api: ${request.status}`);
    }

    const data = await request.json();
    
   if (email == data.Email) {
      alert("Email encontrado! Logando...");
      window.location.href = "/Task-Board-Cupinxas/Tela-Principal.html";
    } else {
      window.location.reload();
    }
  }
  