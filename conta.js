// Conta do usuário e favoritos.
// Tudo fica salvo no próprio navegador (localStorage): é uma
// demonstração, não um login de verdade com servidor.

const CHAVE_USUARIOS = "pe-usuarios";
const CHAVE_SESSAO = "pe-sessao";

// Modelos que podem ser favoritados (mesmos dados das páginas)
const MODELOS_CONTA = [
    { id: "911",      nome: "Porsche 911",      versao: "911 Targa 4 GTS",         pagina: "911.html",      imagem: "carros/911-frontal.avif" },
    { id: "cayman",   nome: "Porsche Cayman",   versao: "718 Cayman GTS 4.0",      pagina: "Cayman.html",   imagem: "carros/cayman-frontal.png" },
    { id: "boxster",  nome: "Porsche Boxster",  versao: "718 Boxster GTS 4.0",     pagina: "boxster.html",  imagem: "carros/boxster-frontal.png" },
    { id: "taycan",   nome: "Porsche Taycan",   versao: "Taycan 4S Cross Turismo", pagina: "taycan.html",   imagem: "carros/taycan-frontal.avif" },
    { id: "panamera", nome: "Porsche Panamera", versao: "Panamera 4 E-Hybrid",     pagina: "panamera.html", imagem: "carros/panamera-frontal.avif" },
    { id: "macan",    nome: "Porsche Macan",    versao: "Macan 4 Eletric",         pagina: "macan.html",    imagem: "carros/macan-frontal.avif" },
    { id: "cayenne",  nome: "Porsche Cayenne",  versao: "Cayenne Turbo Eletric",   pagina: "cayenne.html",  imagem: "carros/cayenne-frontal.png" },
    { id: "918",      nome: "Porsche 918",      versao: "918 Spyder",              pagina: "918.html",      imagem: "carros/918-frontal.png" },
    { id: "959",      nome: "Porsche 959",      versao: "Porsche 959",             pagina: "959.html",      imagem: "carros/959-frontal.png" },
];


// ---------- leitura e gravação ----------

function lerJSON(chave, padrao) {
    try {
        const valor = localStorage.getItem(chave);
        return valor ? JSON.parse(valor) : padrao;
    } catch (erro) {
        return padrao;
    }
}

function salvarJSON(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
    } catch (erro) {
        console.error("Não foi possível salvar no navegador:", erro);
    }
}

function listarUsuarios() {
    return lerJSON(CHAVE_USUARIOS, {});
}

function usuarioDaSessao() {
    try {
        return localStorage.getItem(CHAVE_SESSAO);
    } catch (erro) {
        return null;
    }
}


// ---------- conta ----------

function usuarioLogado() {
    const chave = usuarioDaSessao();
    const usuario = chave ? listarUsuarios()[chave] : null;
    return usuario ? { chave, ...usuario } : null;
}

// Nome de usuário: 3 a 20 caracteres, só letras, números, ponto, _ e -
const FORMATO_USUARIO = /^[\p{L}0-9._-]{3,20}$/u;

// "Ana" e "ana" são a mesma conta
function chaveDoUsuario(nome) {
    return nome.trim().toLowerCase();
}

// Retorna uma mensagem de erro, ou null se deu certo
function criarConta(nome, senha) {
    nome = nome.trim();

    if (!FORMATO_USUARIO.test(nome)) {
        return "O nome de usuário precisa ter de 3 a 20 caracteres, sem espaços (pode usar letras, números, ponto, _ e -).";
    }
    if (senha.length < 4) return "A senha precisa ter pelo menos 4 caracteres.";

    const usuarios = listarUsuarios();
    const chave = chaveDoUsuario(nome);

    if (usuarios[chave]) {
        return "Esse nome de usuário já existe. Escolha outro ou use a aba Entrar.";
    }

    usuarios[chave] = { nome, senha, favoritos: [] };
    salvarJSON(CHAVE_USUARIOS, usuarios);
    localStorage.setItem(CHAVE_SESSAO, chave);

    return null;
}

function entrar(nome, senha) {
    const chave = chaveDoUsuario(nome);
    const usuario = listarUsuarios()[chave];

    if (!usuario || usuario.senha !== senha) {
        return "Usuário ou senha incorretos.";
    }

    localStorage.setItem(CHAVE_SESSAO, chave);
    return null;
}

function sair() {
    localStorage.removeItem(CHAVE_SESSAO);
}


// ---------- favoritos ----------

function favoritosDoUsuario() {
    const usuario = usuarioLogado();
    return usuario ? (usuario.favoritos || []) : [];
}

// Liga/desliga o favorito e retorna se ficou favoritado
function alternarFavorito(id) {
    const chave = usuarioDaSessao();
    const usuarios = listarUsuarios();

    if (!chave || !usuarios[chave]) return false;

    const lista = usuarios[chave].favoritos || [];
    const posicao = lista.indexOf(id);

    if (posicao === -1) {
        lista.push(id);
    } else {
        lista.splice(posicao, 1);
    }

    usuarios[chave].favoritos = lista;
    salvarJSON(CHAVE_USUARIOS, usuarios);

    return posicao === -1;
}

function modeloDaPagina() {
    const arquivo = decodeURIComponent(location.pathname.split("/").pop()).toLowerCase();
    return MODELOS_CONTA.find((m) => m.pagina.toLowerCase() === arquivo);
}


// ---------- ícone de perfil no cabeçalho ----------
// Sem conta: vai para o login. Com conta: vai para os favoritos.

document.querySelectorAll(".perfil").forEach((imagem) => {

    const irParaConta = () => {
        location.href = usuarioLogado() ? "favoritos.html" : "login.html";
    };

    imagem.title = usuarioLogado() ? "Meus favoritos" : "Entrar";
    imagem.setAttribute("role", "link");

    if (!imagem.classList.contains("perfil-escura")) imagem.tabIndex = 0;

    imagem.addEventListener("click", irParaConta);
    imagem.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") irParaConta();
    });
});


// ---------- botão de favoritar nas páginas dos modelos ----------

const modeloAtual = modeloDaPagina();

if (modeloAtual) {

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-favoritar";

    function pintarBotao() {
        const favoritado = favoritosDoUsuario().includes(modeloAtual.id);

        botao.classList.toggle("favoritado", favoritado);
        botao.setAttribute("aria-pressed", String(favoritado));
        botao.innerHTML =
            '<span class="coracao" aria-hidden="true">' + (favoritado ? "♥" : "♡") + "</span>" +
            (favoritado ? "Favoritado" : "Favoritar");
    }

    botao.addEventListener("click", () => {

        // sem conta: manda para o login e favorita quando voltar
        if (!usuarioLogado()) {
            location.href =
                "login.html?voltar=" + encodeURIComponent(modeloAtual.pagina) +
                "&favoritar=" + encodeURIComponent(modeloAtual.id);
            return;
        }

        alternarFavorito(modeloAtual.id);
        pintarBotao();

        botao.classList.remove("pulsar");
        void botao.offsetWidth;
        botao.classList.add("pulsar");
    });

    pintarBotao();
    document.body.appendChild(botao);
}