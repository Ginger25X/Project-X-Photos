// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; // Pega os itens do carrinho ou inicia um novo array
    carrinho.push(produto); // Adiciona o produto ao array do carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Salva o carrinho atualizado no localStorage
    
    // Exibe a mensagem de confirmação
    mostrarConfirmacao('Produto adicionado ao carrinho!');
}

// Função para mostrar mensagem de confirmação
function mostrarConfirmacao(mensagem) {
    const confirmacao = document.createElement('div');
    confirmacao.className = 'mensagem-confirmacao';
    confirmacao.textContent = mensagem;
    document.body.appendChild(confirmacao);

    setTimeout(() => {
        confirmacao.remove(); // Remove a mensagem após 3 segundos
    }, 3000);
}

// Função para exibir o carrinho na página "Meu Carrinho"
function exibirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoItens = document.getElementById('carrinho-itens');
    const carrinhoTotal = document.getElementById('carrinho-total');

    carrinhoItens.innerHTML = ''; // Limpa o carrinho
    let total = 0;

    if (carrinho.length === 0) {
        carrinhoItens.innerHTML = '<p>O carrinho está vazio.</p>';
    } else {
        carrinho.forEach((produto, index) => {
            const item = document.createElement('div');
            item.className = 'item-carrinho';
            item.innerHTML = `
                <p>${produto.nome}</p>
                <button onclick="removerDoCarrinho(${index})">Remover</button>
            `;
            carrinhoItens.appendChild(item);
            total += produto.preco; // Soma o preço do produto ao total
        });

        carrinhoTotal.innerHTML = `<p>Total: R$ ${total.toFixed(2)}</p>`;
    }
}

// Função para remover um item do carrinho
function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho.splice(index, 1); // Remove o produto pelo índice
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o carrinho no localStorage
    exibirCarrinho(); // Atualiza a exibição do carrinho
}

// Função para limpar o carrinho
function limparCarrinho() {
    localStorage.removeItem('carrinho');
    exibirCarrinho();
}
