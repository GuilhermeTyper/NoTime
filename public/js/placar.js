$("#botao-placar").click(mostrarPlacar);


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
    $(this).parent().parent().remove(); /*caso eu queria remover o pai de um elemento html */
}

function mostrarPlacar() {
    $(".placar").slideToggle(2000);
}
