// Definindo o tamanho da tela e configurando o canvas
const canvas = document.querySelector('#canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx = canvas.getContext('2d');

/* 
Definição dos sprites para o personagem principal em várias direções
*/
const PersonagemAndandoEsq = [
    'url("../../img/assets/AssetsFilho/AndandoEsq1.png")',
    'url("../../img/assets/AssetsFilho/paradoEsq.png")',
    'url("../../img/assets/AssetsFilho/AndandoEsq2.png")',
    'url("../../img/assets/AssetsFilho/paradoEsq.png")',
]

const PersonagemAndandoCima = [
    'url("../../img/assets/AssetsFilho/AndandoCima1.png")',
    'url("../../img/assets/AssetsFilho/paradoCima.png")',
    'url("../../img/assets/AssetsFilho/AndandoCima2.png")', 
    'url("../../img/assets/AssetsFilho/paradoCima.png")',
]

const PersonagemAndandoBaixo = [
    'url("../../img/assets/AssetsFilho/AndandoBaixo1.png")',
    'url("../../img/assets/AssetsFilho/paradoBaixo.png")',
    'url("../../img/assets/AssetsFilho/AndandoBaixo2.png")',
    'url("../../img/assets/AssetsFilho/paradoBaixo.png")',
]

const PersonagemAndandoDir = [
    'url("../../img/assets/AssetsFilho/AndandoDir1.png")',
    'url("../../img/assets/AssetsFilho/paradoDir.png")',
    'url("../../img/assets/AssetsFilho/AndandoDir2.png")',
    'url("../../img/assets/AssetsFilho/paradoDir.png")', 
]

/* 
Sprites da mãe:
*/
const motherWalking = [ 
    '../../img/assets/AssetsMae/maeParadaDir.png',
    '../../img/assets/AssetsMae/maeAndandoDir1.png',
    '../../img/assets/AssetsMae/maeParadaDir.png',
    '../../img/assets/AssetsMae/maeAndandoDir2.png',
]

/* 
Variáveis de controle de movimento e animação:
- isMoving: booleano que indica se o personagem está em movimento.
- currentFrame: controla o frame atual da animação.
- moveInterval: intervalo da animação de movimento.
*/
let isMoving = false;
let currentFrame = 0;
let moveInterval;

/* 
Função toggleMovement:
- Recebe um array de imagens (sprites).
- Alterna os sprites do personagem enquanto ele está se movendo.
- Se o personagem já estiver se movendo, a função não faz nada.
*/
function toggleMovement(images) {
    if (isMoving) return;
    isMoving = true;
    moveInterval = setInterval(() => {
        obj.style.backgroundImage = `${images[currentFrame]}`;
        currentFrame = (currentFrame + 1) % images.length;
    }, 200);
}

/* 
Função stopMovement:
- Para a animação de movimento do personagem.
- Limpa o intervalo e reseta as variáveis de controle de movimento.
*/
function stopMovement() {
    clearInterval(moveInterval);
    isMoving = false;
    currentFrame = 0;
}

/* 
Variáveis adicionais para o controle de movimento:
*/
var dy;
var dx; 
var px; 
var py; 
var vel;
var obj;
var tmp;

/* 
Efeito sonoros ao limpar um objeto
*/
const audio = new Audio('../../audio/pickupCoin.wav');

/* 
Seleciona o elemento HTML do personagem e define seu sprite inicial 
*/
obj = document.querySelector('#dv1');
obj.style.backgroundImage = 'url("../../img/assets/AssetsFilho/paradoBaixo.png")';

/* 
Definição das posições e tamanhos dos objetos interativos no jogo (lixo):
- As posições e tamanhos são definidos em porcentagem da largura e altura da janela.
*/
//Lixo 
const lixoPos = {x:(window.innerWidth*75)/100, y:(window.innerHeight*30)/100};
const lixoSize = {width:100, height: 100};
//Cama
const camaPos = {x:(window.innerWidth*16)/100, y:(window.innerHeight*25)/100};
const camaSize = {width:80, height:130};
// tapete
const tapetePos = {x:(window.innerWidth*10)/100, y:(window.innerHeight*18)/100};
const tapeteSize = {width:250, height:250};
// porta
const portaPos = {x:(window.innerWidth*42)/100, y:(canvas.height*58)/100};
const portaSize = {width:240, height:240};
// lixeira
const lixeiraPos = {x:(window.innerWidth*53)/100, y:(window.innerHeight*72)/100};
const lixeiraSize = {width:150, height:150};
//closet
const closetPos = {x:(window.innerWidth*30)/100, y:(window.innerHeight*8)/100};
const closetSize = {width:100, height:150};
let currentObject = null;
//portaParaTrocar
const ClosetDoorPos = {x:(window.innerWidth*38)/100, y:(window.innerHeight*11)/100};
const ClosetDoorSize = {width:55, height:125};
//mesaSuja
const tablePos = {x:(window.innerWidth*80)/100, y:(window.innerHeight*55)/100};
const tableSize = {width:85, height:180}
//Funções que desenharão os objetos unitariamente na tela
function drawLixeira () {
    const lixeiraImage = new Image();
    lixeiraImage.src = '../../img/assets/AssetsObjetosJogo/lixeiraSuja.png'
    lixeiraImage.onload = () => {
        ctx.drawImage(lixeiraImage, lixeiraPos.x, lixeiraPos.y, lixeiraSize.width, lixeiraSize.height);
    }
};

function drawPorta () {
    const portaImage = new Image();
    portaImage.src = '../../img/assets/AssetsObjetosJogo/porta.png'
    portaImage.onload = () => {
        ctx.drawImage(portaImage, portaPos.x, portaPos.y, portaSize.width, portaSize.height);
    }
};

function drawLixo() {
    const lixoImage = new Image();
    lixoImage.src = '../../img/assets/AssetsObjetosJogo/lixo.png'
    lixoImage.onload = () => {
        ctx.drawImage(lixoImage,lixoPos.x, lixoPos.y, lixoSize.width, lixoSize.height )
    };
};
function drawCama() {
    const camaImage = new Image();
    camaImage.src = '../../img/assets/AssetsObjetosJogo/CamaDesarrumada.jpg';
    camaImage.onload = () => {
        ctx.drawImage(camaImage, camaPos.x, camaPos.y, camaSize.width, camaSize.height)
    };
} ;

function drawTapete () {
    const tapeteImage = new Image();
    tapeteImage.src = '../../img/assets/AssetsObjetosJogo/Tapete.png';
    tapeteImage.onload = () => {
        ctx.drawImage(tapeteImage, tapetePos.x, tapetePos.y, tapeteSize.width, tapeteSize.height);
    };
};
 
function drawCloset () {
    const closetImage = new Image();
    closetImage.src = '../../img/assets/AssetsObjetosJogo/ArmarioQuebrado.jpg';
    closetImage.onload = () => {
        ctx.drawImage(closetImage, closetPos.x, closetPos.y, closetSize.width, closetSize.height);
    };
};

function drawTable() {
    const tableImage = new Image();
    tableImage.src = '../../img/assets/AssetsObjetosJogo/mesaDesarrumada.png';
    tableImage.onload = () => {
        ctx.drawImage(tableImage, tablePos.x, tablePos.y, tableSize.width, tableSize.height);
    };
}

function drawClosetDoor () {
    const ClosetDoorImage = new Image();
    ClosetDoorImage.src = '../../img/assets/AssetsObjetosJogo/portaArrumada.jpg';
    ClosetDoorImage.onload = () => {
        // Salva o estado atual do contexto
        ctx.save();
        // Move a origem para o centro da porta (para rotacionar em torno do centro)
        ctx.translate(ClosetDoorPos.x + ClosetDoorSize.width / 2, ClosetDoorPos.y + ClosetDoorSize.height / 2);
        // Rotaciona o canvas em radianos (ângulo negativo gira para a esquerda)
        const rotationAngle = -Math.PI / 8; // Gira 22.5 graus para a esquerda (ajuste conforme necessário)
        ctx.rotate(rotationAngle);
        // Desenha a imagem no novo sistema de coordenadas com origem e rotação
        ctx.drawImage(
            ClosetDoorImage,
            -ClosetDoorSize.width / 2, 
            -ClosetDoorSize.height / 2,
            ClosetDoorSize.width,
            ClosetDoorSize.height
        );

        // Restaura o estado original do contexto (sem a rotação)
        ctx.restore();
    }
}


// função que é responsável por todos os objetos interagíveiS que aparecem na tela
function drawObjects() {
    drawTapete();
    drawLixo();
    drawCama();
    drawLixeira();
    drawCloset();
    drawClosetDoor();
    drawPorta();
    drawTable();
    
};

// FUNÇÃO DE MOVIMENTO DO PERSONAGEM PRINCIPAL
let isMovementDisabled = false
function keyDown() {
    if (isMovementDisabled) return; 

    var tecla = event.key; 
    if (tecla== "ArrowLeft" ) { 
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
};

//FUNÇÃO DE PARADA DO PERSONAGEM PRINCIPAL
function keyUp() {
    if (isMovementDisabled) return;
    var tecla = event.key; 
    if (tecla=="ArrowLeft" ) { 
        stopMovement()
        obj.style.backgroundImage ='url("../../img/assets/AssetsFilho/paradoEsq.png")';
    }  else if (tecla == "ArrowRight" ) { 
        dx=0;
        stopMovement()
        obj.style.backgroundImage ='url("../../img/assets/AssetsFilho/paradoDir.png")';
    }  else if (tecla == "ArrowDown") {
        dy=0
        stopMovement()
        obj.style.backgroundImage ='url("../../img/assets/AssetsFilho/paradoBaixo.png")';
    } else if (tecla == "ArrowUp") {
        dy=0
        stopMovement()
        obj.style.backgroundImage ='url("../../img/assets/AssetsFilho/paradoCima.png")';
    }
};

//FUNÇÃO QUE DESATIVA O EVENTO DE MOVIMENTAÇÃO DO PERSONAGEM
function disableMovement() {
    isMovementDisabled = true; 
    dx = 0; 
    dy = 0; 
    stopMovement(); 
    obj.style.backgroundImage = 'url("../../img/assets/AssetsFilho/paradoBaixo.png")'; 
    document.removeEventListener('keyup', keyUp); 
    document.removeEventListener('keydown', keyDown); 

};

//FUNÇÃO QUE ATIVA O EVENTO DE MOVIMENTAÇÃO DO PERSONAGEM
function enableMovement() {
    isMovementDisabled = false;
    document.addEventListener('keyup', keyUp);
    document.addEventListener('keydown', keyDown); 
};
//  barra de loading 
let loadingInterval = null;
let loadingProgress = 0;

//FUNÇÃO INICIALIZADORA DO JOGO
/*
Irá definir a posição inicial do personagem na tela e definir seu sprte padrão
*/
function initializeGame() { 
    px = 100;
    py = 500;
    obj.style.left = px + 'px'; 
    obj.style.top = py + 'px'; 
    obj.style.backgroundImage = 'url("../../img/assets/AssetsFilho/paradoBaixo.png")';
    disableMovement();
}



//atualiza os frames do jogo, atualizações das posições e tamanho do mapa
function enterFrame() {
    if (isMovementDisabled) return; 
    var nextPx = px + dx * vel; 
    var nextPy = py + dy * vel;
   
    if (nextPx < 50) {
        nextPx = 50;
    } else if (nextPx + obj.offsetWidth > window.innerWidth-38) {
        nextPx = (window.innerWidth - obj.offsetWidth) -38; 
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
    // se existir colisão com os objetos
    /*
    o objeto atual se tornará um objeto com colisão e a barra de progresso começara a rodar e aparecer na tela
     */
    const collidedObject = checkColissionWithObjects(); 
    if (collidedObject) {
        if (currentObject !== collidedObject) { 
            currentObject = collidedObject; 
            loadingProgress = 0;
        }
    document.querySelector('.barra').style.display = 'block'  
    startLoading();
  
   } else {
    currentObject = null; 
    stopLoading(); 
   }
}
const elementHtml = document.querySelector('#mothersDialogue');

const firstSpeech = 'Filho, eu vou dar uma saída para ir ao mercado...';
const secondSpeech = 'Então quando eu voltar eu quero essa casa LIMPA!';

const lettersInterval = 50; 
// FUNÇÃO QUE EXECUTARÁ O DIÁLOGO DA MÃE COM O FILHO.
function motherConversation(text, text2, el, Interval) {
    disableMovement(); 
    /* 
    Divide o texto em letras e limpa o diálogo anterior:
    - O texto é dividido em caracteres individuais e exibido letra por letra.
    - O diálogo anterior é removido da tela antes de começar o novo.
    */
    const char = text.split("");
    el.innerHTML = ''; 
    let index = 0;
    const typer = setInterval(() => {
        if (index < char.length) {
            el.innerHTML += char[index];
            index++;
        } else {
            clearInterval(typer); 
            setTimeout(() => {
                const parentElement = document.querySelector('.conversationBubble');
                const pressEnter = new Image();
                pressEnter.src = '../../img/assets/AssetsObjetosJogo/pressEnter.png';
                pressEnter.classList = 'pressEnter';
                parentElement.appendChild(pressEnter);

                /* 
                Evento que escuta a tecla Enter:
                - Se a tecla Enter for pressionada, o segundo diálogo será exibido letra por letra.
                - A imagem de "Press Enter" será removida após o evento.
                */
                const firstEnter = (event) => {
                    if (event.key === "Enter") {
                        document.removeEventListener('keydown', firstEnter);
                        el.innerHTML = ''; 
                        pressEnter.src = '';
                        index = 0;
                        
                        /* 
                        Divide o segundo texto em caracteres e exibe-o:
                        - Mesma lógica do primeiro diálogo, exibindo o texto aos poucos.
                        */
                        const char2 = text2.split("");
                        const typer2 = setInterval(() => {
                            if (index < char2.length) {
                                el.innerHTML += char2[index];
                                index++;
                            } else {
                                clearInterval(typer2);

                                /*
                                Após o segundo diálogo, exibe a imagem "Press Enter" novamente e cria um evento de Enter:
                                - Após o segundo "Enter", o movimento da mãe até a porta começa.
                                */
                                setTimeout(() => {
                                    pressEnter.src = '../../img/assets/AssetsObjetosJogo/pressEnter.png';
                                    pressEnter.classList = 'pressEnter';
                                    parentElement.appendChild(pressEnter);

                                    const secondEnter = (event) => {
                                        if (event.key === "Enter") {
                                            document.removeEventListener('keydown', secondEnter);
                                            parentElement.style.display = 'none';
                                            pressEnter.src = '';
                                            moveMotherToTheDoor(); // Inicia o movimento da mãe após o diálogo.
                                        }
                                    };

                                    document.addEventListener('keydown', secondEnter);
                                }, 1000);
                            }
                        }, Interval);
                    };
                };
                document.addEventListener('keydown', firstEnter);
            }, 1000);
        };
    }, Interval);
}

// FUNÇÃO DO MOVIMENTO DA MÃE ATÉ A PORTA
/*
Define a velocidade, troca de sprites da mãe e o momento em que ela desaparece do mapa
*/
function moveMotherToTheDoor() {
    const motherElement = document.querySelector('.mother');
    const motherFrame = document.querySelector('.motherCharacter');
    let motherX = portaPos.x - 10; 
    const targetX = portaPos.x + 60; 
    let motherMoving = true;
    let motherSpeed = 5; 
    let currentSprite = 0; 
    if (motherMoving) {
        const moveInterval = setInterval(() => {
            if (motherX < targetX) {
                motherX += motherSpeed;
                motherElement.style.left = `${motherX}px`;
                currentSprite = (currentSprite + 1) % motherWalking.length;
                motherFrame.src = `${motherWalking[currentSprite]}`;
            } else {
                clearInterval(moveInterval);
                motherMoving = false;
                
                setTimeout(() => {
                    motherFrame.src = '';
                    startTimer(motherFrame, motherElement);
                }, 500);
            }
        }, 200);
    }
}

// Função TIMER
/*
Quando o timer começar a correr o personagem poderá andar pela tela
*/
function startTimer(mother, motherPos) {
    enableMovement();
    const timer = document.querySelector('#time');
    let time = 30;

    const timePassing = setInterval(() => {
        timer.innerText = `0:${time}`;
        time--;

        // Condição de vitória (Limpeza de 5 objetos).
        if (cleanObjets == 5) {
            clearInterval(timePassing);
            timer.innerText = `0`;
            victory(mother, motherPos, time); 
        
        // Condição de derrota (tempo esgotado).
        } else if (time == 0) {
            clearInterval(timePassing);
            timer.innerText = `0`;
            gameOver(mother, motherPos); 
        }
    }, 1000); 
}


//FUNÇÃO DE VITÓRIA
/*
Se a casa for limpa a tempo a função será chamada e executará as falas de vitória da mãe
*/
function victory(mother, motherPos, time) {

    disableMovement();
    
    const victoryScreen = document.querySelector('.victoryScreen');
    const playAgainScreen = document.querySelector('#playAgainButton');
    const timeToDoTheTask = document.querySelector('#TimeToDoTheTasks');
    const parentElement = document.querySelector('.conversationBubble'); 
    const dialogue = document.querySelector('#mothersDialogue');
    const pressEnter = new Image(); 
        
    dialogue.innerHTML = '';
    mother.src = '../../img/assets/AssetMae/maeParada.png'
    motherPos.style.left = `${45}%`; 
    parentElement.style.display = 'block'; 
    let firstPhrase = 'Cheguei Filho, olha só em... fez exatamente o que eu pedi! :)';
    let secondPharse = `Não fez mais que a obrigação! ;)`;
    let index = 0;
        
    const charVictory = firstPhrase.split("");

    /*Mostrará as frases de vitória da mãe */
    const TyperVictory = setInterval(() => {
            if (index < charVictory.length) {
                dialogue.innerHTML += charVictory[index];
                parentElement.style.display = 'flex'; 
                parentElement.style.justifyContent = 'center'; 
                parentElement.style.alignItems = 'center'; 
                index++;

            } else {
                clearInterval(TyperVictory);
                setTimeout(() => {
                    pressEnter.src = '../../img/assets/AssetsObjetosJogo/pressEnter.png'; 
                    pressEnter.classList = 'pressEnter'; 
                    parentElement.appendChild(pressEnter); 
                    
                    const secondVictorySpeech = (event) => {
                        if (event.key == 'Enter') {
                            index = 0;
                            dialogue.innerHTML = ''; 
                            pressEnter.src = ''; 

                            const charVictory2 = secondPharse.split(""); 
                            const TyperVictory2 = setInterval(() => {
                                if(index < charVictory2.length) {
                                    dialogue.innerHTML += charVictory2[index];
                                    index++;    
                                } else {
                                    clearInterval(TyperVictory2);
                                    document.removeEventListener('keydown', secondVictorySpeech);
                                    setTimeout(() => {
                                        victoryScreen.style.display = 'flex' 
                                        result = 30 - time
                                        timeToDoTheTask.innerHTML = `Parabéns! Você limpou a casa em ${result} <br> segundos`
                                        playAgainScreen.addEventListener('click', function retartGame() {  
                                            document.location.reload(); 
                                        })
                                    }, 1000);
                                }
                            }, 100);
                        }
                    }
                    document.addEventListener('keydown', secondVictorySpeech);

                }, 1000);
            }
        }, 100);
    
    
}

//FUNÇÃO DE GAME OVER
/*
Detectará quando o tempo acabar e colocará os dialogos da mãe na tela
*/
function gameOver(mother, motherPos) {

        disableMovement();
        
        const gameOverScreen = document.querySelector('.gameOverScreen'); 
        const tryAgainButton = document.querySelector('#tryAgainButton'); 
        const parentElement = document.querySelector('.conversationBubble'); 
        const dialogue = document.querySelector('#mothersDialogue'); 
        const pressEnter = new Image(); 
        dialogue.innerHTML = ''; 
        mother.src = '../../img/assets/AssetsMae/maeParada.png'; 
        motherPos.style.left = `${45}%`; 
        parentElement.style.display = 'block'; 

       
        let firstPhrase = 'Voltei Filho! Perai... O QUE É AQUILO SUJO ALI!';
        let secondPharse = `Ta de castigo muleque!`;
        let index = 0;
    
        /*
        Mostrará as falas de gameover da mãe
        */
        const charGameOver = firstPhrase.split(""); 
        const TyperGameOver = setInterval(() => { 
            if (index < charGameOver.length) { 
                dialogue.innerHTML += charGameOver[index]; 
                parentElement.style.display = 'flex'; 
                parentElement.style.justifyContent = 'center'; 
                parentElement.style.alignItems = 'center'; 
                index++;
            } else { 
                clearInterval(TyperGameOver); 
                setTimeout(() => { 
                    pressEnter.src = '../../img/assets/AssetsObjetosJogo/pressEnter.png'; 
                    pressEnter.classList = 'pressEnter';
                    parentElement.appendChild(pressEnter) 

                    const secondGameOverSpeech = (event) => {
                        if (event.key == 'Enter') { 
                            dialogue.innerHTML = ''; 
                            pressEnter.src = '' 
                            index = 0; 
                            const charGameOver2 = secondPharse.split(""); 
                            const TyperGameOver2 = setInterval(() => { 
                                if (index < charGameOver2.length) {
                                    dialogue.innerHTML += charGameOver2[index];
                                    index++;
                                } else {
                                    clearInterval(TyperGameOver2); 
                                    document.removeEventListener('keydown', secondGameOverSpeech); 
                                    setTimeout(() => {
                                        gameOverScreen.style.display = 'flex'
                                        tryAgainButton.addEventListener('click', function retartGame() { 
                                            document.location.reload(); 
                                        })
                                    }, 1000);
                                }
                            }, 100);
                        }
                    }
                    document.addEventListener('keydown', secondGameOverSpeech); 
                
                }, 1000);
            }
        }, 100);
}
//Desenhando o mapa do jogo
/*
Desenhara as paredes, chão e os objetos 
*/
function drawMap() {
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
    
    WoodSprite.onload = () => { 
        for( let i=50; i < canvas.width - 80; i+=50) {
            for(let j= 50; j < canvas.height -90; j+=50) {
                ctx.drawImage(WoodSprite, i, j, 50, 50)
            }
        }     
    } 
    setTimeout(() => { 
        drawObjects();
    }, 100);
}

// FUNÇÃO DE CHECAR COLISÃO
/*Verifica se ha colisão coms os objetos no mapa e se houver identifica qual é o objeto em colisão */
function checkColissionWithObjects() {   
    if (!cleanedObjects.includes('lixo') && px < lixoPos.x + lixoSize.width && px + obj.offsetWidth > lixoPos.x && py < lixoPos.y + lixoSize.height && py + obj.offsetHeight > lixoPos.y) { 
        return 'lixo'
    } else if (!cleanedObjects.includes('cama')&& px < camaPos.x + camaSize.width && px + obj.offsetWidth > camaPos.x && py < camaPos.y + camaSize.height && py + obj.offsetHeight > camaPos.y) {
        return 'cama'
    } else if (!cleanedObjects.includes('lixeira') && px < lixeiraPos.x + lixeiraSize.width && px + obj.offsetWidth > lixeiraPos.x && py < lixeiraPos.y + lixeiraSize.height && py + obj.offsetHeight > lixeiraPos.y) {
        return 'lixeira'
    } else if (!cleanedObjects.includes('closet') && px < closetPos.x + closetSize.width && px + obj.offsetWidth > closetPos.x && py < closetPos.y + closetSize.height && py + obj.offsetHeight > closetPos.y) {
        return 'closet'
    } else if (!cleanedObjects.includes('mesa') && px < tablePos.x + tableSize.width && px + obj.offsetWidth > tablePos.x && py < tablePos.y + tableSize.height && py + obj.offsetHeight > tablePos.y) {
        return 'mesa'
    }
    return null
}

let cleanObjets = 0; 
let cleanedObjects = [];
//FUNÇÃO PARA LIMPAR O OBJETO
/*
Ao identificar qual objeto foi limpo ele não tera mais colisão,
mudará de skin ou sumirá do mapa
*/
function startLoading() {   
    if (loadingInterval) return; 
    loadingInterval = setInterval(() => {
        loadingProgress += 10;
        document.querySelector('.barraCheia').style.width = `${loadingProgress}%`;
            if (loadingProgress >= 100) {
                clearInterval(loadingInterval)
                
                if (currentObject === 'lixo') {
                    drawLixo = () => {} 
                    cleanedObjects.push('lixo') 
                    cleanObjets+=1 
                    audio.play()
                } else if (currentObject === 'cama') {
                    drawCama = () => {
                        const camaImage = new Image();
                        camaImage.src = '../../img/assets/AssetsObjetosJogo/Cama.png'
                        camaImage.onload = () => {
                            ctx.drawImage(camaImage, camaPos.x, camaPos.y, camaSize.width, camaSize.height)
                        };
                    } 
                    cleanedObjects.push('cama'); 
                    cleanObjets+=1; 
                    audio.play()
                } else if (currentObject === 'lixeira') {
                    drawLixeira = () => {
                        const lixeiraImage = new Image();
                        lixeiraImage.src = '../../img/assets/AssetsObjetosJogo/lixeira.png';
                        lixeiraImage.onload = () => {
                            ctx.drawImage(lixeiraImage, lixeiraPos.x, lixeiraPos.y-15, lixeiraSize.width-10, lixeiraSize.height-10);
                        }
                    }
                    cleanedObjects.push('lixeira'); 
                    cleanObjets+=1; 
                    audio.play()
                } else if (currentObject === 'closet') {
                    drawCloset = () => {
                        const closetImage = new Image();
                        closetImage.src = '../../img/assets/AssetsObjetosJogo/armarioConcertado.png';
                        closetImage.onload = () => {
                            ctx.drawImage(closetImage, closetPos.x, closetPos.y, closetSize.width, closetSize.height);
                        }
                    }
                    drawClosetDoor = () => {}
                    cleanedObjects.push('closet')
                    cleanObjets+=1;
                    audio.play();
                } else if (currentObject = 'mesa') {
                    drawTable = () => {
                        const tableImage = new Image();
                        tableImage.src = '../../img/assets/AssetsObjetosJogo/mesaLimpa.png';
                        tableImage.onload = () => {
                            ctx.drawImage(tableImage, tablePos.x, tablePos.y, tableSize.width, tableSize.height)
                        }
                    }
                    cleanObjets += 1;
                    audio.play();
                }
                drawMap() 
            
            }
        }, 200
    );
};

// o loading reseta
function stopLoading () {
    clearInterval(loadingInterval);
    loadingInterval = null;
    loadingProgress = 0;
    document.querySelector('.barraCheia').style.width = '0%';
    document.querySelector('.barra').style.display = 'none';
};

// FUNÇÃO DE COMEÇO DO JOGO
/*
Define a posição inicial
desenha o mapa, eventos de conversa e tecla
*/
function begin() {
    dx=0;
    dy=0;
    px=60; 
    py=490; 
    vel=8;
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    tmp=setInterval(enterFrame, 20); 
    drawMap();
    motherConversation(firstSpeech, secondSpeech, elementHtml, lettersInterval);
    initializeGame();
};

//Quando a tela for carregada o jogo se inicia
window.addEventListener('load',begin);