import React, {useContext} from 'react';
import Chart from '../components/Chart';
import { ContextPage } from '../context/PageContext';

const Home = () => {
  const {state} = useContext(ContextPage)
  const products = state.products
  const totalproducts = products.reduce((total, product) => total + product.total, 0)
  
  return (
    <div className="home">
      <div>
        <h1>Página Inicial</h1>
        <h5>Visão geral do controle de estoque.</h5>
      </div>

      <div className="options-home">
        <div>
          <h3>
            {products.length} Produtos cadastrados <br/> {totalproducts} Itens em estoque
          </h3>
          <a href="/">Mais informações</a>
        </div>

        <div>
          <h3>
            {products.length} Produtos cadastrados <br/> {totalproducts} Itens em estoque
          </h3>
          <a href="/">Mais informações</a>
        </div>

        <div>
          <h3>
            {products.length} Produtos cadastrados <br/> {totalproducts} Itens em estoque
          </h3>
          <a href="/">Mais informações</a>
        </div>

        <div>
          <h3>
            {products.length} Produtos cadastrados <br/> {totalproducts} Itens em estoque
          </h3>
          <a href="/">Mais informações</a>
        </div>
      </div>

      <div className="graficos">
        <div className="grafico">
          <Chart />
        </div>
      </div>

    </div>
  );
};

export default Home;
