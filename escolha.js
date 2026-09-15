// Perguntas do questionário. Cada opção carrega "tags" que
// descrevem características de um Porsche.
const perguntas = [
    {
        texto: "Pra que você mais usaria o carro?",
        opcoes: [
            { texto: "Rodar na cidade no dia a dia", tags: ["cidade"] },
            { texto: "Viajar com conforto ao lado da família", tags: ["familia"] },
            { texto: "Sentir a adrenalina em alta velocidade", tags: ["adrenalina"] },
            { texto: "Explorar terrenos fora do asfalto", tags: ["aventura"] },
        ],
    },
    {
        texto: "Quantas pessoas normalmente andariam com você?",
        opcoes: [
            { texto: "Só eu, ou eu e mais uma pessoa", tags: ["dupla"] },
            { texto: "Eu e mais três amigos", tags: ["quatro"] },
            { texto: "A família toda, com espaço de sobra", tags: ["familia"] },
        ],
    },
    {
        texto: "Qual tipo de motor combina mais com você?",
        opcoes: [
            { texto: "Gasolina, do jeito clássico", tags: ["gasolina"] },
            { texto: "Elétrico, silencioso e moderno", tags: ["eletrico"] },
            { texto: "Híbrido, o melhor dos dois mundos", tags: ["hibrido"] },
        ],
    },
    {
        texto: "Como você descreveria seu estilo?",
        opcoes: [
            { texto: "Clássico e atemporal", tags: ["classico"] },
            { texto: "Luxuoso e confortável", tags: ["luxuoso"] },
            { texto: "Ousado, chamando atenção por onde passa", tags: ["ousado"] },
            { texto: "Esportivo e ágil", tags: ["esportivo"] },
        ],
    },
];

// Cada carro carrega as mesmas tags usadas nas perguntas.
// O carro com mais tags em comum com as respostas vence.
const carros = [
    {
        nome: "Porsche 911",
        tags: ["adrenalina", "cidade", "dupla", "gasolina", "classico", "esportivo"],
        imagem: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Porsche/911/11757/1762933836560/front-left-side-47.jpg",
        descricao: "Um esportivo atemporal, ágil na cidade e afiado em qualquer curva.",
        link: "911.html",
    },
    {
        nome: "Porsche Cayman",
        tags: ["adrenalina", "cidade", "dupla", "gasolina", "esportivo"],
        imagem: "https://s2-autoesporte.glbimg.com/2-1ZT9-N1DEywxmo9ciaRzOshKI=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/6/V/uuImfYSPSdfVh9rFY7dQ/2015-02-04-p05.jpg",
        descricao: "Leve, equilibrado e feito pra quem gosta de sentir a estrada.",
        link: "Cayman.html",
    },
    {
        nome: "Porsche Boxster",
        tags: ["adrenalina", "dupla", "gasolina", "esportivo"],
        imagem: "https://cdn.motor1.com/images/mgl/P419W/s3/2021-porsche-boxster-25-front.jpg",
        descricao: "Conversível esportivo pra curtir a estrada com o teto aberto.",
        link: "boxster.html",
    },
    {
        nome: "Porsche Taycan",
        tags: ["cidade", "familia", "quatro", "eletrico", "ousado"],
        imagem: "https://a.storyblok.com/f/322327/1700x1300/a94bdd6a4c/ta24q3eix0002-taycan-turbo-s-front.jpg/m/990x673/smart/filters:format(webp)",
        descricao: "Elétrico e desportivo, silencioso por fora e rápido por dentro.",
        link: "taycan.html",
    },
    {
        nome: "Porsche Panamera",
        tags: ["familia", "quatro", "hibrido", "luxuoso"],
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReIVR9vu2rFfYovtaFVJk6WMoI13KRTiDMwQbJUf-2Ei7UT4Au9WS_3StV&s=10",
        descricao: "Sedã de luxo, feito pra rodar longas distâncias com muito conforto.",
        link: "panamera.html",
    },
    {
        nome: "Porsche Macan",
        tags: ["familia", "aventura", "gasolina", "eletrico", "esportivo"],
        imagem: "https://res.cloudinary.com/unix-center/image/upload/c_limit,dpr_3.0,f_auto,fl_progressive,g_center,h_240,q_auto:good,w_385/lgmrqoqbrtrxovayjjqa.jpg",
        descricao: "SUV compacto e ágil, com espaço pra família sem perder a pegada esportiva.",
        link: "macan.html",
    },
    {
        nome: "918 Spyder",
        tags: ["adrenalina", "dupla", "eletrico", "hibrido", "ousado"],
        imagem: "https://s2-autoesporte.glbimg.com/7R9wOj5e1m-7h5U9IedH1afxvyk=/0x0:620x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/C/T/HsZ3M3QqCoxV6ehWm6hA/2015-08-14-porsche-918-spyder-19.jpg",
        descricao: "Focado em velocidade e potência máxima, pra quem quer o extremo.",
        link: "918.html",
    },
    {
        nome: "Porsche Cayenne",
        tags: ["familia", "aventura", "gasolina", "eletrico", "hibrido", "luxuoso"],
        imagem: "https://prs.porsche.com/iod/image/BR/9YBCT1/1/N4Igxg9gdgZglgcxALlAQynAtmgLnaAZxQG0BdAGnDSwFMAnNFUOAExRFoA9cBaAGwgB3XjHrQ+-WjFwgqEAA74izEADc09OBlnIQrWoQDWuRSAC+5qrShq44qHSi6W7PQFV6AIwwBZNGAYciCKylDEqJZU-IgAFvhQSKggbBwAIgCCAJrBoQThzFEgCuKsAK5gLiluIACcWQBCAMIAKgCMuUr5EaCQsIikIAAMAIrBbWkA7OMA4gBs4wAK01RtLQBMwQAsAGKbVACsABpNwXMAkgDMZwDStWcAcg-Bkxk3L0cHL1kdVAAclwawT+LT+wVqGQAouDzr5gjsWtcqDM2jNgucAOpIkAAKUh+xAABkZi00gAlQnBEZtHFUsn3KjuS4EgBqTVZ0Mo4AgZWc9AAnhwGmTglgIAZ+FlaJoUOshutJpYrCBCLRcAkED0QDAIPQcLoQAArBS0JBUXCMcIKTQ2XQwND8VWWIA?clientId=icc",
        descricao: "SUV versátil da marca, pronto tanto pro asfalto quanto pra estrada de terra.",
        link: "cayenne.html",
    },
    {
        nome: "Porsche 959",
        tags: ["adrenalina", "dupla", "gasolina", "classico"],
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaQJG17JvyVrVrvw3Mq1d3Nfs1aGIDPqdy4xxKtfygs7QFmz-L4kMcEubp&s=10",
        descricao: "Um dos supercarros mais revolucionários da história da marca.",
        link: "959.html",
    },
];

let respostas = [];
let perguntaAtual = 0;

const elIntro = document.getElementById("quiz-intro");
const elPerguntas = document.getElementById("quiz-perguntas");
const elResultado = document.getElementById("quiz-resultado");
const elPasso = document.getElementById("quiz-passo");
const elBarra = document.getElementById("quiz-barra-preenchida");
const elPerguntaTexto = document.getElementById("quiz-pergunta-texto");
const elOpcoes = document.getElementById("quiz-opcoes");

document.getElementById("botao-iniciar").addEventListener("click", iniciarQuiz);
document.getElementById("botao-refazer").addEventListener("click", iniciarQuiz);

function iniciarQuiz() {
    respostas = [];
    perguntaAtual = 0;

    elIntro.hidden = true;
    elResultado.hidden = true;
    elPerguntas.hidden = false;

    mostrarPergunta();
}

function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];

    elPasso.textContent = "Pergunta " + (perguntaAtual + 1) + " de " + perguntas.length;
    elBarra.style.width = (perguntaAtual / perguntas.length) * 100 + "%";
    elPerguntaTexto.textContent = pergunta.texto;

    elOpcoes.innerHTML = "";

    pergunta.opcoes.forEach((opcao) => {
        const botao = document.createElement("button");
        botao.className = "quiz-opcao";
        botao.type = "button";
        botao.textContent = opcao.texto;
        botao.addEventListener("click", () => responder(opcao.tags));
        elOpcoes.appendChild(botao);
    });
}

function responder(tags) {
    respostas.push(...tags);
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    elBarra.style.width = "100%";

    let melhorCarro = carros[0];
    let melhorPontuacao = -1;

    carros.forEach((carro) => {
        const pontuacao = carro.tags.filter((tag) => respostas.includes(tag)).length;

        if (pontuacao > melhorPontuacao) {
            melhorPontuacao = pontuacao;
            melhorCarro = carro;
        }
    });

    const imagem = document.getElementById("resultado-imagem");
    imagem.src = melhorCarro.imagem;
    imagem.alt = melhorCarro.nome;

    document.getElementById("resultado-titulo").textContent = melhorCarro.nome;
    document.getElementById("resultado-descricao").textContent = melhorCarro.descricao;
    document.getElementById("resultado-link").href = melhorCarro.link;

    elPerguntas.hidden = true;
    elResultado.hidden = false;
}