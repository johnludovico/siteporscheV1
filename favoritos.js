// Página "Meus favoritos"

const usuario = usuarioLogado();

if (!usuario) {

    location.replace("login.html?voltar=favoritos.html");

} else {

    const elSaudacao = document.getElementById("favoritos-saudacao");
    const elLista = document.getElementById("lista-favoritos");
    const elVazio = document.getElementById("favoritos-vazio");

    elSaudacao.textContent = "Olá, " + usuario.nome + ".";

    function desenharFavoritos() {

        const ids = favoritosDoUsuario();
        const favoritos = MODELOS_CONTA.filter((m) => ids.includes(m.id));

        elLista.innerHTML = "";
        elVazio.hidden = favoritos.length > 0;

        favoritos.forEach((modelo) => {

            const cartao = document.createElement("article");
            cartao.className = "favorito";

            const link = document.createElement("a");
            link.href = modelo.pagina;
            link.className = "favorito-link";

            const imagem = document.createElement("img");
            imagem.src = modelo.imagem;
            imagem.alt = modelo.nome;

            const nome = document.createElement("h2");
            nome.textContent = modelo.nome;

            const versao = document.createElement("p");
            versao.textContent = modelo.versao;

            link.append(imagem, nome, versao);

            const remover = document.createElement("button");
            remover.type = "button";
            remover.className = "favorito-remover";
            remover.textContent = "Remover dos favoritos";
            remover.addEventListener("click", () => {
                alternarFavorito(modelo.id);
                desenharFavoritos();
            });

            cartao.append(link, remover);
            elLista.appendChild(cartao);
        });
    }

    document.getElementById("botao-sair").addEventListener("click", () => {
        sair();
        location.href = "index.html";
    });

    desenharFavoritos();
}