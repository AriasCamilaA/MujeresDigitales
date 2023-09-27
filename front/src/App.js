import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing/index.js';
import Login from './pages/Login/index.js';
import Register from './pages/Register/index.js';
import ListUsuarios from './pages/Usuarios/index.js';
import NavSuperior from './components/NavSuperior/index.js';
import Footer from './components/Footer/index.js';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        {
          window.location.pathname !== "/Landing" 
          && window.location.pathname !== "/Login" 
          && window.location.pathname !== "/Registrarse" ? <NavSuperior/> : null
        }
      <Routes>

        {/* Rutas sin logueo */}
        <Route path="/Landing" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registrarse" element={<Register />} />
        
        {/* Rutas ya logueado */}
        <Route path="/Usuarios" element={<ListUsuarios />} />

        {/* Envuelve Footer en un Route */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
