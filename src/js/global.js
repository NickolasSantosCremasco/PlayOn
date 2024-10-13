//Animação dos elementos aparecerem de acordo com o campo de visão do usuário
const Observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const elements = document.querySelectorAll(".hidden");
elements.forEach((element) => Observer.observe(element));


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