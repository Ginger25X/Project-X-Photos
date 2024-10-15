// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    mostrarConfirmacao('Produto adicionado ao carrinho!');
    console.log('Produto adicionado:', produto); // Verificação
}

// Função para mostrar mensagem de confirmação
function mostrarConfirmacao(mensagem) {
    const confirmacao = document.createElement('div');
    confirmacao.className = 'mensagem-confirmacao';
    confirmacao.textContent = mensagem;
    document.body.appendChild(confirmacao);

    setTimeout(() => {
        confirmacao.remove(); // Remove após 3 segundos
    }, 3000);
}

// Adiciona eventos aos botões de adicionar ao carrinho
document.querySelectorAll('.botao-adicionar').forEach(botao => {
    botao.addEventListener('click', () => {
        const produto = {
            nome: botao.getAttribute('data-nome'),
            preco: parseFloat(botao.getAttribute('data-preco'))
        };
        adicionarAoCarrinho(produto);
    });
});
