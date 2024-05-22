//canvas background

const canvas = document.querySelector('#canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth
ctx = canvas.getContext('2d');


ctx.fillRect(50, 50, window.innerWidth-100, window.innerHeight-100)





//movement character

var dx; //Direction x
var px; //position x
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
    } else if (tecla == "ArrowRight") { //right
        dx=1;
        
    }
}
function keyUp() {
    var tecla = event.key; 
    if (tecla=="ArrowLeft" ) { 
        dx=0;
    }  else if (tecla == "ArrowRight" ) { 
        dx=0;
    } 
}

//px = posição X,
function enterFrame() {
    var nextPx = px + dx * vel; //positionX + directionX * Speed
   
    if (nextPx < 0) {
        nextPx = 0;
    } else if (nextPx + obj.offsetWidth > window.innerWidth) {
        nextPx = window.innerWidth - obj.offsetWidth;
    }

    px = nextPx;
    obj.style.left=px+'px'
    obj.style.top=py+'px'

}



window.addEventListener('load',inicia);
