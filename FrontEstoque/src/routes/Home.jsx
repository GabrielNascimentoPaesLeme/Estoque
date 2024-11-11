import React from 'react';
import Chart from '../components/Chart';

const Home = () => {
  return (
    <div className="home">
      <div>
        <h1>Página Inicial</h1>
        <h5>Visão geral do controle de estoque.</h5>
      </div>

      <div className="options-home">
        <div>
          <h3>
            Produtos cadastrados <br /> Itens em estoque
          </h3>
          <a href="/">Mais informações</a>
        </div>

        <div>
          <h3>
            Produtos cadastrados <br /> Itens em estoque
          </h3>
          <a href="/">Mais informações</a>
        </div>

        <div>
          <h3>
            Produtos cadastrados <br /> Itens em estoque
          </h3>

          <a href="/">Mais informações</a>
        </div>

        <div>
          <h3>
            Produtos cadastrados <br /> Itens em estoque
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
