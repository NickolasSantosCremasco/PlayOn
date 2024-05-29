//canvas background

const canvas = document.querySelector('#canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx = canvas.getContext('2d');

ctx.fillRect(50, 50, window.innerWidth-140, window.innerHeight-100);

//movement character
var dy;
var dx; //Direction x
var px; //position x
var py;
var vel; //speed
var obj; // Which obj will move
var tmp; //timer

obj=document.querySelector('#dv1')

function inicia() {

    dx=0;
    dy=0;
    px=50;
    py=500;
    vel=8;
    
    document.addEventListener('keydown', keyDown) // happen when the key is press
    document.addEventListener('keyup', keyUp) // happen when the key is realesed
    tmp=setInterval(enterFrame, 20); //20 movement interval
    drawMap();
}

function keyDown() {
    var tecla = event.key; // GetArrowNumber
    if (tecla== "ArrowLeft" ) { //Left
        dx=-1;       
    } else if (tecla == "ArrowRight") { //right
        dx=1;
        
    } else if (tecla == "ArrowUp") {
        dy=-1
    } else if (tecla == "ArrowDown") {
        dy=1
    }
}
function keyUp() {
    var tecla = event.key; 
    if (tecla=="ArrowLeft" ) { 
        dx=0;
    }  else if (tecla == "ArrowRight" ) { 
        dx=0;
    }  else if (tecla == "ArrowDown") {
        dy=0
    } else if (tecla == "ArrowUp") {
        dy=0
    }
}

//px = posição X,
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


function drawMap() {
    //Game Sprites
    const WoodSprite = new Image()
    WoodSprite.src = '../../img/assets/gameRPG/spriteChao.jpeg'
    
    //Drawing the Game
    WoodSprite.onload = () => {
        //Drawn the floor
        for( let i=50; i < canvas.width - 80; i+=50) {
            for(let j= 50; j < canvas.height -90; j+=50) {
                ctx.drawImage(WoodSprite, i, j, 50, 50)
            }
        }     
    }
    

    
}




window.addEventListener('load',inicia);




  
