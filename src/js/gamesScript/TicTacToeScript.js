const celulas = document.querySelectorAll(".celula");
let checarTurno = true;

const JOGADOR_X = "X";
const JOGADOR_O = "O";

let personagem1 = document.querySelector('#personagem1')
let personagem2 = document.querySelector('#personagem2')

const COMBINACOES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]; //todas as combinações possíveis do jogo da velha

document.addEventListener("click", (event) => { //quando o clique acontecer no document
    if(event.target.matches(".celula")) { //se o alvo for determinada celula das quais ele apertou
        jogar(event.target.id); // jogar recebe o id da célula clicada
    }
});

function jogar(id) { //função para o jogo ocorrer, ou seja marcar a célula clicada
    const celula = document.getElementById(id); //ira pegar o id da célula que foi clicada
    turno = checarTurno ? JOGADOR_X : JOGADOR_O; // verifica de quem é o turno do Jogador X ou do O
    if (turno === JOGADOR_X) {
        personagem1.src = '../../img/site/PersonagemFeliz.png' 
        var transicaoDePersonagem1 = setTimeout(() => {
            personagem1.src = '../../img/site/PersonagemParado.png' 
        }, 1000);
    } 
    
    if (turno === JOGADOR_O) {
        personagem2.src = '../../img/site/PersonagemFeliz.png'
       
        var transicaoDePersonagem = setTimeout(() => {
            personagem2.src = '../../img/site/PersonagemParado.png' 
        }, 1000);
    }
    celula.textContent = turno; //se for do jogador x irá escrever na tela X se for do O ira escrever O
    celula.classList.add(turno);// adicionará a celula uma classe chamada turno
    checarVencedor(turno); //checa 
}

function checarVencedor(turno) { // função para verificar se houve ganhador após a celula ser marcada
    const vencedor = COMBINACOES.some((comb) => { // colocará como vencedor aquele que as satisfaça uma das combinações
        return comb.every((index) => { //para cada index
            return celulas[index].classList.contains(turno); //retorne aquelas que tem classe turno
        })
    });

    if (vencedor){ //se existir vencedor o jogo encerra
        encerrarJogo(turno);
    } else if (checarEmpate()) { //se não, verifica se há empate no jogo
        encerrarJogo(); // se sim encerra.
    } else { //se não, ele passa a vez para o outro usuário
        checarTurno = !checarTurno;
    }
}

function checarEmpate() { //função que verifica se há empate
    let x = 0;
    let o = 0;

    for (index in celulas) { //para cada celula dentro de celulas faça
        if(!isNaN(index)) { //se index for diferente de not a number
            if(celulas[index].classList.contains(JOGADOR_X)) { //se o index dentro da célula for igual ao 'jogador X' o x++ sera realizado
                x++;
            }
    
            if(celulas[index].classList.contains(JOGADOR_O)) { //se o index dentro de célula for igual ao 'jogador O' o o++ sera realizado
                o++;
            }
        }
    }

    return x + o === 9 ? true : false; //se o número de incrementações no O junto do número de incrementações no X for igual a 9 significa que temos um empate
}
function encerrarJogo(vencedor = null) { //função que encerra o jogo
    const telaEscura = document.getElementById("tela-escura"); // seleciona a tag que tiver tela-escura no id
    const h2 = document.createElement("h2"); //cria um elemento h2
    const h3 = document.createElement("h3"); //cria um elemento h3
    let menssagem = null; 

    telaEscura.style.display = "block"; //display block na tela escura que aparecerá na tela
    telaEscura.appendChild(h2); //h2 será adicionado como filho/dentro da telaEscura
    telaEscura.appendChild(h3); //h3 será adicionado como filho/dentro da telaEscura

    if (vencedor) { // se houver vencedor no jogo
        if (vencedor === 'X') {
            h2.innerHTML = `O player 1 <span>${vencedor}</span> venceu` ; //nome do usuário X vencedor
        } else {
            h2.innerHTML = `O player 2 <span>${vencedor}</span> venceu` ; //nome do usuário O vencedor           
        }
        
    } else { //se houver empate
        h2.innerHTML = "Empatou"; //exibe "empatou" na tela
    }

    let contador = 3; // contador para reiniciar o jogo
    setInterval(() => {
        h3.innerHTML = `Reiniciando em ${contador--}`; //contador iniciará para reiniciar o jogo
    }, 1000);

    setTimeout(() => location.reload(), 4000); //o site recarregará após 4 segundos

}

