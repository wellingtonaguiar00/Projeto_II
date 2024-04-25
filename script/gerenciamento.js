document.addEventListener('DOMContentLoaded', function () {
    const listaChamados = document.getElementById('listaChamados');
    const respostaForm = document.getElementById('respostaForm');

    function carregarChamados() {
        const Chamado = Parse.Object.extend("Chamado");
        const query = new Parse.Query(Chamado);

        listaChamados.innerHTML = '';

        query.find().then((resultados) => {
            resultados.forEach((chamado) => {
                const nome = chamado.get("nome");
                const email = chamado.get("email");
                const assunto = chamado.get("assunto");
                const mensagem = chamado.get("mensagem");
                const finalizado = chamado.get("finalizado");

                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>Nome:</strong> ${nome}<br>
                    <strong>E-mail:</strong> ${email}<br>
                    <strong>Assunto:</strong> ${assunto}<br>
                    <strong>Mensagem:</strong> ${mensagem}<br>
                    <strong>Finalizado:</strong> ${finalizado ? 'Sim' : 'Não'}<br><br>
                `;

                listaChamados.appendChild(listItem);
            });
        }).catch((error) => {
            console.error('Erro ao carregar chamados: ', error);
            alert("Ocorreu um erro ao carregar os chamados. Por favor, tente novamente.");
        });
    }

    carregarChamados();

    respostaForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const respostaTexto = document.getElementById('respostaTexto').value;
        
        const Resposta = Parse.Object.extend("Resposta");
        const novaResposta = new Resposta();
        
        novaResposta.set("texto", respostaTexto);
        // Substitua "chamado" pela referência ao chamado específico
        // novaResposta.set("chamado", chamado);

        novaResposta.save().then(() => {
            alert("Resposta enviada com sucesso!");
        }).catch((error) => {
            console.error('Erro ao enviar resposta: ', error);
            alert("Ocorreu um erro ao enviar a resposta. Por favor, tente novamente.");
        });
    });
});
