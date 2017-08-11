$("#botao-frase").click(fraseAleatoria);//caso botã-frase seja clicado irá execulta uma função 
$("#botao-frase-id").click(buscarFrase); //caso botã-frase-id seja clicado irá execulta uma função 

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
    $("#spinner").toggle();//mostrando o spinner
    var fraseId = $("#frase-id").val();//pegando o id do input do html e atribuino a uma variavel
    console.log(fraseId);//mostrando o que o usuario digitou pelo input no console
    var dados = {id: fraseId};// criando um objeto que irá criar um id e atribuindo a uma variavel
    $.get("http://localhost:3000/frases",dados,trocaFrase).fail(function() {
        $("#erro").toggle();//caso apresente erro a mensagem irá ser colocada para o usuario
        setTimeout(function() {
            $("#erro").toggle();  //após 2 minutos a menssagem será retirada da tela do usuario 
        }, 2000);
    }).always(function() {
        $("#spinner").toggle();// indepedente de qualquer coisa o spinner irá aparecer para o usuario
    });
}

function trocaFrase(data) {
    var frase = $(".frase");//pegando a classe frase do html e atribuindo a uma variavel
    frase.text(data.texto);//pegando o texto do arquivo data e atribuindo a função text e  fazendo ela ser atribuida a função frase
    atualizaTamanhoFrase();//chamando função que se encontra no arquivo main.js
    atualizaTempoInicial(data.tempo);//chamando função que se encontra no arquivo main.js
}