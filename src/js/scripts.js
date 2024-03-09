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

setInterval(() => {
  nextImg();
}, 10000);

function nextImg() {
  cont++;
  if (cont > 3) {
    cont = 1;
  }

  document.getElementById("radio" + cont).checked = true;
}

/* Animation Mario */

let mario = document.querySelector("#mario");
let coin = document.querySelector("#moeda");
let blockCoin = document.querySelector("#blockCoin");

let frames = [
  "src/img/assets/MarioCaminhando1.png",
  "src/img/assets/MarioCaminhando2.png",
  "src/img/assets/MarioCaminhando3.png",
  "src/img/assets/MarioCaminhando4.png",
];

let currentFrame = 0;

function changeFrames(timestamp) {
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