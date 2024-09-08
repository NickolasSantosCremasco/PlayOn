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
const obj = document.querySelector('#hero'); //personagem/carro
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
    document.addEventListener('keydown', keyDown); // eventos de teclas apertadas
    document.addEventListener('keyup', keyUp); // eventos de teclas soltas
    StartPunctuation();
    setInterval(enterFrame, 20); 
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

//reinicia a pontua
function restartPunctuation() {
  stopPunctuation(); // para o intervalo antigo
  score.innerHTML = `Pontuação: 0`
  game.point = 0
  StartPunctuation(); // inicia um novo intervalo
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
const treeImages = treesSprites.map(sprite => { // fara com que as imagens não fiquem piscando e reutilize apenas uma imagem que ficara se movendo de cima para baixo
    const img = new Image();
    img.src = sprite.src
    return img;
})

function drawTrees () {
    treesSprites.forEach((tree, index) => {
        const treeImage = treeImages[index]; // usar a imagem carregada
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


let carLimit = 6; // limite de carros que serão gerados na tela 
let CarNumber = 0; // número de carros atualmente na tela
//adicionar obstaculos aleatoriamente
function addObstacles (){ 
    if(Math.random() < 0.045 && CarNumber <= carLimit) { // chance de adicionar um obstaculo aleatoriamente para a tela e verifica se o número de carros não ultrapassou o limite na tela
        let obstacleWidth = 50;
        let obstacleHeight = 90;
        let obstacleX = Math.random() * (window.innerWidth -1000 - obstacleWidth) + 500;
        let obstacleY = -obstacleHeight;
        let obstacleSpeed = Math.random() * 5 + 1; //velocidade do obstaculo entre 1 a 6 px/s
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

//Movimento dos obstaculos
function updateObstacles() {
    //obstaculos se movendo do Px Maximo até o Px mínimo
    for(let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += obstacles[i].speed;

        //remover o carro após ele sair da tela
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            CarNumber--; // Diminui o número de carros
            i--; //ajusta o índice de carros
        }
    }

}
let lastScoreIncrease = 0; // armazena a ultima vez que a pontuação fez com que aumentasse o limite de carros
function checkScore() {
    if (game.point % 500 === 0 && game.point !== 0 && game.point > lastScoreIncrease) { //verifica se game.point divido por 500 for igual a zero quer dizer que estamos no momento de aumentar o limite de carros
        carLimit+=1 // o limite de carros aumenta em mais 1
        lastScoreIncrease = game.point // marca quando esse limite foi aumentado, e aumentará apenas uma vez
        console.log(carLimit)
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
        updateTrees(); // atualização das posições das arvores
        drawTrees(); // desenhar arvores
        checkScore(); // aumenta 1 carro a mais na tela a cada 500 de score batido
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