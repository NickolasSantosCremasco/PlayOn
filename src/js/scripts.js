/* Navbar */

function menuShow() {
  let menuMobile = document.querySelector("#menu-icon");
  let navlist = document.querySelector(".navlist");
  if (navlist.classList.contains("open")) {
    navlist.classList.remove("open");
    menuMobile.classList.add("bx-x");
    menuMobile.classList.remove("bx-x");
  } else {
    navlist.classList.add("open");
    menuMobile.classList.add("bx-x");
  }
}

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
