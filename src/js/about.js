
/* Sobre-nós, letras que se escrevem automaticamente na tela*/
const el = document.querySelector("#aboutUs");
const text = "Sobre nós";
const Interval = 300;

//função que fará o texto aparecer na tela
function showText(el, text, Interval) {
    const char = text.split("").reverse(); //esta função diviria as frases em apenas letras
    

    const typer = setInterval(() => { //cria um intervalo que se o cumprimento de char não for verdadeiro
        if (!char.length) {
            clearInterval(typer); // vai limpar o intervalo
            el.style.animation = "bounce 1s" // vai criar uma animação de descida na letra que entrar na tela de 1 segundo
            return;
        }

        const next = char.pop(); // irá para a próxima letra e excluirá a que foi colocada anteriormente
        el.innerHTML += next; // selecionará a próxima letra do elemento
       
    }, Interval);

   

    
}

//executa a função criada acima
showText(el, text, Interval);