$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscarFrase);

function fraseAleatoria() {

    $("#spinner").toggle();// assim que uma requisição for chamada o spinner irá aparecer 

    $.get("http://localhost:3000/frases", trocaFrase).fail(function() {   
        $("#erro").show();//caso o usuario esteja sem internet ira acontecer esse evento
        setTimeout(function() {
            $("#erro").toggle();
        },1500);
    }).always(function() {
        $("#spinner").toggle();//mesmo se caso aparecer algum erro o spinner irá aparecer
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

function buscarFrase() {
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    console.log(fraseId);
    var dados = {id: fraseId};
    $.get("http://localhost:3000/frases",dados,trocaFrase).fail(function() {
        $("#erro").toggle();
        setTimeout(function() {
            $("#erro").toggle();
        }, 2000);
    }).always(function() {
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}