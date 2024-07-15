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

function toggleMovement(images) {
    if (isMoving) return; // Se o personagem estiver já estiver em movimento, saia da função
    isMoving = true; // Personagem em movimento
    moveInterval = setInterval(() => {
        obj.style.backgroundImage = `${images[currentFrame]}`; // define a imagem de fundo da div para a imagem atual
        currentFrame = (currentFrame + 1) % images.length;
    }, 200);
}

function stopMovement() {
    clearInterval(moveInterval)
    isMoving = false;
    currentFrame = 0
}


ctx.fillRect(50, 50, window.innerWidth-140, window.innerHeight-100);

//movimento do personagem
var dy;
var dx; //Direction x
var px; //position x
var py;
var vel; //speed
var obj; // Which obj will move
var tmp; //timer

obj=document.querySelector('#dv1')
obj.style.backgroundImage ='url("../../img/assets/AssetsPersonagemJogo/ParadoFrente.jpg")';

function inicia() {
    dx=0;
    dy=0;
    px=50;
    py=500;
    vel=8;
    document.addEventListener('keydown', keyDown) // Acontece quando a tecla é pressionada
    document.addEventListener('keyup', keyUp) // Acontece quando a tecla é solta
    tmp=setInterval(enterFrame, 20); //20 milésimos de intervalo para cada execução do código
    drawMap();
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
    obj.style.left=px+'px'
    obj.style.top=py+'px'
   
    
}

//Desenhando o mapa do jogo
function drawMap() {
    //Sprite do mapa
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
    

    
}



//Quando a tela for carregada o jogo se inicia
window.addEventListener('load',inicia);




  
