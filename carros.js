const botoes =
    document.querySelectorAll(
        ".informacoes button"
    );


botoes.forEach((botao) => {

    botao.addEventListener(
        "click",
        () => {
            botoes.forEach((item) => {

                item.classList.remove(
                    "ativo"
                );

            });


            botao.classList.add(
                "ativo"
            );

        }
    );

});

// Entrada dos carros: o CSS faz a animação, aqui só liga a classe
// depois que a página (e as imagens) terminaram de carregar.

window.addEventListener("load", () => {

    setTimeout(() => {
        document.body.classList.add("carregado");
    }, 200);

});


// Números das especificações "subindo" até o valor final
// quando a pessoa rola até eles (usa os atributos
// data-valor-final e data-decimais em cada <strong>).

function contarNumero(elemento) {

    const valorFinal = parseFloat(elemento.dataset.valorFinal);
    const decimais = parseInt(elemento.dataset.decimais || "0", 10);
    const valorSpan = elemento.querySelector(".valor-animado");
    const duracao = 900;
    const inicio = performance.now();

    function passo(agora) {

        const progresso = Math.min((agora - inicio) / duracao, 1);
        const valorAtual = valorFinal * progresso;

        valorSpan.textContent = valorAtual.toLocaleString("pt-BR", {
            minimumFractionDigits: decimais,
            maximumFractionDigits: decimais,
        });

        if (progresso < 1) {
            requestAnimationFrame(passo);
        }
    }

    requestAnimationFrame(passo);
}

const elementosComNumero =
    document.querySelectorAll("[data-valor-final]");

if (elementosComNumero.length > 0) {

    const observadorNumeros = new IntersectionObserver(
        (entradas) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    contarNumero(entrada.target);

                    observadorNumeros.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.6 }
    );

    elementosComNumero.forEach((elemento) => {
        observadorNumeros.observe(elemento);
    });
}


// Cartões de curiosidade: clicar vira o cartão e mostra o fato

document.querySelectorAll(".cartao-curiosidade").forEach((cartao) => {

    cartao.setAttribute("aria-pressed", "false");

    cartao.addEventListener("click", () => {
        const virado = cartao.classList.toggle("virado");
        cartao.setAttribute("aria-pressed", String(virado));
    });

});


// Evolução do carro: clicar no ano troca a foto e os apontamentos

const botoesAno = document.querySelectorAll(".evolucao-anos button");
const carrosEvolucao = document.querySelectorAll(".evolucao-carro");

function mostrarAno(ano) {

    carrosEvolucao.forEach((carro) => {

        if (carro.dataset.ano === ano) {

            carro.hidden = false;

            // força o layout pra a transição de opacidade rodar
            void carro.offsetWidth;

            carro.classList.add("mostrar");

        } else {

            carro.classList.remove("mostrar");
            carro.hidden = true;
        }
    });
}

botoesAno.forEach((botao) => {

    botao.addEventListener("click", () => {

        botoesAno.forEach((item) => item.classList.remove("ativo"));
        botao.classList.add("ativo");

        mostrarAno(botao.dataset.ano);
    });
});

if (carrosEvolucao.length > 0) {
    requestAnimationFrame(() => {
        carrosEvolucao[0].classList.add("mostrar");
    });
}


// "O 911 nas pistas": fade-in + deslocamento leve ao entrar na tela

const carrosPista = document.querySelectorAll(".carro-pista");

if (carrosPista.length > 0) {

    const observadorPistas = new IntersectionObserver(
        (entradas) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visivel");

                    observadorPistas.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    carrosPista.forEach((carro) => {
        observadorPistas.observe(carro);
    });
}