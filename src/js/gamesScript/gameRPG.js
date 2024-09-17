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

// sprites mãe
const motherWalking = [ 
    '../../img/assets/AssetsMae/maeParadaDir.png',
    '../../img/assets/AssetsMae/maeAndandoDir1.png',
    '../../img/assets/AssetsMae/maeParadaDir.png',
    '../../img/assets/AssetsMae/maeAndandoDir2.png',
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
const firstSpeech = 'Filho, eu vou dar uma saída para ir ao mercado...'
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
                                            pressEnter.src = '';
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

let motherMoving = false; // movimento da mãe é false antes de terminar o dialogo
function moveMotherToTheDoor(){
    const motherElement = document.querySelector('.mother'); //seleciona a estrutura onde esta a imagem da mãe
    const motherFrame = document.querySelector('.motherCharacter'); //seleciona o elemento html que tem a imagem da mãe
    let motherX = portaPos.x - 10 //define a posição da mãe no momento em que os sprites da mãe começam a aparecer

    const targetX = portaPos.x + 60 // define até que ponto a imagem percorrerá até que os sprites parem de aparecer
    let motherMoving = true; // define que o movimento da mãe é verdadeiro
    let motherSpeed = 5; // velocidade em que a mãe ira percorrer a tela
    let currentSprite = 0 // sprite atual que esta aparecendo na tela

    if (motherMoving) { // se a mãe estiver se movendo
        const moveInterval = setInterval(() => { // um intervalo de movimento é criado
            if (motherX < targetX) { // onde se a posição da imagem da mãe for menor que a posição do alvo 
                motherX += motherSpeed; // a posição vertical da mãe ira somar com velocidade
                motherElement.style.left = `${motherX}px`; //a posição vertical sera definida na tela
                currentSprite = (currentSprite + 1) % motherWalking.length; // o sprite atual que aparecerá na tela 
                motherFrame.src = `${motherWalking[currentSprite]}`; // define o sprite atual que aparecerá na tela  a cada 0.2 décimos
            } else { 
                clearInterval(moveInterval); // cessa o intervalo dos sprites
                motherMoving = false //movimento para se tornando falso
                setTimeout(() => { // após 0.5 décimos
                    motherFrame.src = '' // a mãe desaparece da tela
                    startTimer(motherFrame, motherElement); // timer se inicia e guarda dois parâmetros para serem reutilizados
                }, 500);
                
            }
        }, 200);
    }
}

// TIMER
function startTimer (mother, motherPos ) {
    const timer = document.querySelector('#time'); // guarda o elemento HTML onde passará o tempo
    let time = 59; // define o tempo como 59 segundos
    const timePassing = setInterval(() => { // cria um intervalo para o tempo passar cada segundo
        timer.innerText = `${time}`; // atualizará o tempo na tela
        time--; // diminui segundo no timer
        if(time == 0 ) { // quando o tempo for igual a -
            clearInterval(timePassing); // intervalo cessará
            timer.innerText = `0`; // o timer parará no 0 e não irá para números negativos
            gameOver(mother, motherPos); // guarda mais uma vez os mesmos parâmetros para serem reutilizados
        }
    }, 1000);
}

function gameOver(mother, motherPos) {
    const gameOverScreen = document.querySelector('.gameOverScreen'); // guardará a tela de gameOver
    const tryAgainButton = document.querySelector('#tryAgainButton'); // guardará o botão de reiniciar
    const parentElement = document.querySelector('.conversationBubble'); // guardará a caixa de dialogo
    const dialogue = document.querySelector('#mothersDialogue'); // guardará o local em que as falas da mãe aparecerão
    const pressEnter = new Image(); // guarda a imagem do pressEnter
    dialogue.innerHTML = ''; // dialogo reinicia 
    mother.src = '../../img/assets/AssetsMae/maeParada.png'; // Localiza a imagem do botão pressEnter
    motherPos.style.left = `${45}%`; // coloca a posição da mãe com um left de 45%
    parentElement.style.display = 'block'; // a caixa de dialogo aparece na tela

    //frases que serão utilizadas
    let firstPhrase = 'Voltei Filho! Perai... O QUE É AQUILO SUJO ALI!';
    let secondPharse = `Ta de castigo muleque! `
    let index = 0;
   

    const charGameOver = firstPhrase.split(""); //primeira frase sera dividida em letras
    const TyperGameOver = setInterval(() => { // cria um intervalo que mostrará a digitação das frases na tela
        if (index < charGameOver.length) { // se o index (o número de letras que ja passaram) for menor que o tamanho da frase de gameOver a função a baixo será executada
            dialogue.innerHTML += charGameOver[index]; // aparecerá letra a letra dentro do local dialogue do HTML
            parentElement.style.display = 'flex' // a conversa ficará visivel
            parentElement.style.justifyContent = 'center' // colocará dialogo no centro do balão de conversa digitalmente
            parentElement.style.alignItems = 'center' // colocará o dialogo no centro  do balão de conversa verticalmente
            index++ // somará o index para a próxima letra
        } else { // se index for maior ou igual ao tamanho de charGameOver
            clearInterval(TyperGameOver); //limpará o intervalo anterior
            setTimeout(() => { // cria um timeOut para aparecer depois de 1 segundo o botão de pressEnter na tela
                pressEnter.src = '../../img/assets/AssetsObjetosJogo/pressEnter.png'; // relocaliza a imagem de pressEnter
                pressEnter.classList = 'pressEnter'; //coloca a classe pressEnter no elemento pressEnter
                parentElement.appendChild(pressEnter) //E coloca pressEnter dentro do balão de conversa

                const secondGameOverSpeech = (event) => { // cria um novo intervalo de fala
                    if (event.key == 'Enter') { // se  botão clicado for Enter mais uma vez
                        dialogue.innerHTML = ''; // limpará o dialogo anterior
                        pressEnter.src = '' // a imagem de pressEnter desaparecerá
                        index = 0; // index volta a zero
                        const charGameOver2 = secondPharse.split(""); // dividirá a frase 2 em letras
                        const TyperGameOver2 = setInterval(() => { // cria uma um intervalo de digitação para as palavras a aparecerem na tela depois de 0.1s décimo
                            if (index < charGameOver2.length) {
                                dialogue.innerHTML += charGameOver2[index];
                                index++
                            } else {
                                clearInterval(TyperGameOver2); 
                                document.removeEventListener('keydown', secondGameOverSpeech); // remove o escutador keydown anterior para ser utilizado apenas uma vez
                                setTimeout(() => {
                                    gameOverScreen.style.display = 'flex'
                                    tryAgainButton.addEventListener('click', function retartGame() { // o gameOver aparéce na tela 
                                        document.location.reload(); // ao clicar no tryAgainButton o site restaurará
                                    })
                                }, 1000);
                            }
                        }, 100);
                    }
                }
                document.addEventListener('keydown', secondGameOverSpeech); // escuta se o usuário clicou no botão enter do teclado
                // CONTINUAR DAQUI
            }, 1000);
        }
    }, 100);
    
   
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


//após sumir deve ter algo que guarde qual objeto sumiu para a colisão não funcionar quando passar por cima de novo do mesmo local
//e armazenar quantos objetos foram limpos para o jogo identificar se você conseguiu ou não limpar a casa

// começa o loading para remover o objeto da tela
function startLoading() {
    let cleanObjets = 0
    if (loadingInterval) return; // evitar múltiplas execuções enquanto uma ja estiver em andamento
    loadingInterval = setInterval(() => {
        loadingProgress += 10 // barra de progresso
        document.querySelector('.barraCheia').style.width = `${loadingProgress}%`;
            if (loadingProgress >= 100) {
                clearInterval(loadingInterval)
                //remover o objeto colidido
                if (currentObject === 'lixo') {
                    drawLixo = () => {} // o lixo desaparece
                    cleanObjets+=1
                } else if (currentObject === 'cama') {
                    drawCama = () => {
                        const camaImage = new Image();
                        camaImage.src = '../../img/assets/AssetsObjetosJogo/Cama.png'
                        camaImage.onload = () => {
                            ctx.drawImage(camaImage, camaPos.x, camaPos.y, camaSize.width, camaSize.height)
                        };
                    } // a Cama é limpa
                    cleanObjets+=1
                } else if (currentObject === 'lixeira') {
                    drawLixeira = () => {
                        const lixeiraImage = new Image();
                        lixeiraImage.src = '../../img/assets/AssetsObjetosJogo/lixeira.png'
                        lixeiraImage.onload = () => {
                            ctx.drawImage(lixeiraImage, lixeiraPos.x, lixeiraPos.y-15, lixeiraSize.width-10, lixeiraSize.height-10)
                        }
                    }
                    cleanObjets+=1
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
