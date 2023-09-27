import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavLateralSimple from './components/NavLateralSimple/index.js';
import Landing from './pages/Landing.js';
import Login from './pages/Login/index.js';
import Register from './pages/Register/index.js';
import './App.css';
import ListUsuarios from './pages/Usuarios/ListUsuarios.js';

function App() {
  return (
      <BrowserRouter>
      <div className='d-flex page'>
        <div className='menuContainer'>
          <NavLateralSimple/> 
        </div>
        <div className='pageContainer'>
          <Routes>
            <Route path='/Landing' element={<Landing/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Registrarse' element={<Register/>}/>
            <Route path='/Usuarios' element={<ListUsuarios/>}/>
          </Routes>
        </div>
      </div>
      </BrowserRouter>
  );
}

export default App;
