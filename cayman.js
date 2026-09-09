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

window.addEventListener(
    "load",
    () => {

        const carroLateral =
            document.querySelector(
                ".carro-lateral"
            );

        const carroFrontal =
            document.querySelector(
                ".carro-frontal"
            );


        carroLateral.style.opacity = "0";

        carroFrontal.style.opacity = "0";


        carroLateral.style.transform =
            "translateY(40px)";


        carroFrontal.style.transform =
            "translateY(40px)";


        setTimeout(() => {

            carroLateral.style.transition =
                "all 1s ease";

            carroFrontal.style.transition =
                "all 1s ease";


            carroLateral.style.opacity = "1";

            carroFrontal.style.opacity = "1";


            carroLateral.style.transform =
                "translateY(0)";


            carroFrontal.style.transform =
                "translateY(0)";

        }, 200);

    }
);