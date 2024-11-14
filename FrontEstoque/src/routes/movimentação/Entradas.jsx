import React, { useContext } from 'react';
import { ContextPage } from '../../context/PageContext';
import { useLocation } from 'react-router-dom';
import Pesquisa from '../../components/Pesquisa'
import ListProducts from '../../components/ListProducts'

const Entradas = () => {
  const { state } = useContext(ContextPage);
  const {search} = useLocation()
  const products = state.products;
  const query = new URLSearchParams(search).get("q");
  const searchProduct = products.filter((product)=> product.ref.includes(query))
  
  return (
    <div className='margin-left'>
      <Pesquisa path='entradas'/>
      {query ? <ListProducts products={searchProduct}/> : ''}
    </div>
  )
}

export default Entradas