import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const ListProducts = ({products}) => {
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

                <Accordion.Body className="list-product">
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
                              <td>{size.quantidade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )
                  )}
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
