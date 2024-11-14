import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const Pesquisa = ({path}) => {
  const [search, setSearch] = useState('')
  const navigate= useNavigate()

  
  useEffect(() => {
    if(search !== ''){
      navigate(`/${path}?q=${search}`);
    } else {
      navigate(`/${path}`)
    }
  }, [search])

  return (
    <div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control type="search" placeholder="Pesquise por referência ou categoria" onChange={(e) => setSearch(e.target.value)} />
        </Form.Group>
      </Form>
    </div>
  );
};

export default Pesquisa;
