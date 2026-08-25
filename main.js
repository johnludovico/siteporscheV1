const menu = document.querySelector(".menu");

menu.addEventListener("click", function () {

    const modelos = document.querySelector(".modelos-menu");

    if (modelos.style.display === "none") {

        modelos.style.display = "block";

    } else {

        modelos.style.display = "none";

    }

});



function mostrarMensagem() {

    const destaques = document.querySelector(".destaques");

    destaques.scrollIntoView({
        behavior: "smooth"
    });

}



const cards = document.querySelectorAll(".card");

cards.forEach(function (card) {

    card.addEventListener("click", function () {

        const nome = card.querySelector(".nome-carro").innerText;

        alert("Você selecionou o Porsche " + nome);

    });

});


const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


cards.forEach(function (card) {

    card.style.opacity = "0";

    card.style.transform = "translateY(40px)";

    card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

});