// Dados de cada modelo, iguais aos das páginas individuais.
// Para corrigir ou atualizar um carro, é só editar a linha dele aqui.
const modelos = [
    { id: "911",      nome: "Porsche 911",      versao: "Porsche 911 Targa 4 GTS",      pagina: "911.html",      imagem: "carros/911-frontal.avif",      aceleracao: 3.1, velocidade: 312, potencia: 541,  lugares: 4, ano: 2027, combustivel: "Gasolina", tracao: "Integral", cambio: "Automático" },
    { id: "cayman",   nome: "Porsche Cayman",   versao: "Porsche 718 Cayman GTS 4.0",   pagina: "Cayman.html",   imagem: "carros/cayman-frontal.png",    aceleracao: 4.0, velocidade: 288, potencia: 400,  lugares: 2, ano: 2025, combustivel: "Gasolina", tracao: "Traseira", cambio: "Automático" },
    { id: "boxster",  nome: "Porsche Boxster",  versao: "Porsche 718 Boxster GTS 4.0",  pagina: "boxster.html",  imagem: "carros/boxster-frontal.png",   aceleracao: 4.0, velocidade: 288, potencia: 400,  lugares: 2, ano: 2025, combustivel: "Gasolina", tracao: "Traseira", cambio: "Automático" },
    { id: "taycan",   nome: "Porsche Taycan",   versao: "Taycan 4S Cross Turismo",      pagina: "taycan.html",   imagem: "carros/taycan-frontal.avif",   aceleracao: 3.8, velocidade: 240, potencia: 598,  lugares: 5, ano: 2027, combustivel: "Elétrico", tracao: "Integral", cambio: "Automático" },
    { id: "panamera", nome: "Porsche Panamera", versao: "Panamera 4 E-Hybrid",          pagina: "panamera.html", imagem: "carros/panamera-frontal.avif", aceleracao: 4.1, velocidade: 280, potencia: 470,  lugares: 5, ano: 2027, combustivel: "Híbrido",  tracao: "Integral", cambio: "Automático" },
    { id: "macan",    nome: "Porsche Macan",    versao: "Macan 4 Eletric",              pagina: "macan.html",    imagem: "carros/macan-frontal.avif",    aceleracao: 5.2, velocidade: 220, potencia: 387,  lugares: 5, ano: 2024, combustivel: "Elétrico", tracao: "Traseira", cambio: "Automático" },
    { id: "cayenne",  nome: "Porsche Cayenne",  versao: "Cayenne Turbo Eletric",        pagina: "cayenne.html",  imagem: "carros/cayenne-frontal.png",   aceleracao: 2.5, velocidade: 260, potencia: 1156, lugares: 5, ano: 2027, combustivel: "Elétrico", tracao: "Integral", cambio: "Automático" },
    { id: "918",      nome: "Porsche 918",      versao: "Porsche 918 Spyder",           pagina: "918.html",      imagem: "carros/918-frontal.png",       aceleracao: 2.6, velocidade: 340, potencia: 887,  lugares: 2, ano: 2015, combustivel: "Híbrido",  tracao: "Traseira", cambio: "Automático" },
    { id: "959",      nome: "Porsche 959",      versao: "Porsche 959",                  pagina: "959.html",      imagem: "carros/959-frontal.png",       aceleracao: 3.7, velocidade: 317, potencia: 450,  lugares: 2, ano: 1986, combustivel: "Gasolina", tracao: "Integral", cambio: "Manual" },
];

// melhor: "menor" = vence o menor número; "maior" = vence o maior.
// barra: true desenha uma barrinha proporcional ao melhor valor.
const linhas = [
    { chave: "aceleracao",  rotulo: "0 a 100 km/h",      formato: (v) => v.toLocaleString("pt-BR", { minimumFractionDigits: 1 }) + " s", melhor: "menor", barra: true },
    { chave: "velocidade",  rotulo: "Velocidade máxima", formato: (v) => v + " km/h", melhor: "maior", barra: true },
    { chave: "potencia",    rotulo: "Potência",          formato: (v) => v + " cv",   melhor: "maior", barra: true },
    { chave: "lugares",     rotulo: "Lugares",           formato: (v) => v,           melhor: "maior" },
    { chave: "combustivel", rotulo: "Motor" },
    { chave: "tracao",      rotulo: "Tração" },
    { chave: "cambio",      rotulo: "Câmbio" },
    { chave: "ano",         rotulo: "Ano" },
];

const TOTAL_SLOTS = 3;

const elSelecao = document.getElementById("comparador-selecao");
const elAviso = document.getElementById("comparador-aviso");
const elArea = document.getElementById("comparador-tabela-area");
const elTabela = document.getElementById("comparador-tabela");

const slots = [];

function textoVazio(indice) {
    return indice < 2 ? "Escolha um modelo" : "Opcional";
}

// Monta os 3 seletores
for (let i = 0; i < TOTAL_SLOTS; i++) {
    const slot = document.createElement("div");
    slot.className = "slot";

    const imagem = document.createElement("div");
    imagem.className = "slot-imagem";

    const select = document.createElement("select");
    select.setAttribute("aria-label", "Modelo " + (i + 1));

    const opcaoVazia = document.createElement("option");
    opcaoVazia.value = "";
    opcaoVazia.textContent = "Selecionar...";
    select.appendChild(opcaoVazia);

    modelos.forEach((m) => {
        const opcao = document.createElement("option");
        opcao.value = m.id;
        opcao.textContent = m.nome;
        select.appendChild(opcao);
    });

    const versao = document.createElement("p");
    versao.className = "slot-versao";

    select.addEventListener("change", atualizar);

    slot.append(imagem, select, versao);
    elSelecao.appendChild(slot);

    slots.push({ elemento: slot, imagem, select, versao });
}

function buscarModelo(id) {
    return modelos.find((m) => m.id === id);
}

function atualizar() {
    const usados = slots.map((s) => s.select.value).filter(Boolean);

    slots.forEach((slot, i) => {
        // não deixa o mesmo modelo em dois seletores
        Array.from(slot.select.options).forEach((opcao) => {
            if (!opcao.value) return;
            opcao.disabled = usados.includes(opcao.value) && slot.select.value !== opcao.value;
        });

        const modelo = buscarModelo(slot.select.value);
        slot.imagem.innerHTML = "";

        if (modelo) {
            const img = document.createElement("img");
            img.src = modelo.imagem;
            img.alt = modelo.versao;
            slot.imagem.appendChild(img);
            slot.versao.textContent = modelo.versao;
            slot.elemento.classList.add("preenchido");
        } else {
            const vazio = document.createElement("span");
            vazio.className = "slot-vazio";
            vazio.textContent = textoVazio(i);
            slot.imagem.appendChild(vazio);
            slot.versao.textContent = "";
            slot.elemento.classList.remove("preenchido");
        }
    });

    const escolhidos = slots.map((s) => buscarModelo(s.select.value)).filter(Boolean);

    if (escolhidos.length < 2) {
        elArea.hidden = true;
        elAviso.hidden = false;
        return;
    }

    elAviso.hidden = true;
    elArea.hidden = false;
    montarTabela(escolhidos);
}

function montarTabela(escolhidos) {
    elTabela.innerHTML = "";

    // Cabeçalho: nome do modelo (link) + versão
    const thead = elTabela.createTHead();
    const trHead = thead.insertRow();
    trHead.appendChild(document.createElement("td"));

    escolhidos.forEach((m) => {
        const th = document.createElement("th");
        th.scope = "col";

        const link = document.createElement("a");
        link.href = m.pagina;
        link.textContent = m.nome;
        th.appendChild(link);

        trHead.appendChild(th);
    });

    const tbody = elTabela.createTBody();

    linhas.forEach((linha) => {
        const tr = tbody.insertRow();

        const rotulo = document.createElement("th");
        rotulo.scope = "row";
        rotulo.textContent = linha.rotulo;
        tr.appendChild(rotulo);

        // Descobre o melhor valor da linha (só nas linhas com "melhor")
        let valorMelhor = null;
        let valores = [];

        if (linha.melhor) {
            valores = escolhidos.map((m) => m[linha.chave]);
            valorMelhor = linha.melhor === "menor" ? Math.min(...valores) : Math.max(...valores);

            // Se todos empatam, ninguém é destacado
            if (valores.every((v) => v === valorMelhor)) valorMelhor = null;
        }

        escolhidos.forEach((m) => {
            const td = tr.insertCell();
            const valor = m[linha.chave];

            const texto = document.createElement("span");
            texto.className = "valor";
            texto.textContent = linha.formato ? linha.formato(valor) : valor;
            td.appendChild(texto);

            if (valorMelhor !== null && valor === valorMelhor) {
                td.classList.add("melhor");
            }

            if (linha.barra) {
                const referencia = linha.melhor === "menor" ? Math.min(...valores) : Math.max(...valores);
                const proporcao = linha.melhor === "menor" ? referencia / valor : valor / referencia;

                const barra = document.createElement("span");
                barra.className = "barra";
                const preenchida = document.createElement("span");
                preenchida.className = "barra-preenchida";
                preenchida.style.width = Math.round(proporcao * 100) + "%";
                barra.appendChild(preenchida);
                td.appendChild(barra);
            }
        });
    });

    // Nome completo da versão, em uma linha extra no fim
    const trVersao = tbody.insertRow();
    const rotuloVersao = document.createElement("th");
    rotuloVersao.scope = "row";
    rotuloVersao.textContent = "Versão";
    trVersao.appendChild(rotuloVersao);

    escolhidos.forEach((m) => {
        const td = trVersao.insertCell();
        td.textContent = m.versao;
    });
}

atualizar();