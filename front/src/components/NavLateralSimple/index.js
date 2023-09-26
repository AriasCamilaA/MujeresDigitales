import { Link } from 'react-router-dom'
import './NavLateralSimple.css'

const NavLateralSimple = () => {
  return (
    <div className='navLateral'>
        <header className="bg_moradoOscuro navSuperior">
        <div className="container py-2">
            <div className="d-flex flex-column align-items-center">
            {/* <i className="fa-solid fa-apple-whole fa-2xl color_verde me-1"></i> */}
            <img src='img/logo-simbolo-mc_.svg'/>
            <h1 className="text-center titleNav">Manzanas del Cuidado</h1>
            </div>
        </div>
        </header>
        <div className='p-4'>
          <Link className="btn_outline_naranja p-2 d-flex align-items-center"><i className="fa-solid fa-right-to-bracket me-2"></i>Entra</Link>
        </div>
        <footer className='text-center py-2'>
            © Arias y Delgado Senasoft 2023 
        </footer>
    </div>
  )
}

export default NavLateralSimple
