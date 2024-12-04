
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


fetch('https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Boards', {
    method: 'POST',
    headers:{
        'Content-Type':'application/json',
    },
    body: JSON.stringify({
        name: 'Jorge',
     }),
    })
    .then((res) => res.json())
    .then((data) => console.log(data))