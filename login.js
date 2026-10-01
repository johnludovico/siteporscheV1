// Página de login / criar conta

const parametros = new URLSearchParams(location.search);

// Só volta para páginas do próprio site
const destinosPermitidos = ["favoritos.html", "index.html", ...MODELOS_CONTA.map((m) => m.pagina)];
const destino = destinosPermitidos.includes(parametros.get("voltar"))
    ? parametros.get("voltar")
    : "favoritos.html";

const modeloParaFavoritar = MODELOS_CONTA.find((m) => m.id === parametros.get("favoritar"));

function concluir() {
    if (modeloParaFavoritar && !favoritosDoUsuario().includes(modeloParaFavoritar.id)) {
        alternarFavorito(modeloParaFavoritar.id);
    }
    location.href = destino;
}

// Quem já está logado não precisa ver esta página
if (usuarioLogado()) {
    concluir();
}

const elMotivo = document.getElementById("conta-motivo");

if (modeloParaFavoritar) {
    elMotivo.textContent = "Entre ou crie uma conta para favoritar o " + modeloParaFavoritar.nome + ".";
    elMotivo.hidden = false;
}


// Abas Entrar / Criar conta

const abas = document.querySelectorAll(".conta-aba");
const formEntrar = document.getElementById("form-entrar");
const formCriar = document.getElementById("form-criar");
const elErro = document.getElementById("conta-erro");

function mostrarErro(mensagem) {
    elErro.textContent = mensagem || "";
    elErro.hidden = !mensagem;
}

abas.forEach((aba) => {
    aba.addEventListener("click", () => {

        abas.forEach((item) => {
            item.classList.toggle("ativa", item === aba);
            item.setAttribute("aria-pressed", String(item === aba));
        });

        const criando = aba.dataset.aba === "criar";
        formCriar.hidden = !criando;
        formEntrar.hidden = criando;
        mostrarErro("");

        (criando ? formCriar : formEntrar).querySelector("input").focus();
    });
});


formEntrar.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const erro = entrar(
        formEntrar.elements.usuario.value,
        formEntrar.elements.senha.value
    );

    if (erro) {
        mostrarErro(erro);
    } else {
        concluir();
    }
});


formCriar.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const erro = criarConta(
        formCriar.elements.usuario.value,
        formCriar.elements.senha.value
    );

    if (erro) {
        mostrarErro(erro);
    } else {
        concluir();
    }
});