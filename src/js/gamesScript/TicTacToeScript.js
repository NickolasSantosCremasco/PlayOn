const celulas = document.querySelectorAll(".celula");
let checarTurno = true;

const JOGADOR_X = "X";
const JOGADOR_O = "O";

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
    } else if (checarEmpate()) { //se não, verifica se há empate no jogo, se sim encerra.
        encerrarJogo();
    } else { //se não, ele troca checar o turno para passar a vez para o outro usuário
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
    const telaEscura = document.getElementById("tela-escura");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let menssagem = null;

    telaEscura.style.display = "block";
    telaEscura.appendChild(h2);
    telaEscura.appendChild(h3);

    if (vencedor) {
        h2.innerHTML = `O player <span>${vencedor}</span> venceu` ;
    } else {
        h2.innerHTML = "Empatou";
    }

    let contador = 3;
    setInterval(() => {
        h3.innerHTML = `Reiniciando em ${contador--}`;
    }, 1000);

    setTimeout(() => location.reload(), 4000);

}

