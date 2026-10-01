function alternarTema() {

    document.body.classList.toggle("modo-escuro");

}


// Página inicial: mostra o menu só depois que a pessoa passa do banner

const bannerInicial = document.querySelector(".pagina-inicial .banner");

if (bannerInicial) {

    function atualizarMenu() {

        const passouDoBanner =
            window.scrollY > bannerInicial.offsetHeight - 120;

        document.body.classList.toggle("menu-visivel", passouDoBanner);
    }

    window.addEventListener("scroll", atualizarMenu, { passive: true });
    window.addEventListener("resize", atualizarMenu);

    atualizarMenu();
}


// Menu lateral: o botão "☰ menu" abre a navegação entre as páginas

{
    const linksPrincipais = [
        { texto: "Meus favoritos",   pagina: "favoritos.html" },
        { texto: "Comparar modelos", pagina: "comparar.html" },
    ];

    const linksCarros = [
        { texto: "Porsche 911",      pagina: "911.html" },
        { texto: "Porsche Cayman",   pagina: "Cayman.html" },
        { texto: "Porsche Boxster",  pagina: "boxster.html" },
        { texto: "Porsche Taycan",   pagina: "taycan.html" },
        { texto: "Porsche Panamera", pagina: "panamera.html" },
        { texto: "Porsche Macan",    pagina: "macan.html" },
        { texto: "Porsche Cayenne",  pagina: "cayenne.html" },
        { texto: "Porsche 918",      pagina: "918.html" },
        { texto: "Porsche 959",      pagina: "959.html" },
    ];

    const paginaAtual = decodeURIComponent(location.pathname.split("/").pop()).toLowerCase();

    function montarLista(links) {
        const lista = document.createElement("ul");

        links.forEach((item) => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = item.pagina;
            link.textContent = item.texto;

            if (item.pagina.toLowerCase() === paginaAtual) {
                link.setAttribute("aria-current", "page");
            }

            li.appendChild(link);
            lista.appendChild(li);
        });

        return lista;
    }

    const fundo = document.createElement("div");
    fundo.className = "menu-lateral-fundo";

    const menu = document.createElement("nav");
    menu.className = "menu-lateral";
    menu.id = "menu-lateral";
    menu.setAttribute("aria-label", "Menu do site");

    const topo = document.createElement("div");
    topo.className = "menu-lateral-topo";
    topo.innerHTML =
        "<span>Menu</span>" +
        '<button class="menu-lateral-fechar" type="button" aria-label="Fechar menu">×</button>';

    const tituloCarros = document.createElement("h2");
    tituloCarros.textContent = "Modelos";

    menu.append(topo, montarLista(linksPrincipais), tituloCarros, montarLista(linksCarros));
    document.body.append(fundo, menu);

    const botoesAbrir = document.querySelectorAll(".item-menu, .banner-menu");
    const botaoFechar = menu.querySelector(".menu-lateral-fechar");
    let ultimoBotao = null;

    function abrirMenu(evento) {
        evento.preventDefault();
        ultimoBotao = evento.currentTarget;

        document.body.classList.add("menu-aberto");
        botoesAbrir.forEach((b) => b.setAttribute("aria-expanded", "true"));
        botaoFechar.focus();
    }

    function fecharMenu() {
        if (!document.body.classList.contains("menu-aberto")) return;

        document.body.classList.remove("menu-aberto");
        botoesAbrir.forEach((b) => b.setAttribute("aria-expanded", "false"));

        if (ultimoBotao) ultimoBotao.focus();
    }

    botoesAbrir.forEach((botao) => {
        botao.setAttribute("aria-controls", "menu-lateral");
        botao.setAttribute("aria-expanded", "false");
        botao.addEventListener("click", abrirMenu);
    });

    botaoFechar.addEventListener("click", fecharMenu);
    fundo.addEventListener("click", fecharMenu);

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") fecharMenu();
    });
}