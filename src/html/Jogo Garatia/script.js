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
const obstacles = []



// initialize the game
function init() {
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
    Punctuation();
    setInterval(enterFrame, 20); // initialize the enterframe, all game
    TryAgainButton.addEventListener('click', () => {
        gameOver = false
        gameOverScreen.style.display = 'none'
        px = 743;
        py = window.innerHeight / 2
        dx = 0;
        dy = 0;
        obstacles.length = 0;
        game.point = 0;
        score.innerHTML = `Pontuação: ${game.point}`
        
    }) 
}

//Game Punctuation
function Punctuation () {
    score.innerHTML = `Pontuação: ${game.point}`
    scoreInterval = setInterval(() => {
        game.pontua()
        score.innerHTML = `Pontuação: ${game.point}`
    }, 3000);
}




// draw the game, include the line and background
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'gray';
    ctx.fillRect(500, 0, window.innerWidth - 1000, window.innerHeight);
    
    // line moving
    var lineHeight = 100;
    var lineWidth = 20;
    ctx.fillStyle = 'white';
    for (let i = -lineHeight; i < canvas.height; i += lineHeight * 2) {
        ctx.fillRect(window.innerWidth / 2 - 10, (i + movementOffset) % (canvas.height + lineHeight * 2), lineWidth, lineHeight);
    }

    // Drawn obstacles 
    for (let i = 0; i < obstacles.length; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height)
    }

    //drawn game over
    if(gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '43px serif';
        ctx.fillText('Game Over', canvas.width/2 -100, canvas.height / 2);
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


// upgrade the character position
function updatePosition() {
    var nextPx = px + dx * vel;
    var nextPy = py + dy * vel;

    if (nextPx < 500) {
        nextPx = 500;
    } else if (nextPx + obj.offsetWidth > window.innerWidth - 500) {
        nextPx = window.innerWidth - 500 - obj.offsetWidth;
    }

    if (nextPy < 10) {
        nextPy = 10;
    } else if (nextPy + obj.offsetHeight > window.innerHeight - 10) {
        nextPy = window.innerHeight - 10 - obj.offsetHeight;
    }

    px = nextPx;
    py = nextPy;

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
     
    if(Math.random() < 0.02) { // chance to add a new obstacle in the screen
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
    for (let i = 0; i < obstacles.length; i++) {
        if (px < obstacles[i].x + obstacles[i].width &&
            px + obj.offsetWidth > obstacles[i].x &&
            py < obstacles[i].y + obstacles[i].height &&
            py + obj.offsetHeight > obstacles[i].y) {
                return true
        }
    }
    return false
}
// updtade the screen
function enterFrame() {
    if (!gameOver) {
        updatePosition();
        drawScene();
        updateObstacles();
        addObstacles();
        gameOverScreen.style.display = 'none';
        if (checkCollision()) {
            gameOverScreen.style.display = 'flex';
            gameOver = true; 
            
           
        }
    }
}


// Restart the game after game over
function restartGame() {
    gameOver = false;
    gameOverScreen.style.display = 'none';
    px = 743;
    py = window.innerHeight / 2;
    dx = 0;
    dy = 0;
    obstacles.length = 0; // remove todos os obtáculos 
  
}


// Inicia o movimento da faixa
setInterval(moveLine, 20);

setInterval(updateObstacles, 20)

window.addEventListener('load', init);   