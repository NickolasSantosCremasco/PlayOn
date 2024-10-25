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
let movementOffset = 0; 
let gameOver = false;
let speed = 50
const maxSpeed = 100
const minSpeed = 4
const speedIncrement = 1;
const game = new Game(); 

// Elementos HTML
const TryAgainButton = document.querySelector('#tryAgain');
const gameOverScreen = document.querySelector('.gameOver');
const obj = document.querySelector('#hero'); 
const point = document.querySelector('#score');
const obstacles = [];
const highscore = document.querySelector('#highscore');
const velocimeter = document.querySelector('#speed');
const FinalScore = document.querySelector('#FinalScore');
const obstaclesImage = new Image();
velocimeter.innerHTML = 'Velocidade: 50Km/h';
obstaclesImage.src = '../../img/assets/imgJogoCarro/carroAzul.png' 

//arvores
const treesSprites = [
    {src:'../../img/assets/imgJogoCarro/Arvore1.png', x: (canvas.width*80)/100, y: -150, width:100, height: 150, speed:5},
    {src:'../../img/assets/imgJogoCarro/Arvore2.png', x: (canvas.width*10)/100, y: -150, width:100, height: 150, speed:3},
    {src:'../../img/assets/imgJogoCarro/Arvore3.png', x: (canvas.width*20)/100, y: -150, width:100, height: 150, speed:6}
]


// jogo sendo inicializado
function init() {
    document.addEventListener('keydown', keyDown); 
    document.addEventListener('keyup', keyUp); 
    StartPunctuation();
    setInterval(enterFrame, 20); 
    // Botão de reiniciar caso tenha acontecido uma derrota
    //personagem volta a sua posição inicial e a pontuação volta a 0
    TryAgainButton.addEventListener('click', () => { 
        document.location.reload()
        gameOver = false
        gameOverScreen.style.display = 'none'
        px = 743;
        py = window.innerHeight / 2
        dx = 0;
        dy = 0;
        obstacles.length = 0;
        game.point = 0;
        restartPunctuation();

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

//reinicia a pontuação quando é clicado em reiniciar jogo
function restartPunctuation() {
  stopPunctuation(); 
  score.innerHTML = `Pontuação: 0`
  game.point = 0
  StartPunctuation(); 
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

// Coloca as imagens de arvores que passarão na tela de cima para baixo
// fara com que as imagens não fiquem piscando e reutilize apenas uma imagem que ficara se movendo de cima para baixo
const img = new Image();
const treeImages = treesSprites.map(sprite => { 
    img.src = sprite.src
    return img;
})

function drawTrees () {
    treesSprites.forEach((tree, index) => {
        const treeImage = treeImages[index];
        ctx.drawImage(treeImage, tree.x, tree.y, tree.width, tree.height);
    })
}

function updateTrees () {
    treesSprites.forEach(tree => {
        tree.y += tree.speed;
        if (tree.y > canvas.height) {
            tree.y = -tree.height;
        }
    })
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
        // velocímetro aumenta quando ArrowUp é pressionado
        if (speed < maxSpeed && !gameOver) { 
            speed += speedIncrement
            updateSpeedometer();
        }
        
    } else if (tecla === 'ArrowDown') { 
        dy = 1;
        // velocímetro diminuiu quando ArrowDown é pressionado
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
    var nextPx = px + dx * vel; 
    var nextPy = py + dy * vel; 

    // definido borda lateral esquerda
    if (nextPx < 500) { 
        nextPx = 500;

    //definindo borda lateral direita
    } else if (nextPx + obj.offsetWidth > window.innerWidth - 500) { 
        nextPx = window.innerWidth - 500 - obj.offsetWidth;
    }

    // definindo borda vertical de cima
    if (nextPy < 10) { 
        nextPy = 10;
    // definindo borda Vertical de baixo
    } else if (nextPy + obj.offsetHeight > window.innerHeight - 10) { 
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


let carLimit = 3; // limite de carros que serão gerados na tela 
let CarNumber = 0; // número de carros atualmente na tela
//adicionar obstaculos aleatoriamente
function addObstacles (){ 
    if(Math.random() < 0.045 && CarNumber <= carLimit) { 
        let obstacleWidth = 50;
        let obstacleHeight = 90;
        let obstacleX = Math.random() * (window.innerWidth -1000 - obstacleWidth) + 500;
        let obstacleY = -obstacleHeight;
        let obstacleSpeed = Math.random() * 5 + 1; 
        obstacles.src = '' 
        obstacles.push({
            x:obstacleX,
            y: obstacleY, 
            width: obstacleWidth, 
            height: obstacleHeight, 
            speed: obstacleSpeed,
            image: '../../img/assets/imgJogoCarro/carroAzul.png'
        });
        CarNumber++
    }
}

//Movimento dos obstaculos de cima até em baixo na tela
function updateObstacles() {
    
    for(let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacles[i].speed;
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            CarNumber--; 
            i--; 
        }
    }

}

//Função que verifica a pontuação e caso seja multipla de 500 adiciona mais um carro na tela
let lastScoreIncrease = 0; 
function checkScore() {
    if (game.point % 500 === 0 && game.point !== 0 && game.point > lastScoreIncrease) { 
        carLimit+=1 
        lastScoreIncrease = game.point 
        console.log(carLimit)
    }
}

// checando colisão entre personagem e obstaculo e se sim retorna verdadeiro
function checkCollision() {
    for (let i = 0; i < obstacles.length; i++) { 
        if (px < obstacles[i].x + obstacles[i].width && 
            px + obj.offsetWidth > obstacles[i].x && 
            py < obstacles[i].y + obstacles[i].height && 
            py + obj.offsetHeight > obstacles[i].y)  
            { 
                return true 
            }
    }
    return false
}

// Função que executará todas as outras do jogo
function enterFrame() {
    if (!gameOver) { 
        updatePosition(); 
        drawScene(); 
        updateObstacles(); 
        addObstacles(); 
        updateTrees(); 
        drawTrees(); 
        checkScore();
        gameOverScreen.style.display = 'none'; 
        if (checkCollision()) { 
            gameOverScreen.style.display = 'flex'; 
            gameOver = true; 
            stopPunctuation(); 
        }
      
    }
}


setInterval(moveLine, 20); 

setInterval(updateObstacles, 20) 

window.addEventListener('load', init); 