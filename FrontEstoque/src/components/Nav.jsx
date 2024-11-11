import React from 'react';

const Nav = () => {
  return (
    <div>
      <nav>
        <div>
          <h1>Usuário</h1>
        </div>

        <div>
          <h4>Gerenciamento</h4>
          <ul>
            <li>Produtos</li>
            <li>Categorias</li>
            <li>Fornecedores</li>
          </ul>
        </div>

        <div>
          <h4>Movimentação</h4>
          <ul>
            <li>Entradas</li>
            <li>Saídas</li>
          </ul>
        </div>

        <div>
          <h4>Administração</h4>
          <ul>
            <li>Atividades</li>
            <li>Exportar</li>
          </ul>
        </div>

        <div>
          <button>Sair</button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
