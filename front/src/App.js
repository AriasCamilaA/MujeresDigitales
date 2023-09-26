import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.js';
import './App.css';
import NavLateralSimple from './components/NavLateralSimple/index.js';

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
          </Routes>
        </div>
      </div>
      </BrowserRouter>
  );
}

export default App;
