$("#botao-placar").click(mostrarPlacar);
$("#botao-sync").click(sincronizaPlacar);


function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Guilherme";
    var numPalavras = $("#contador-palavras").text();

    /*var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";*/
    var linha = novaLinha(usuario, numPalavras); /*"<tr>" + 
                    "<td>" + usuario + "</td>"+
                    "<td>" + numPalavras    + "</td>"+
                    "<td>" + botaoRemover + "</td>" +
               "</tr>";   "esse código em grafite tambem funciona mais não é uma boa pratica de manipulação html"" */
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {//adicionando o evento para o placar fazer uma animação de scroll 
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate({

        scrollTop: posicaoPlacar + "px"

    }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);


    return linha;
}


function removeLinha() {
    event.preventDefault(); /*caso eu queira para um evento de diremenciona para a cima da pagina */
    var linha = $(this).parent().parent(); /*caso eu queria remover o pai de um elemento html */
    linha.fadeOut(1000);

    setTimeout(function () {
        linha.remove();
    }, 1000);
}

function mostrarPlacar() {
    $(".placar").stop().slideToggle(2000);//quando o usuario ficar apertando varias vezes o botão ele só execultará uma vez
}

function sincronizaPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");//pegando todas tr que são filhas diretas de tbody igual o css
    linhas.each(function () {//Esse loop irá percorrer essa função para pegar todos usuarios e palavras do nosso tbody
        var usuario = $(this).find("td:nth-child(1)").text();//pegando o primeiro filho da tbody nesse caso o nome
        var palavras = $(this).find("td:nth-child(2)").text();//pegando o segundo filho da tbody nesse caso o No. de palavras
        var score = {//criando um documento que irá colocar as var de usuario e palavras como usuario e pontos
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score)//pengado o nosso documento score e colocando dentro do array placar  
    });

    var dados = {
        placar: placar //atribuindo o array placar para um document para poder ser passado para requisição POST
    };

    $.post("http://localhost:3000/placar", dados, function () {//envinando os dados para o servidor atraves do POST
        console.log("Salvou o placar no servidor.");
    });
}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar", function (data) {
        $(data).each(function () {
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);//quando eu atualizar a pagina os eventos de remover ainda ficará ativos
            $("tbody").append(linha);
        });
    });
}