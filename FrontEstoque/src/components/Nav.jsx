import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {

  const navigate = useNavigate()

  const usuario = localStorage.getItem("username")

  return (
    <div>
      <nav>
        <div className='username'>
          <h1 onClick={() => navigate('/home')}>{usuario}</h1>
        </div>

        <div>
          <h4>Gerenciamento</h4>
          <ul>
            <li onClick={() => navigate('/produtos')}>Produtos</li>
            <li>Categorias</li>
            <li>Fornecedores</li>
          </ul>
        </div>

        <div>
          <h4>Movimentação</h4>
          <ul>
            <li onClick={()=> navigate('/entradas')}>Entradas</li>
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
