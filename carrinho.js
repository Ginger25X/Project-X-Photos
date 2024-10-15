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

// Adicione eventos para os botões de adicionar ao carrinho
document.querySelectorAll('.botao-adicionar').forEach(botao => {
    botao.addEventListener('click', () => {
        const produto = {
            nome: botao.getAttribute('data-nome'), // Pega o nome do produto
            preco: parseFloat(botao.getAttribute('data-preco')) // Pega o preço do produto
        };
        adicionarAoCarrinho(produto); // Chama a função para adicionar ao carrinho
    });
});

// Função para exibir o carrinho na página "Meu Carrinho"
function exibirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoItens = document.getElementById('carrinho-itens');
    const carrinhoTotal = document.getElementById('carrinho-total');

    carrinhoItens.innerHTML = ''; // Limpa o carrinho
    let total = 0;

    if (carrinho.length === 0) {
        carrinhoItens.innerHTML = '<p>O carrinho está vazio.</p>';
        carrinhoTotal.innerHTML = ''; // Limpa o total se o carrinho estiver vazio
    } else {
        carrinho.forEach((produto, index) => {
            const item = document.createElement('div');
            item.className = 'item-carrinho';
            item.innerHTML = `
                <p>${produto.nome} - R$ ${produto.preco.toFixed(2)}</p>
                <button class="botao-remover" onclick="removerDoCarrinho(${index})">Remover</button>
                <button class="botao-comprar" onclick="comprarProduto('${produto.nome}')">Comprar</button>
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
    exibirCarrinho(); // Atualiza a exibição do carrinho
}

// Função para comprar um produto (exemplo)
function comprarProduto(nome) {
    alert(`Você comprou: ${nome}`);
    // Aqui você pode redirecionar para uma página de checkout ou realizar outra ação
}

// Chame a função para exibir o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', exibirCarrinho);
