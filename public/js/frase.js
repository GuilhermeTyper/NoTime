$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria() {
    $.get("http://localhost:3000/frases", trocaFrase).fail(function() {   
        $("#erro").show();//caso o usuario esteja sem internet ira acontecer esse evento
        setTimeout(function() {
            $("#erro").toggle();
        },1500);
    });
}
    function trocaFrase(data) {
        var frase = $(".frase");
        var numeroAleatorio = Math.floor(Math.random() * data.length);//sortindo e multiplicando o json mais o seu tamnho para limita-lo
        frase.text(data[numeroAleatorio].texto);//pegando a propriedade texto e transformando em texto tudo aleatoriamente
        atualizaTamanhoFrase();//essa função está vindo do main.js
        atualizaTempoInicial(data[numeroAleatorio].tempo);//essa função está vindo do main.js
        console.log(data);//verificando se o json está sendo aplicado corretamente no app


}