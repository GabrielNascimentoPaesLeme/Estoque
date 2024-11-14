import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageProvider } from './context/PageContext.jsx';
import ProtectedRoute from './services/ProtectedRoute.jsx';

import Login from './components/Login.jsx';

/* Rotas */
import Home from './routes/Home.jsx';
//Categorias
import Categorias from './routes/gerenciamento/Categorias.jsx';
import Produtos from './routes/gerenciamento/Produtos.jsx';
import Fornecedores from './routes/gerenciamento/Fornecedores.jsx';
import Entradas from './routes/movimentação/Entradas.jsx';

import './index.css';
import App from './App.jsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <App />,
          children: [
            {
              path: '/home',
              element: <Home />,
            },
            {
              path: '/categorias',
              element: <Categorias />,
            },
            {
              path: '/produtos',
              element: <Produtos />,
            },
            {
              path: '/entradas',
              element: <Entradas />,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true, // Habilita transições suaves
      v7_relativeSplatPath: true, // Corrige a resolução relativa em rotas com "splat"
      v7_normalizeFormMethod: true, // Normaliza "formMethod" para uppercase
      v7_partialHydration: true, // Ajusta a hidratação parcial do RouterProvider
      v7_skipActionErrorRevalidation: true, // Pula a revalidação após erros 4xx/5xx em "actions"
      v7_fetcherPersist: true, // Garante que dados persistam ao usar o fetcher
    },
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageProvider>
      <RouterProvider router={router} />
    </PageProvider>
  </StrictMode>
);
