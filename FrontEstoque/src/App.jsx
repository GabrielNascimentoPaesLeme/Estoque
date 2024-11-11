import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './routes/Home';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='container-app'>
      <Nav/>
      <Outlet/>
    </div>
  );
}

export default App;
