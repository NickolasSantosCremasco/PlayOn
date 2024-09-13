var btn = document.querySelector(".single");
var container = document.querySelector(".container");

//Função que sera ativa quando cliar no elemento btn que esta no HTML, quando clicar o botão irá sumir e a tela será redirecionada para o jogo singleplayer
btn.addEventListener("click", function() {

    if(container.style.display === "block") {
        container.style.display = "none";
    }else{
        container.style.display = "block"; // se não, continuará se mostrando na tela do usuário
    }

});