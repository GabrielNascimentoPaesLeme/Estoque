import React, {useContext} from 'react'
import { ContextPage } from '../../context/PageContext'

const Produtos = () => {
  const {state} = useContext(ContextPage)
  const products = state.products
  console.log(products)
  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          <p>Referência: {product.ref}</p>
          <p>Categoria: {product.categoria}</p>
          <p>Cor: {product.cor}</p>
          <p>Desc.: {product.descricao}</p>
          <p>Total desse item em estoque: {product.total}</p>
        </div>
      ))}
    </div>
  )
}

export default Produtos