document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastroForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;

        
        const Chamado = Parse.Object.extend("Chamado");
        const novoChamado = new Chamado();

       
        novoChamado.set("nome", nome);
        novoChamado.set("email", email);
        novoChamado.set("assunto", assunto);
        novoChamado.set("mensagem", mensagem);
        novoChamado.set("finalizado", false); 

        
        novoChamado.save().then(() => {
            
            form.reset();
            alert("Chamado enviado com sucesso!");
        }).catch((error) => {
            console.error('Erro ao enviar chamado: ', error);
            alert("Ocorreu um erro ao enviar o chamado. Por favor, tente novamente.");
        });
    });
});
