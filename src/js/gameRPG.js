let canvasEl = document.querySelector('#canvas');
let ctx = canvasEl.getContext('2d');

canvasEl.width = window.innerWidth;
canvasEl.height = window.innerHeight;

const tileSize = 32

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 3, 3, 3, 3, 2, 1],
    [1, 2, 3, 1, 1, 3, 2, 1],
    [1, 2, 3, 1, 1, 3, 2, 1],
    [1, 2, 3, 3, 3, 3, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
]

const images = {}
const loadImages = () => {
    const sources = {
        1: '../img/assets/Car/CarroMeiaCurvaDireita.png',
        2: '../img/assets/Car/CarroMeiaCurvaDireita.png',
        3: '../img/assets/Car/CarroMeiaCurvaDireita.png',
    };


    let loadedImages = 0;
    const numImages = Object.keys(sources).length;

    return new Promise((resolve) => {
        for (const key in sources) {
            images[key] = new Image();
            images[key].src = sources[key];
            images[key].onload = () => {
                if (++loadedImages >= numImages) {
                    resolve();
                }
            };
        };
    });

}
const drawnMap = () => {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length;col++) {
            const tile = map[row][col];
            if (images[tile]) {
                ctx.drawImage(images[tile], col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
};

//Character

const player = {
    x: 2 * tileSize,
    y: 2 * tileSize,
    width: tileSize,
    height: tileSize,
    color: '#FF0000'
};

const drawPlayer = () => {

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    drawnMap();
    drawPlayer();
 };

 document.addEventListener('keydown', (event) => {
    const speed = tileSize;
    switch (event.key) {
        case 'ArrowUp':
            player.y -= speed;
            break
        case 'ArrowDown':
            player.y += speed;
            break
        case 'ArrowLeft':
            player.x -= speed;
            break
        case 'ArrowRight':
            player.x += speed;
            break
    }
    updateGame();
 });

 function updateGame() {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    drawnMap();
    drawPlayer();
 }

 loadImages().then(() => {
    updateGame()
 })













