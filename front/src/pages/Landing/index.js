import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='Landing'>
      <nav className='bg_moradoOscuro fixed-top'>
        <div className='container navSuperior py-2'>
          <img src='img/logoCompleto.svg'/>
          <div>
            <Link to="/Login" className='btn_outline_blanco p-2 me-2'>Iniciar Sesión</Link>
            <Link to="/Registrarse" className='btn_outline_blanco p-2'>Registrarse</Link>
          </div>
        </div>
      </nav>
      <header className='header'>
        <div className='img'></div>
        <div className='bg_moradoOscuro color_blanco texto'>
          <h1 className='text-center px-3'>
            ¡Las Manzanas del Cuidado tienen todo lo que tú y tu familia necesitan!
          </h1>
        </div>
      </header>
      <section className='text-center conoce container'>
        <h1>
          Conoce las Manzanas del Cuidado
        </h1>
        <p>
          Tiempo y servicio para las mujeres
        </p>
        <div className='cardsContainer'>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-white bg_moradoClaro rounded">
                <i className='fa-solid fa-question color_blanco'></i>
                Qué son
              </h4>
              <p>  
                Las Manzanas del Cuidado son espacios de la ciudad en los que brindamos tiempo y servicios a las mujeres y a sus familias.
                ¡Aquí ellas pueden cumplir sus sueños, mientras cuidamos a quienes cuidan!
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-white bg_moradoClaro rounded">
                <i className='fa-solid fa-compass color_blanco'></i>
                Dónde encontrarlas
              </h4>
              <p>
                <ul>
                  <li>Antonio Nariño</li>
                  <li>Teusaquillo</li>
                  <li>Puente Aranda</li>
                  <li>Suba</li>
                  <li>Fontibon</li>
                  <li>Chapinero</li>
                  <li>San Cristobal</li>
                  <li>Más...</li>
                </ul>
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-white bg_moradoClaro rounded">
                <i className='fa-solid fa-compass color_blanco'></i>
                Servicios
              </h4>
              <p>
                Puedes terminar de cursar su bachillerato, tomar clases de yoga, recibir consultas médicas, asesoría psico jurídica y mucho más, mientras cuidamos a quienes tú cuidas.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-white bg_moradoClaro rounded">
                <i className='fa-solid fa-compass color_blanco'></i>
                Asistencia en casa
              </h4>
              <p>
                Programa de Asistencia en Casa es una iniciativa del Sistema Distrital de Cuidado, dirigida a cuidadoras/es de personas con discapacidad mayores de 18 años que requieren altos niveles de apoyo.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-white bg_moradoClaro rounded">
                <i className='fa-solid fa-compass color_blanco'></i>
                Buses del cuidado
              </h4>
              <p>
                Son la versión móvil de las Manzanas del Cuidado. Vehículos totalmente equipados para llevar servicios gratuitos de formación, bienestar y cuidado a las zonas rurales y urbanas más alejadas en Bogotá.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing;