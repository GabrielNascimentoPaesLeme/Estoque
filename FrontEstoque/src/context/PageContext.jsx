import { createContext, useEffect, useReducer } from 'react';
import api from '../services/api';

let products = [];

async function login(dispatch, userData) {
  try {
    const response = await api.post('/login', userData);
    if (response.data) {
      const { token, nameExistingUser } = response.data;
      const payload = { ...userData, token, nameExistingUser };

      dispatch({ type: 'LOGIN', payload });
      /* localStorage.setItem('user', JSON.stringify(userData)); */
      localStorage.setItem('username', nameExistingUser);
      sessionStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Ocorreu um erro ao fazer login: ', error);
  }
}

async function listProducts(dispatch) {
  try {
    const response = await api.get('/listar');
    dispatch({ type: 'SET_PRODUCTS', payload: response.data });
    console.log(response.data)
  } catch (error) {
    console.error('Erro ao buscar receitas');
  }
}

const initialState = {
  user: null,
  token: null,
  products,
};

const pageReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        token: action.payload,
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export const ContextPage = createContext();

export const PageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pageReducer, initialState);

  useEffect(()=> {
    listProducts(dispatch)
    console.log(state.products)
  }, [])

  return (
    <ContextPage.Provider value={{ state, dispatch, login }}>
      {children}
    </ContextPage.Provider>
  );
};
