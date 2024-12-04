
const mudarTema = document.getElementById('mudarTema');

const temaAtual = localStorage.getItem('tema');



if(temaAtual === 'escuro'){
    document.body.classList.add('tema-escuro');
    document.querySelector('header').classList.add('tema-escuro');
    document.querySelector('#fundo').classList.add('tema-escuro')
    mudarTema.textContent = 'modo claro';
} else{
    mudarTema.textContent = 'modo escuro'
}




mudarTema.addEventListener('click', () => {
    document.body.classList.toggle('tema-escuro');
    document.querySelector('header').classList.toggle('tema-escuro');
    document.querySelector('#fundo').classList.toggle('tema-escuro');




    if(document.body.classList.contains('tema-escuro')){
        localStorage.setItem('tema', 'escuro');
        mudarTema.textContent = "modo claro"; 
    } else{
        localStorage.setItem('tema', 'claro');
        mudarTema.textContent = 'modo escuro';
    }

});  


async function chamarApi(){
    const request = await fetch ('https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Board?BoardId=194')

    if(request.status === 200) {
        const data = await request.json();
        const nome = document.querySelector('#api-response');
        nome.innerHTML = data.Name;
    } else {
        alert("Erro")
    }
}

chamarApi();