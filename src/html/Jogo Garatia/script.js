// Game Class
class Game {
    constructor() {
        this.point = 0
    }
    pontua(){
        this.point+= 100;
    }
}

// Main Canva Default
const canvas = document.querySelector('#canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');

//control variables
var dx = 0;
var dy = 0;
var vel = 5;
var px = 743;
var py = window.innerHeight / 2;
let movementOffset = 0; // line movement variable
let gameOver = false;
const game = new Game(); // initialize the class

// HTML Elements
const TryAgainButton = document.querySelector('#tryAgain');
const gameOverScreen = document.querySelector('.gameOver');
const obj = document.querySelector('#hero');
const point = document.querySelector('#score');
const obstacles = [];
const highscore = document.querySelector('#highscore');




// initialize the game
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

//Game StartPunctuation
function StartPunctuation () {
    score.innerHTML = `Pontuação: ${game.point}`
    scoreInterval = setInterval(() => {
        game.pontua()
        score.innerHTML = `Pontuação: ${game.point}`
    }, 3000);
}

// End Punctuation
// fim da pountuação
function stopPunctuation() {
    clearInterval(scoreInterval)
}


// draw the game, include the line and background
// desenhando o jogo, incluindo a faixa central e o background da rua
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'gray';
    ctx.fillRect(500, 0, window.innerWidth - 1000, window.innerHeight);
    
    // line moving
    // movimento da faixa central de cima para baixo
    var lineHeight = 100;
    var lineWidth = 20;
    ctx.fillStyle = 'white';
    for (let i = -lineHeight; i < canvas.height; i += lineHeight * 2) {
        ctx.fillRect(window.innerWidth / 2 - 10, (i + movementOffset) % (canvas.height + lineHeight * 2), lineWidth, lineHeight);
    }

    // Drawn obstacles 
    // desenhando obstaculos
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height)
    }
}

// detect press keys
function keyDown(event) {
    var tecla = event.key;
    if (tecla === 'ArrowLeft') {
        dx = -1;
    } else if (tecla === 'ArrowRight') {
        dx = 1;
    } else if (tecla === 'ArrowUp') {
        dy = -1;
    } else if (tecla === 'ArrowDown') {
        dy = 1;
    }
}

// detect release keys
function keyUp(event) {
    var tecla = event.key;
    if (tecla === 'ArrowLeft' || tecla === 'ArrowRight') {
        dx = 0;
    } else if (tecla === 'ArrowUp' || tecla === 'ArrowDown') {
        dy = 0;
    }
}


// character position uptade
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

// function to move the line
function moveLine() {
    movementOffset += 5;
    if (movementOffset >= 200) {
        movementOffset = 0;
    }
}

//add randonly obstacles
function addObstacles (){
     
    if(Math.random() < 0.1) { // chance to add a new obstacle in the screen
        let obstacleWidth = 50;
        let obstacleHeight = 100;
        let obstacleX = Math.random() * (window.innerWidth -1000 - obstacleWidth) + 500;
        let obstacleY = -obstacleHeight;
        let obstacleSpeed = Math.random() * 5 + 2; //speed between 2 to 7 px/s
        obstacles.src = 'img/carroAzul.png'
        obstacles.push({
            x:obstacleX,
            y: obstacleY, 
            width: obstacleWidth, 
            height: obstacleHeight, 
            speed: obstacleSpeed
        });
    }
}

//Obstacles movement
function updateObstacles() {
    //Obstacles moving of min Py to max Py
    for(let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacles[i].speed;
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            i--;
        }
    }

}

// Check the colission between hero and the obstacles
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


// Restart the game after game over



// begin line movement  
setInterval(moveLine, 20); // intervalo de 20 centésimos para cada linha central se movimentar

setInterval(updateObstacles, 20) // intervalo de 20 centésimos para cada obstaculo se movimentar

window.addEventListener('load', init); // quando a tela for iniciada no navegador o jogo inicializará  