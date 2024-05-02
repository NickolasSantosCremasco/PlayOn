/* Navbar */



/* End Navbar */

/* Slider */

var radio = document.querySelector(".manual-btn");
let slider = document.querySelector(".slider");

var cont = 1;

document.getElementById("radio1").checked = true;

function nextImg() {
  cont++;
  if (cont > 3) {
    cont = 1;
  }

  document.getElementById("radio" + cont).checked = true;
}

setInterval(() => {
  nextImg();
}, 10000);

/* Animation Mario */

let mario = document.querySelector("#mario");
let coin = document.querySelector("#moeda");
let blockCoin = document.querySelector("#blockCoin");

let frames = [
  "src/img/assets/Mario/MarioCaminhando1.png",
  "src/img/assets/Mario/MarioCaminhando2.png",
  "src/img/assets/Mario/MarioCaminhando3.png",
  "src/img/assets/Mario/MarioCaminhando4.png",
];

let currentFrame = 0;

function changeFrames() {
  mario.src = frames[currentFrame];
  currentFrame = (currentFrame + 1) % frames.length;
  requestAnimationFrame(changeFrames);
}

anime({
  targets: mario,
  translateY: 0,
  translateX: 0,
  easing: "easeInOutQuad",
  duration: 1,
});
function andarMario() {
  anime({
    targets: mario,
    translateY: 0,
    translateX: 1500,
    easing: "easeInOutQuad",
    duration: 1,
    loop: true,
  });
}

andarMario();
changeFrames();

/* End Animation Mario */

/* Plane animation */

function plane() {
  let spaceship = document.getElementById("plane");
  anime({
    targets: spaceship,
    translateX: [
      { value: 200, duration: 1500 },
      { value: -100, duration: 2500 },
      { value: 90, duration: 3000 },
      { value: -100 },
    ], // Define os pontos de partida e chegada
    translateY: [
      { value: 20, duration: 1000 },
      { value: -20, duration: 1500 },
      { value: 20 },
      { value: -20 },
      { value: 20 },
    ],
    direction: "alternate",
    loop: true,
    duration: 10000,
    easing: "easeInOutSine",
  });
}

plane();

/* End Animation Plane */

/* Star Animation Slide-Car */

function animationCar() {
  let littleCar = document.querySelector('#littleCar');
  anime({
    targets: littleCar,
    translateX: [
      { value: -400, duration: 3000 },
      { value: 90, duration: 3500 },
      { value: -300, duration:4000 },
    ], // Define os pontos de partida e chegada
    translateY: [
      { value: 20, duration: 1000 },
      { value: -20, duration: 1500 },
      { value: 20 },
      { value: -20 },
      { value: 20 },
    ],
    direction: "alternate",
    loop: true,
    duration: 10000,
    easing: "easeInOutSine",
  });
}

animationCar();

/* Start Container Video  */

function block() {
  var line = document.querySelector(".line");
  setTimeout(() => {
    anime({
      targets: line,
      translateY: -180,
      rotate: "5turn",
      easing: "easeInOutQuad",
      backgroundColor: "#FFF",
      duration: 500,
    });
    setTimeout(() => {
      anime({
        targets: line,
        scaleY: 16,
        borderRadius: ["0%", "5%"],
        backgroundColor: "#00bfff",
        duration: 1000,
        easing: "easeInOutQuad",
      });
    }, 1500);
  }, 500);
}

block();

/* Start Frame animation Arcade */

function animationArcade() {
  let currentFrame = 0;
  let arcade = document.querySelector("#homeArcade");
  let frames = [
    "src/img/assets/fliperama/Fliperama1.png",
    "src/img/assets/fliperama/Fliperama2.png",
    "src/img/assets/fliperama/Fliperama3.png",
    "src/img/assets/fliperama/Fliperama4.png",
    "src/img/assets/fliperama/Fliperama5.png",
    "src/img/assets/fliperama/Fliperama6.png",
    "src/img/assets/fliperama/Fliperama7.png",
    "src/img/assets/fliperama/Fliperama8.png",
    "src/img/assets/fliperama/Fliperama9.png",
  ];

  function changeFrames() {
    frameDelay = 1000;
    currentFrame = (currentFrame + 1) % frames.length;
    arcade.src = frames[currentFrame];
    setTimeout(changeFrames, frameDelay);
  }
  changeFrames();
}

animationArcade();

/* Content 2 */

/* Cards */

function backgroundCards() {
  let mario = document.querySelector("#marioHd");
  let sonic = document.querySelector("#sonic");
  let kong = document.querySelector("#kong");
  let ryu = document.querySelector("#ryu");
  let spaceinvaders = document.querySelector("#spaceInvaders");
  let pacMan = document.querySelector("#pacMan");
  let topGear = document.querySelector("#topGear");

  mario.addEventListener("mouseover", backgroundMario);
  sonic.addEventListener("mouseover", backgroundSonic);
  kong.addEventListener("mouseover", backgroundKong);
  ryu.addEventListener("mouseover", backgroundRyu);
  spaceinvaders.addEventListener("mouseover", backgroundSpaceInvaders);
  pacMan.addEventListener("mouseover", backgroundPacMan);
  topGear.addEventListener("mouseover", backgroundTopGear);

  const background = document.querySelector("#backgroundVideo");

  function resetBackground() {
    background.style.transform = "translateX(-100%)";
    background.style.opacity = "0";
    background.style.filter = "blur(20px)";
    if (background.style.transform == "translate(-100%)") {
      background.src = "";
    }
  }

  function backgroundMario() {
    background.src = "src/video/cards-video/Super-Mario.mp4";
    background.style.transition = "all 1s ease";
    background.style.left = "50%";
    background.style.transform = "translate(-50%)";
    background.style.opacity = "1";
    background.style.filter = "blur(0)";

    mario.addEventListener("mouseout", resetBackground);
  }

  function backgroundSonic() {
    background.src = "src/video/cards-video/Sonic.mp4";
    background.style.transition = "all 1s ease";
    background.style.left = "50%";
    background.style.transform = "translate(-50%)";
    background.style.opacity = "1";
    background.style.filter = "blur(0)";

    sonic.addEventListener("mouseout", resetBackground);
  }

  function backgroundKong() {
    background.src = "src/video/cards-video/Donkey-Kong.mp4";
    background.style.transition = "all 1s ease";
    background.style.left = "50%";
    background.style.transform = "translate(-50%)";
    background.style.opacity = "1";
    background.style.filter = "blur(0)";

    kong.addEventListener("mouseout", resetBackground);
  }

  function backgroundRyu() {
    background.src = "src/video/cards-video/streetFighter.mp4";
    background.style.transition = "all 1s ease";
    background.style.left = "50%";
    background.style.transform = "translate(-50%)";
    background.style.opacity = "1";
    background.style.filter = "blur(0)";

    ryu.addEventListener("mouseout", resetBackground);
  }

  function backgroundSpaceInvaders() {
    background.src = "src/video/cards-video/Space-Invaders.mp4";
    background.style.transition = "all 1s ease";
    background.style.left = "50%";
    background.style.transform = "translate(-50%)";
    background.style.opacity = "1";
    background.style.filter = "blur(0)";

    spaceinvaders.addEventListener("mouseout", resetBackground);
  }

  function backgroundPacMan() {
    background.src = "src/video/cards-video/Pac-Man.mp4";
    background.style.transition = "all 1s ease";
    background.style.left = "50%";
    background.style.transform = "translate(-50%)";
    background.style.opacity = "1";
    background.style.filter = "blur(0)";

    pacMan.addEventListener("mouseout", resetBackground);
  }

  function backgroundTopGear() {
    background.src = "src/video/cards-video/Top-Gear.mp4";
    background.style.transition = "all 1s ease";
    background.style.left = "50%";
    background.style.transform = "translate(-50%)";
    background.style.opacity = "1";
    background.style.filter = "blur(0)";

    topGear.addEventListener("mouseout", resetBackground);
  }
}

backgroundCards();

/* Animation Cards Assets */

function animationRyu() {
  let framesRyu = [
    "src/img/assets/Ryu/RyuParado1.png",
    "src/img/assets/Ryu/RyuParado2.png",
    "src/img/assets/Ryu/RyuParado3.png",
    "src/img/assets/Ryu/RyuParado4.png",
    "src/img/assets/Ryu/RyuParado5.png",
  ];

  let currentFrame = 0;
  let imgRyu = document.querySelector("#imgRyu");
  let frameDelay = 100;

  function changeRyuFrames() {
    currentFrame = (currentFrame + 1) % framesRyu.length;
    imgRyu.src = framesRyu[currentFrame];
    if (currentFrame == 3) {
      imgRyu.style.transform = "translateY(-10%)";
      imgRyu.style.transition = "all 1s";
    } else {
      imgRyu.style.transform = "translateY(0)";
    }
    setTimeout(changeRyuFrames, frameDelay);
  }
  changeRyuFrames();
}
animationRyu();

function animationTopGear() {
  let framesCar = [
    "src/img/assets/Car/CarroMeiaCurvaDireita.png",
    "src/img/assets/Car/CarroCurvaDireita.png",
    "src/img/assets/Car/CarroMeiaCurvaDireita.png",
    "src/img/assets/Car/CarroParado.png",
    "src/img/assets/Car/CarroMeiaCurvaEsquerda.png",
    "src/img/assets/Car/CarroCurvaEsquerda.png",
    "src/img/assets/Car/CarroMeiaCurvaEsquerda.png",
    "src/img/assets/Car/CarroParado.png",
  ];
  let currentFrame = 0;
  let imgCar = document.querySelector("#imgTopGear");

  function changeCarFrames() {
    currentFrame = (currentFrame + 1) % framesCar.length;
    imgCar.src = framesCar[currentFrame];
    let frameDelay = 200;
    setTimeout(changeCarFrames, frameDelay);
  }
  changeCarFrames();
}
animationTopGear();
