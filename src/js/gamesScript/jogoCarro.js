// classe Game
class Game {
    constructor() {
        this.point = 0
    }
    pontua(){
        this.point+= 100;
    }
}

// Canvas central
const canvas = document.querySelector('#canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');

//Variaveis de controle
var dx = 0;
var dy = 0;
var vel = 5;
var px = 743;
var py = window.innerHeight / 2;
let movementOffset = 0; // variavel do movimento da linha
let gameOver = false;
let speed = 50
const maxSpeed = 100
const minSpeed = 4
const speedIncrement = 1;
const game = new Game(); // inicializando a classe Game

// Elementos HTML
const TryAgainButton = document.querySelector('#tryAgain');
const gameOverScreen = document.querySelector('.gameOver');
const obj = document.querySelector('#hero');
const point = document.querySelector('#score');
const obstacles = [];
const highscore = document.querySelector('#highscore');
const velocimeter = document.querySelector('#speed');
const FinalScore = document.querySelector('#FinalScore');
velocimeter.innerHTML = 'Velocidade: 50Km/h';
const obstaclesImage = new Image();
obstaclesImage.src = '../../img/assets/imgJogoCarro/carroAzul.png' 




// jogo sendo inicializado
function init() {
    document.addEventListener('keydown', keyDown); // eventos de teclas apertadas
    document.addEventListener('keyup', keyUp); // eventos de teclas soltas
    StartPunctuation();
    setInterval(enterFrame, 20); 
    // initialize the enterframe, all game
    // inicializando o jogo
    TryAgainButton.addEventListener('click', () => { // botão de reiniciar
        gameOver = false
        gameOverScreen.style.display = 'none'
        // restaurando a posição do personagem para a inicial
        px = 743;
        py = window.innerHeight / 2
        dx = 0;
        dy = 0;
        obstacles.length = 0;
        game.point = 0;
        highscore.innerHTML = `Pontuação: ${game.point}`
        StartPunctuation();

    }) 
}

//Iniciando a pontuação do jogo
function StartPunctuation () {
    score.innerHTML = `Pontuação: ${game.point}`
    scoreInterval = setInterval(() => {
        game.pontua()
        score.innerHTML = `Pontuação: ${game.point}`
    }, 3000);
}

// fim da pountuação
function stopPunctuation() {
    clearInterval(scoreInterval)
    FinalScore.innerHTML = `Pontuação Final: ${game.point}`
}


// desenhando o jogo, incluindo a faixa central e o background da rua
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'gray';
    ctx.fillRect(500, 0, window.innerWidth - 1000, window.innerHeight);
    
    // movimento da faixa central de cima para baixo
    var lineHeight = 100;
    var lineWidth = 20;
    ctx.fillStyle = 'white';
    for (let i = -lineHeight; i < canvas.height; i += lineHeight * 2) {
        ctx.fillRect(window.innerWidth / 2 - 10, (i + movementOffset) % (canvas.height + lineHeight * 2), lineWidth, lineHeight);
    }

    // desenhando obstaculos
    for (let i = 0; i < obstacles.length; i++) {
        ctx.drawImage(obstaclesImage, obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height)
    }
}

// detectando quando as teclas são pressionadas
function keyDown(event) {
    var tecla = event.key;
    if (tecla === 'ArrowLeft') {
        dx = -1;
    } else if (tecla === 'ArrowRight') {
        dx = 1;
    } else if (tecla === 'ArrowUp') {
        dy = -1;
        if (speed < maxSpeed && !gameOver) { // velocímetro aumenta quando ArrowUp é pressionado
            speed += speedIncrement
            updateSpeedometer();
        }
    } else if (tecla === 'ArrowDown') { // velocímetro diminuiu quando ArrowDown é pressionado
        dy = 1;
        if (speed > minSpeed && !gameOver) {
            speed -= speedIncrement
            updateSpeedometer();

        }
    }
}

// detectando quando a tecla for solta
function keyUp(event) {
    var tecla = event.key;
    if (tecla === 'ArrowLeft' || tecla === 'ArrowRight') {
        dx = 0;
    } else if (tecla === 'ArrowUp' || tecla === 'ArrowDown') {
        dy = 0;
    }
}

// Velocímetro
function updateSpeedometer (){
    velocimeter.innerHTML = `Velocidade: ${speed}Km/h`
}
// posição do personagem
function updatePosition() {
    var nextPx = px + dx * vel; // posição sendo atualizada de acordo com a velocidade para a horizontal
    var nextPy = py + dy * vel; // posição sendo atualizada de acordo com a velocidade para a vertical

    if (nextPx < 500) { // definido borda lateral esquerda
        nextPx = 500;
    } else if (nextPx + obj.offsetWidth > window.innerWidth - 500) { //definindo borda lateral direita
        nextPx = window.innerWidth - 500 - obj.offsetWidth;
    }

    if (nextPy < 10) { // definindo borda vertical de cima
        nextPy = 10;
    } else if (nextPy + obj.offsetHeight > window.innerHeight - 10) { // definindo borda lateral de baixo
        nextPy = window.innerHeight - 10 - obj.offsetHeight;
    }
    px = nextPx;
    py = nextPy;
    // mudando as posições na tela
    obj.style.left = px + 'px';
    obj.style.top = py + 'px';
}

// função para mover a linha central
function moveLine() {
    movementOffset += 5;
    if (movementOffset >= 200) {
        movementOffset = 0;
    }
}

//adicionar obstaculos aleatoriamente
function addObstacles (){  
    if(Math.random() < 0.045) { // chance de adicionar um obstaculo aleatoriamente para a tela
        let obstacleWidth = 50;
        let obstacleHeight = 100;
        let obstacleX = Math.random() * (window.innerWidth -1000 - obstacleWidth) + 500;
        let obstacleY = -obstacleHeight;
        let obstacleSpeed = Math.random() * 5 + 1; //velocidade do obstaculo entre 1 a 6 px/s
        obstacles.src = '../../img/assets/imgJogoCarro/carroAzul.png' 
        obstacles.push({
            x:obstacleX,
            y: obstacleY, 
            width: obstacleWidth, 
            height: obstacleHeight, 
            speed: obstacleSpeed
        });
    }
}

//Movimento dos obstaculos
function updateObstacles() {
    //obstaculos se movendo do Px Maximo até o Px mínimo
    for(let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacles[i].speed;
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            i--;
        }
    }

}

// checando colisão entre personagem e obstaculo
function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) { // para cada obstaculo criado faça
        if (px < obstacles[i].x + obstacles[i].width && // se a posição do personagem for menor que a posição horizontal do obstaculo
            px + obj.offsetWidth > obstacles[i].x && // se a posição horizontal + a largura do objeto for maior que a posição horizontal do objeto
            py < obstacles[i].y + obstacles[i].height && // se a posição do personagem for menor que a posição vertical do obstaculo
            py + obj.offsetHeight > obstacles[i].y)  // e a posição vertical + o tamanho do objeto for maior que a posição horizontal do objeto
            { 
                return true // retornará verdadeiro para colisão
            }
    }
    return false
}
// função central do jogo
function enterFrame() {
    if (!gameOver) { // verifica se a variável game over é diferente de true
        updatePosition(); // muda a posição do personagem
        drawScene(); // desenha o mapa
        updateObstacles(); // faz os obstaculos se mexerem
        addObstacles(); /// adiciona os obstaculos
        gameOverScreen.style.display = 'none'; // a tela de game over fica invisivel
        if (checkCollision()) { // caso haja colisão
            gameOverScreen.style.display = 'flex'; // game over aparecerá
            gameOver = true; // game over voltará true e as funções acima pararão de serem executadas
            stopPunctuation(); // pontuação para de incrementar
        }
      
    }
}
// reiniciando o jogo depois do game over

// chamando a função mover a linha para ser realizada em um intervalo de tempo
setInterval(moveLine, 20); // intervalo de 20 centésimos para cada linha central se movimentar

setInterval(updateObstacles, 20) // intervalo de 20 centésimos para cada obstaculo se movimentar

window.addEventListener('load', init); // quando a tela for iniciada no navegador o jogo inicializará  