import React, { useContext, useState, useEffect } from 'react';
import { ContextPage } from '../context/PageContext.jsx';
import { useNavigate } from 'react-router-dom';
import './login.css'

const Login = () => {
  const { login, dispatch } = useContext(ContextPage);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* loginSucces é a constante que vai receber true ou false. O retorno da função login depende da autenticação do usuário pelos dados setados em "userData" */
    const loginSuccess = await login(dispatch, userData);

    /* Se a autenticação for bem sucedida, retorna um true e redireciona para  página principal de exibição de receitas */
    if (loginSuccess) {
      navigate('/home');
    } else {
      /* Manda para registro */
      console.log('Algo deu errado');
    }
  };

  return (
    <div className="container-login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            required
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="buttons">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <p>
            Não tem uma conta?! <span>Resgistre-se</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
