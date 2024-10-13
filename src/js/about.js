const el = document.querySelector("#aboutUs");
const text = "Sobre nós";
const Interval = 300;

//Função que irá mostrar o texto na tela como se estivesse sendo escrito na hora
//dividirá o texto palavra por palavra e a mostrará na tela após 0.3 segundos
function showText(el, text, Interval) {
    const char = text.split("").reverse();

    const typer = setInterval(() => { 
        if (!char.length) {
            clearInterval(typer); 
            el.style.animation = "bounce 1s" 
            return;
        }

        const next = char.pop(); 
        el.innerHTML += next; 
       
    }, Interval);

}

showText(el, text, Interval);