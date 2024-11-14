import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

const ListProducts = ({ products }) => {
  const [isEditing, setIsEditing] = useState(false)
  const handleNewQuantidy = (e) => [
    console.log(e.target.value)
  ]
  return (
    <div>
      {products.map((product, index) => {
        const sizesByColor = Array.isArray(product.sizes)
          ? product.sizes.reduce((acumulador, size) => {
              if (size.cor) {
                if (!acumulador[size.cor]) {
                  acumulador[size.cor] = [];
                }
                acumulador[size.cor].push(size);
              }
              return acumulador;
            }, {})
          : {};
        return (
          <div className={`infos`} key={index}>
            <Accordion>
              <Accordion.Item eventKey={index}>
                <Accordion.Header className={`text-infos`}>
                  <p>{product.ref}</p>
                  <p>{product.categoria}</p>
                  <p>{product.descricao}</p>
                  <p>{product.total}</p>
                </Accordion.Header>

                <Accordion.Body>
                  <div className="list-product">
                    {Object.entries(sizesByColor).map(
                      ([cor, sizes], colorIndex) => (
                        <table key={colorIndex}>
                          <thead>
                            <tr>
                              <th colSpan="2" className="table-header">
                                <strong>{cor}</strong>
                              </th>
                            </tr>
                            <tr>
                              <th>Tamanho</th>
                              <th>Quantidade</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* Cada cor será um título da lista */}
                            {sizes.map((size, sizeIndex) => (
                              <tr key={sizeIndex}>
                                <td>{size.size}</td>
                                {!isEditing ?<td>{size.quantidade}</td>:<td style={{width: '5%', padding: '0px'}}><input type="number" defaultValue={size.quantidade} style={{width: '50%', fontSize: '.95rem'}} onChange={(e) => handleNewQuantidy(e)} /></td>}
                                
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )
                    )}
                  </div>
                  <div className='buttons-edit'>
                    <button onClick={() => setIsEditing(!isEditing)}>Editar</button>
                    <button>Adicionar nova cor</button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default ListProducts;
