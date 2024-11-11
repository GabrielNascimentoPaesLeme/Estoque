import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/* Rotas */
import Home from './routes/Home.jsx';
//Categorias
import Categorias from './routes/gerenciamento/Categorias.jsx';
import Produtos from './routes/gerenciamento/Produtos.jsx';
import Fornecedores from './routes/gerenciamento/Fornecedores.jsx';


import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/categorias',
        element: <Categorias/>
      },
      {
        path: '/produtos',
        element: <Produtos/>
      },
      {
        path: '/fornecedores',
        element: <Fornecedores/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
