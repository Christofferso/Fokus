const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPause = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcon = document.querySelector('#app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('./sons/luna-rise-part-one.mp3') //pegar arquivo de audio
const sons1 = new Audio('./sons/beep.mp3')
const sons2 = new Audio('./sons/play.wav')
const sons3 = new Audio('./sons/pause.mp3')

musica.loop = true //fazer a musica se repetir
let tempoDecorrido = 1500
let intervaloId = null


 musicaFocoInput.addEventListener('change', () =>{  //trabalha com input
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
 })


focoBt.addEventListener('click', () =>{
    tempoDecorrido = 1500
   alterar('foco')
   focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () =>{
    tempoDecorrido = 300
    alterar('descanso-curto')
    curtoBt.classList.add('active') //serve para adicionar uma classe
})

longoBt.addEventListener('click', () =>{
    tempoDecorrido = 900
    /*html.setAttribute('data-contexto', 'descanso-longo')
    banner.setAttribute('src', 'imagens/descanso-longo.png')
    */
   alterar('descanso-longo')
   longoBt.classList.add('active')
})

function alterar(contexto){
    mostrarTempo()
    botoes.forEach(function(contexto){
        contexto.classList.remove('active') //remover classe
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src' , `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML =  `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;

       case"descanso-curto":
       titulo.innerHTML = ` Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>`
       
            break;

        case"descanso-longo":
        titulo.innerHTML = `Hora de voltar para superficie <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        

        default:
            break;
    }
}

const contagemRegressiva = () =>{
    if(tempoDecorrido <=0){
        sons1.play()
        alert("Tempo finalizado")
        zerar()
        return
    }
    tempoDecorrido -= 1
    //console.log('Temporizador: ' + tempoDecorrido)
    mostrarTempo()

    
}

startPause.addEventListener('click', iniciarOuPausar)
function iniciarOuPausar(){
    if(intervaloId){
        sons3.play()
        zerar()
        return
    }
    sons2.play()
     intervaloId = setInterval(contagemRegressiva, 1000)     //ele espera 2 parametros //periodo de tempo
     iniciarOuPausarBt.textContent = "Pausar"
     iniciarOuPausarBtIcon.setAttribute('src', './imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar" //ideal para inserir somente Texto
    intervaloId = null   ///interromper a execução do codigo
    iniciarOuPausarBtIcon.setAttribute('src', './imagens/play.arrow.png')
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()
