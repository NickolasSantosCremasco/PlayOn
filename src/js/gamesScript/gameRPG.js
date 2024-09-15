//Definindo tamanho da tela e configurando canvas
const canvas = document.querySelector('#canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx = canvas.getContext('2d');

//sprites do personagem principal

const PersonagemAndandoEsq = [
    'url("../../img/assets/AssetsPersonagemJogo/AndandoEsq1.jpg")',
    'url("../../img/assets/AssetsPersonagemJogo/AndandoEsq2.jpg")' 
]

const PersonagemAndandoCima = [
    'url("../../img/assets/AssetsPersonagemJogo/AndandoCima1.jpg")',
    'url("../../img/assets/AssetsPersonagemJogo/AndandoCima2.jpg")'  
]

const PersonagemAndandoBaixo = [
    'url("../../img/assets/AssetsPersonagemJogo/AndandoParaBaixo1.jpg")',
    'url("../../img/assets/AssetsPersonagemJogo/AndandoParaBaixo2.jpg")' 
]

const PersonagemAndandoDir = [
    'url("../../img/assets/AssetsPersonagemJogo/AndandoDir1.jpg")',
    'url("../../img/assets/AssetsPersonagemJogo/AndandoDir2.jpg")' 
]



let isMoving = false
let currentFrame = 0
let moveInterval;

//animação de movimento do personagem
function toggleMovement(images) {
    if (isMoving) return; // Se o personagem estiver já estiver em movimento, saia da função
    isMoving = true; // Personagem em movimento
    moveInterval = setInterval(() => {
        obj.style.backgroundImage = `${images[currentFrame]}`; // define a imagem de fundo da div para a imagem atual
        currentFrame = (currentFrame + 1) % images.length;
    }, 200);
}

//para a animação de movimento assim que a tecla é solta
function stopMovement() {
    clearInterval(moveInterval)
    isMoving = false;
    currentFrame = 0
}


//movimento do personagem
var dy;
var dx; 
var px; 
var py; 
var vel;
var obj;
var tmp; 

obj = document.querySelector('#dv1')
obj.style.backgroundImage ='url("../../img/assets/AssetsPersonagemJogo/ParadoFrente.jpg")';

// Tamanhos e Posições dos Objetos
//Lixo 
const lixoPos = {x:(window.innerWidth*75)/100, y:(window.innerHeight*30)/100}
const lixoSize = {width:100, height: 100}
//Cama
const camaPos = {x:(window.innerWidth*16)/100, y:(window.innerHeight*25)/100}
const camaSize = {width:80, height:130}
// tapete
const tapetePos = {x:(window.innerWidth*10)/100, y:(window.innerHeight*18)/100}
const tapeteSize = {width:250, height:250}
// porta
const portaPos = {x:(window.innerWidth*42)/100, y:(canvas.height*58)/100}
const portaSize = {width:240, height:240}
// lixeira
const lixeiraPos = {x:(window.innerWidth*53)/100, y:(window.innerHeight*72)/100}
const lixeiraSize = {width:150, height:150}
let currentObject = null


function drawLixeira () {
    const lixeiraImage = new Image();
    lixeiraImage.src = '../../img/assets/AssetsObjetosJogo/lixeiraSuja.png'
    lixeiraImage.onload = () => {
        ctx.drawImage(lixeiraImage, lixeiraPos.x, lixeiraPos.y, lixeiraSize.width, lixeiraSize.height);
    }
}

function drawPorta () {
    const portaImage = new Image();
    portaImage.src = '../../img/assets/AssetsObjetosJogo/porta.png'
    portaImage.onload = () => {
        ctx.drawImage(portaImage, portaPos.x, portaPos.y, portaSize.width, portaSize.height);
    }
}

function drawLixo() {
    const lixoImage = new Image();
    lixoImage.src = '../../img/assets/AssetsObjetosJogo/lixo.png'
    lixoImage.onload = () => {
        ctx.drawImage(lixoImage,lixoPos.x, lixoPos.y, lixoSize.width, lixoSize.height )
    };
}
function drawCama() {
    const camaImage = new Image();
    camaImage.src = '../../img/assets/AssetsObjetosJogo/CamaDesarrumada.jpg';
    camaImage.onload = () => {
        ctx.drawImage(camaImage, camaPos.x, camaPos.y, camaSize.width, camaSize.height)
    };
} 

function drawTapete () {
    const tapeteImage = new Image();
    tapeteImage.src = '../../img/assets/AssetsObjetosJogo/Tapete.png';
    tapeteImage.onload = () => {
        ctx.drawImage(tapeteImage, tapetePos.x, tapetePos.y, tapeteSize.width, tapeteSize.height);
    };
}
 


// função que é responsável por todos os objetos interagívei que aparecem na tela
function drawObjects() {
    drawTapete();
    drawLixo();
    drawCama();
    drawLixeira();
    drawPorta();
    
}

function keyDown() {
    var tecla = event.key; // Pega o valor de qual tecla foi apertada
    if (tecla== "ArrowLeft" ) { // se for esquerda ela diminui a posição em 1 para esquerda, segue-se o mesmo raciocínio abaixo
        dx=-1; 
       toggleMovement(PersonagemAndandoEsq)
    } else if (tecla == "ArrowRight") {
        dx=1;
        toggleMovement(PersonagemAndandoDir)
    } else if (tecla == "ArrowUp") {
        dy=-1
        toggleMovement(PersonagemAndandoCima)
    } else if (tecla == "ArrowDown") {
        dy=1
        toggleMovement(PersonagemAndandoBaixo)
    }
}


function keyUp() {
    var tecla = event.key; 
    if (tecla=="ArrowLeft" ) { //se soltar a tecla ela irá ficar em 0 e não se moverá, segue-se o mesmo raciocínio abaixo
        dx=0;
        stopMovement()
        obj.style.backgroundImage ='url("../../img/assets/AssetsPersonagemJogo/ParadoEsq.jpg")';
    }  else if (tecla == "ArrowRight" ) { 
        dx=0;
        stopMovement()
        obj.style.backgroundImage ='url("../../img/assets/AssetsPersonagemJogo/ParadoDir.jpg")';
    }  else if (tecla == "ArrowDown") {
        dy=0
        stopMovement()
        obj.style.backgroundImage ='url("../../img/assets/AssetsPersonagemJogo/ParadoFrente.jpg")';
    } else if (tecla == "ArrowUp") {
        dy=0
        stopMovement()
        obj.style.backgroundImage ='url("../../img/assets/AssetsPersonagemJogo/ParadoCima.jpg")';
    }
}

//  barra de loading 
let loadingInterval = null;
let loadingProgress = 0

//atualiza os frames do jogo, atualizações das posições e tamanho do mapa
function enterFrame() {
    var nextPx = px + dx * vel; //positionX + directionX * Speed
    var nextPy = py + dy * vel
   
    if (nextPx < 50) {
        nextPx = 50;
    } else if (nextPx + obj.offsetWidth > window.innerWidth-38) {
        nextPx = (window.innerWidth - obj.offsetWidth) -38; // page width - element width
    }

    if (nextPy < 50) {
        nextPy = 50;
    } else if (nextPy + obj.offsetWidth > window.innerHeight-90) {
        nextPy = (window.innerHeight - obj.offsetWidth) - 90;
    }

    py = nextPy
    px = nextPx;

    //atualização do movimento do personagem na tela
    obj.style.left=px+'px'
    obj.style.top=py+'px' 
      
    // se existir colisão com os objetos faça:
    const collidedObject = checkColissionWithObjects(); // procura se tem colisão com objetos
    if (collidedObject) {
        if (currentObject !== collidedObject) { // se o objeto atual for diferente do objeto colidido
            currentObject = collidedObject; // faça o objeto colidido virar o atual
            loadingProgress = 0;
        }
    document.querySelector('.barra').style.display = 'block'   // barra de loading irá aparecer na tela
    startLoading();
    console.log(checkColissionWithObjects())
   } else {
    currentObject = null; 
    stopLoading(); // se não houver colisão o loading para de ocorrer
   }
    // Verifica a proximidade com objetos

    //função da fala da mãe
    
}



//elemento HTML em que as falas da Mãe aparecerão na tela
const elementHtml = document.querySelector('#mothersDialogue');
//falas da mãe
const firstSpeech = 'Filho, eu vou dar uma saída para ir no mercado...'
const secondSpeech = 'Então quando eu voltar eu quero essa casa LIMPA!'


const lettersInterval = 50 //tempo em que as letras aparecerão na tela

//FUNÇÃO QUE EXECUTARÁ O DIALOGO DA MÃE COM O FILHO.
function motherConversation(text,text2, el, Interval) {
    
    const char = text.split("");// Divide o Texto em letras
    el.innerHTML = ''; // limpa o texto anterior
    let index = 0; //controla o índice atual da letra

    const typer = setInterval(() => {
        if (index < char.length) {
            el.innerHTML += char[index]; //adiciona uma letra de cada vez na frase
            index++ //Index é Incrementando
        } else { // quando o index for do tamanho de char
            clearInterval(typer); //limpa o intervalo para não ser executado desnecessariamente
            setTimeout(() => { /// cria um evento que acontecera depois de 3 segundos
                const parentElement = document.querySelector('.conversationBubble'); // seleciona o elemento pai da conversa, onde esta aparecendo o dialogo
                const pressEnter = new Image(); // press enterEnter é definido como uma imagem
                pressEnter.src = '../../img/assets/AssetsObjetosJogo/pressEnter.png' ; // pressEnter recebe uma imagem
                pressEnter.classList = 'pressEnter' // a classe pressEnter é adicionada a variável pressEnter
                parentElement.appendChild(pressEnter) // e por fim press Enter é criado na tela

                const firstEnter = (event) => { // cria um evento que identificará qual tecla foi clicada no teclado
                    if (event.key === "Enter") { // se a tecla clicada for enter executa a função abaixo
                        document.removeEventListener('keydown', firstEnter); // o evento de escuta da tecla funciona uma vez depois é descartado para reutilizações abaixo
                        el.innerHTML = ''; // limpa o dialogo anterior
                        pressEnter.src = '' ; // limpa a imagem de pressEnter anterior
                        index = 0; // index do dialogo volta a zero
                        const char2 = text2.split(""); // divide o texto 2 em letras
                        const typer2 = setInterval(() => { // repete as funções anteriores
                            if (index < char2.length) {
                                el.innerHTML += char2[index];
                                index++
                            } else {
                                clearInterval(typer2);
                                setTimeout(() =>{
                                    pressEnter.src = '../../img/assets/AssetsObjetosJogo/pressEnter.png' ;
                                    pressEnter.classList = 'pressEnter'
                                    parentElement.appendChild(pressEnter)
                                    const secondEnter = (event) => { // cria um segundo evento que identificará qual tecla foi clicada no teclado
                                        if (event.key === "Enter") { // se a tecla for Enter
                                            document.removeEventListener('keydown', secondEnter); // descarta mais uma vez o evento de escuta da tecla
                                            parentElement.style.display = 'none' 
                                            moveMotherToTheDoor();

                                        }
                                    };

                                    document.addEventListener('keydown', secondEnter) // realiza um evento para quando o usuário clicar no enter pela segunda vez
                                }, 1000);
                            }
                        }, Interval);
                       };
                    
                }
                document.addEventListener('keydown', firstEnter) // realiza um evento para quando o usuário clicar no enter pela primeira vez
            }, 1000);
        };
    }, Interval);
    
};

//função do movimento da mãe até a porta

let motherMoving = false
function moveMotherToTheDoor(){
    // sprites mãe 
    const motherWalking = [
        '../../img/assets/AssetsMae/maeParadaDir.png',
        '../../img/assets/AssetsMae/maeAndandoDir1.png',
        '../../img/assets/AssetsMae/maeParadaDir.png',
        '../../img/assets/AssetsMae/maeAndandoDir2.png',
    ]
    const motherElement = document.querySelector('.mother')
    const motherFrame = document.querySelector('.motherCharacter')
    let motherX = parseInt(motherElement.style.left) || portaPos.x - 10

    const targetX = portaPos.x + 60
    let motherMoving = true;
    let motherSpeed = 5;
    let currentSprite = 0

    if (motherMoving) {
        const moveInterval = setInterval(() => {
            if (motherX < targetX) {
                motherX += motherSpeed;
                motherElement.style.left = `${motherX}px`;
                currentSprite = (currentSprite + 1) % motherWalking.length;
                motherFrame.src = `${motherWalking[currentSprite]}`;
            } else {
                clearInterval(moveInterval);
                motherMoving = false
                setTimeout(() => {
                    motherFrame.src = ''
                    startTimer();
                }, 500);
                
            }
        }, 200);
    }
}


function startTimer () {
    const timer = document.querySelector('#time');
    let time = 10
    setInterval(() => {
        timer.innerText = `${time}`
        time--
        if(time == 0 ) {

        }
    }, 1000);
}

//Desenhando o mapa do jogo
function drawMap() {
    //Sprite do mapa
    const WallSprite = new Image()
    WallSprite.src = '../../img/assets/gameRPG/parede.png'
    WallSprite.onload = () => {
        for (let i = -100; i < canvas.width; i+=50 ) {
            for(let j = 0; j < canvas.height; j+=50) {
                ctx.drawImage (WallSprite,i,j,50,50)
            }
        }
    }
    const WoodSprite = new Image()
    WoodSprite.src = '../../img/assets/gameRPG/spriteChao.jpeg'
    //Desenhando o jogo
    WoodSprite.onload = () => {
        //Desenhando o chão
        for( let i=50; i < canvas.width - 80; i+=50) {
            for(let j= 50; j < canvas.height -90; j+=50) {
                ctx.drawImage(WoodSprite, i, j, 50, 50)
            }
        }     
    } 
    setTimeout(() => { // tera um intervalo de 100 centésimos para carregar os objetos no mapa para não haver nenhum problema de renderização
        drawObjects();
    }, 100);
    
}

// checar colisão com objetos do mapa
function checkColissionWithObjects() {
    if (px < lixoPos.x + lixoSize.width && px + obj.offsetWidth > lixoPos.x && py < lixoPos.y + lixoSize.height && py + obj.offsetHeight > lixoPos.y) { 
        return 'lixo'
    } else if (px < camaPos.x + camaSize.width && px + obj.offsetWidth > camaPos.x && py < camaPos.y + camaSize.height && py + obj.offsetHeight > camaPos.y) {
        return 'cama'
    } else if (px < lixeiraPos.x + lixeiraSize.width && px + obj.offsetWidth > lixeiraPos.x && py < lixeiraPos.y + lixeiraSize.height && py + obj.offsetHeight > lixeiraPos.y) {
        return 'lixeira'
    }
    return null
}

// começa o loading para remover o objeto da tela
function startLoading() {
    if (loadingInterval) return; // evitar múltiplas execuções enquanto uma ja estiver em andamento
    loadingInterval = setInterval(() => {
        loadingProgress += 10 // barra de progresso
        document.querySelector('.barraCheia').style.width = `${loadingProgress}%`;
            if (loadingProgress >= 100) {
                clearInterval(loadingInterval)
                //remover o objeto colidido
                if (currentObject === 'lixo') {
                    drawLixo = () => {} // o lixo desaparece
                } else if (currentObject === 'cama') {
                    drawCama = () => {
                        const camaImage = new Image();
                        camaImage.src = '../../img/assets/AssetsObjetosJogo/Cama.png'
                        camaImage.onload = () => {
                            ctx.drawImage(camaImage, camaPos.x, camaPos.y, camaSize.width, camaSize.height)
                        };
                    } // a Cama desaparece
                } else if (currentObject === 'lixeira') {
                    drawLixeira = () => {
                        const lixeiraImage = new Image();
                        lixeiraImage.src = '../../img/assets/AssetsObjetosJogo/lixeira.png'
                        lixeiraImage.onload = () => {
                            ctx.drawImage(lixeiraImage, lixeiraPos.x, lixeiraPos.y-15, lixeiraSize.width-10, lixeiraSize.height-10)
                        }
                    }
                }
                drawMap() // redesenha o mapa acima do lixo desaparecido
            }
        }, 200
    );
}

// o loading reseta
function stopLoading () {
    clearInterval(loadingInterval);
    loadingInterval = null;
    loadingProgress = 0;
    document.querySelector('.barraCheia').style.width = '0%'
    document.querySelector('.barra').style.display = 'none';
}

// função que predefine movimento do personagem e inicia todo o jogo
function begin() {
    dx=0;
    dy=0;
    px=60; // posiçao X inicial do Personagem
    py=490; // posição Y inicial do Personagem
    vel=8;
    document.addEventListener('keydown', keyDown) // Acontece quando a tecla é pressionada
    document.addEventListener('keyup', keyUp) // Acontece quando a tecla é solta
    tmp=setInterval(enterFrame, 20); //20 milésimos de intervalo para cada execução do código
    drawMap();
    
    motherConversation(firstSpeech, secondSpeech, elementHtml, lettersInterval);
}

//Quando a tela for carregada o jogo se inicia
window.addEventListener('load',begin);
