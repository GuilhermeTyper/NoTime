$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $.get("http://localhost:3000/frases", trocaFrase);

    function trocaFrase(data) {
        var frase = $(".frase");
        var numeroAleatorio = Math.floor(Math.random() * data.length);
        frase.text(data[numeroAleatorio].texto);//pegando a propriedade texto e transformando em texto tudo aleatoriamente
    }
}