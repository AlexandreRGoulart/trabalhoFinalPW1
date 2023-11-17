document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("pesquisar").addEventListener("click",function(){

        var palavraIngles = document.getElementById("textoInput").value;
        pesquisarSign(palavraIngles);


    });



    function pesquisarSign(palavra){
        const BaseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
        const URL = BaseURL + palavra;

        fetch(URL).then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        }).then(data => {
            const arrayDefinicoes = data[0].meanings.flatMap(function(meaning) {
                return meaning.definitions.map(function(definition) {
                    return definition.definition;
                });
            });

            exibirSignificadosNoHTML(arrayDefinicoes); 
        }).catch(error => {
            window.alert("Palavra não encontrada, certifique-se de que a palavra esteja em inglês e correta");
            console.error("Erro:", error);    
        });
    }

    function exibirSignificadosNoHTML(definicoes) {
    var elementoResultados = document.getElementById("resultSignificados");

    if (elementoResultados) {
        // Limpa o conteúdo atual do elemento
        elementoResultados.innerHTML = "";

        // Itera sobre as definições e cria um parágrafo numerado para cada uma
        definicoes.forEach(function(definicao, indice) {
            var paragrafo = document.createElement("p");
            paragrafo.textContent = (indice + 1) + " " + definicao;
            elementoResultados.appendChild(paragrafo);
        });
    } else {
        console.error("Elemento HTML não encontrado.");
    }
}
});
