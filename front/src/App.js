import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/index.js';
import Login from './pages/Login/index.js';
import Register from './pages/Register/index.js';
import './App.css';
import ListUsuarios from './pages/Usuarios/ListUsuarios.js';

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path='/Landing' element={<Landing/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Registrarse' element={<Register/>}/>
            <Route path='/Usuarios' element={<ListUsuarios/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;