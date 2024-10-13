const celulas = document.querySelectorAll(".celula");
let checarTurno = true;

const JOGADOR_X = "X";
const JOGADOR_O = "O";

let personagem1 = document.querySelector('#personagem1')
let personagem2 = document.querySelector('#personagem2')

//todas as combinações possíveis de um jogo vitorioso
const COMBINACOES = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]; 

//Quando o clique do mouse acontecer na tela verifica em qual celula foi e a marca
document.addEventListener("click", (event) => { 
    if(event.target.matches(".celula")) { 
        jogar(event.target.id); 
    }
});

//Função para mudar a vez e fazer o torcedor vibrar
function jogar(id) { 
    const celula = document.getElementById(id); 
    turno = checarTurno ? JOGADOR_X : JOGADOR_O; 
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
    celula.textContent = turno;
    celula.classList.add(turno);
    checarVencedor(turno); 
}
// função para verificar se houve ganhador após cada célula marcada
//caso exista o jogo termina mostrando o vencedor ou declarando o empate
function checarVencedor(turno) { 
    const vencedor = COMBINACOES.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turno); 
        })
    });

    if (vencedor){ 
        encerrarJogo(turno);
    } else if (checarEmpate()) { 
        encerrarJogo(); 
    } else { 
        checarTurno = !checarTurno;
    }
}

//função que verifica se há empate no jogo
function checarEmpate() { 
    let x = 0;
    let o = 0;

    for (index in celulas) { 
        if(!isNaN(index)) { 
            if(celulas[index].classList.contains(JOGADOR_X)) { 
                x++;
            }
            if(celulas[index].classList.contains(JOGADOR_O)) { 
                o++;
            }
        }
    }
    return x + o === 9 ? true : false; 
}
//função que encerra o jogo
//após encerrar reinicia e caso haja vencedor mostra o nome do usuário na tela e caso seja empate mostra empatou na tela
function encerrarJogo(vencedor = null) { 
    const telaEscura = document.getElementById("tela-escura"); 
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    let menssagem = null; 

    telaEscura.style.display = "block"; 
    telaEscura.appendChild(h2); 
    telaEscura.appendChild(h3); 
    if (vencedor) { 
        if (vencedor === 'X') {
            h2.innerHTML = `O player 1 <span>${vencedor}</span> venceu` ;
        } else {
            h2.innerHTML = `O player 2 <span>${vencedor}</span> venceu` ;           
        }
        
    } else { 
        h2.innerHTML = "Empatou"; 
    }
    let contador = 3; 
    setInterval(() => {
        h3.innerHTML = `Reiniciando em ${contador--}`;
    }, 1000);
    setTimeout(() => location.reload(), 4000); 
}

