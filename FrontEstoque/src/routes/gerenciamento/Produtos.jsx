import React, { useContext } from 'react';
import { ContextPage } from '../../context/PageContext';
import { useLocation } from 'react-router-dom';
import Pesquisa from '../../components/Pesquisa';
import ListProducts from '../../components/ListProducts';

const Produtos = () => {
  const {search} = useLocation()
  const { state } = useContext(ContextPage);
  const products = state.products;

  const query = new URLSearchParams(search).get("q");

  const searchProduct = state.products.filter((product)=> product.ref.includes(query))
  console.log(searchProduct)

  return (
    <div className="container-produtos margin-left">
      <Pesquisa path='produtos'/>

      <div className="title">
        <p>Referência</p>
        <p>Categoria</p>
        <p>Descrição</p>
        <p>Total</p>
      </div>

      <ListProducts products={ query ? searchProduct : products }/>

    </div>
  );
};

export default Produtos;
