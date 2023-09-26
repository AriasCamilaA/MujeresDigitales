import { Link } from 'react-router-dom'
import './NavLateralSimple.css'

const NavLateralSimple = () => {
  return (
    <div className='navLateral'>
        <header className="bg_moradoOscuro navSuperior">
        <div className="container py-2">
            <div >
              <a href="/Landing">
                <img src='img/logoCompleto.svg'/>
              </a>
            </div>
        </div>
        </header>
        <h1 className='text-center px-3'>
        ¡Las Manzanas del Cuidado tienen todo lo que tú y tu familia necesitan!
        </h1>
        <p className='text-center px-3'>
        Aquí puedes estudiar, ejercitarte, crear tu propio negocio, conectarte con oportunidades de empleo y mucho más, mientras cuidamos a quienes tú cuidas.
        </p>
        <div className='d-flex p-4 gap-3'>
          <Link to="/Login" className=" w-50 btn_outline_moradoOscuro p-2 d-flex align-items-center"><i className="fa-solid fa-right-to-bracket me-2" color='white'></i>Entra</Link>
          <Link to="/Registrarse" className="w-50 btn_outline_moradoOscuro p-2 d-flex align-items-center"><i className="fa-solid fa-plus me-2" color='white'></i>Registrarte</Link>
        </div>
        <footer className='text-center py-2'>
            © Arias y Delgado Senasoft 2023 
        </footer>
    </div>
  )
}

export default NavLateralSimple
