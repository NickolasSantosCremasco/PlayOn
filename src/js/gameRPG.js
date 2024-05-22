//canvas background

const canvas = document.querySelector('#canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
ctx = canvas.getContext('2d');
let height = (window.innerHeight*50)/100
let width = (window.innerWidth*50)/100

ctx.fillRect(height,600,window.innerWidth-100,innerHeight-100)





//movement character

var dx; //Direction x
var dy; //Direction Y
var px; //position x
var py; //position y
var vel; //speed
var obj; // Which obj will move
var tmp; //timer

function inicia() {
    dx=0;
    dy=0;
    px=0;
    py=0;
    vel=10;
    obj=document.querySelector('#dv1')
    document.addEventListener('keydown', keyDown) // happen when the key is press
    document.addEventListener('keyup', keyUp) // happen when the key is realesed
    tmp=setInterval(enterFrame, 20); //20 movement interval
}

function keyDown() {
    var tecla = event.key; // GetArrowNumber
    if (tecla== "ArrowLeft" ) { //Left
        dx=-1;       
    } else if (tecla == "ArrowUp") { //Up
        dy=-1;
        
    } else if (tecla == "ArrowRight") { //right
        dx=1;
        
    } else if (tecla == "ArrowDown") { //bottom
        dy=1;    
    }
}
function keyUp() {
    var tecla = event.key; 
    if (tecla=="ArrowLeft" ) { 
        dx=0;
    } else if (tecla =="ArrowUp" ) { 
        dy=0;
    } else if (tecla == "ArrowRight" ) { 
        dx=0;
    } else if (tecla == "ArrowDown" ) { 
        dy=0;
    }
}

//px = posição X,
function enterFrame() {
    var nextPx = px + dx * vel; //positionX + directionX * Speed
    var nextPy = py + dy * vel;
    if (nextPx < 0) {
        nextPx = 0;
    } else if (nextPx + obj.offsetWidth > window.innerWidth) {
        nextPx = window.innerWidth - obj.offsetWidth;
    }

    if (nextPy < 0) {
        nextPy = 0;
    } else if (nextPy + obj.offsetWidth > window.innerHeight) { // can't be bigger than PC screen
        nextPy = window.innerHeight - obj.offsetHeight;
    }

    px = nextPx;
    py = nextPy;
   
    obj.style.left=px+'px'
    obj.style.top=py+'px'

}



window.addEventListener('load',inicia);
