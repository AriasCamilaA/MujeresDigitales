import React from 'react';
import './Landing.css';

const Landing = () => {
  return (
    <div className='Landing w-75 m-auto'>
      <section className='container text-center'>
        <h1 className='text-center'>
        ¡Las Manzanas del Cuidado tienen todo lo que tú y tu familia necesitan!
        </h1>
        <p>
        Aquí puedes estudiar, ejercitarte, crear tu propio negocio, conectarte con oportunidades de empleo y mucho más, mientras cuidamos a quienes tú cuidas.
        </p>
      <div className='cardsContainer'>
        <div class="card text-white bg_moradoClaro">
          <img class="card-img-top" src="img/manzana-cuidado-bosa.jpg" alt='Comunicación'/>
          <div class="card-body">
            <h4 class="card-title">Comunicación</h4>
          </div>
        </div>
        <div class="card text-white bg_moradoClaro">
          <img class="card-img-top" src="img/manzana-cuidado-bosa.jpg" alt='Comunicación'/>
          <div class="card-body">
            <h4 class="card-title">Comunicación</h4>
          </div>
        </div>
        <div class="card text-white bg_moradoClaro">
          <img class="card-img-top" src="img/manzana-usaquen.jpg" alt='Deportes'/>
          <div class="card-body">
            <h4 class="card-title">Deportes</h4>
          </div>
        </div>
        <div class="card text-white bg_moradoClaro">
          <img class="card-img-top" src="img/manzanas-del-cuidado.jpg" alt='Cultura'/>
          <div class="card-body">
            <h4 class="card-title">Cultura</h4>
          </div>
        </div>
        <div class="card text-white bg_moradoClaro">
          <img class="card-img-top" src="img/manzana-cuidado-bosa.jpg" alt='Amistad'/>
          <div class="card-body">
            <h4 class="card-title">Amistad</h4>
          </div>
        </div>
      </div>
      </section>
      <section className="container mt-4 text-center">
        <h2>¿Quiénes viven en la Manzana?</h2>
        <p>
          En la zona de cobertura de esta Manzana viven <strong>31.608 personas</strong>.
        </p>
        <p>
          De estas, 2.217 son mujeres cuidadoras que podrán acceder a los servicios de formación y respiro. Además, <strong>1.382 niñas y niños menores de cinco años, 3.535 personas mayores y 2.401 personas con discapacidad</strong> podrán acceder a servicios para promover su bienestar y autonomía.
        </p>
        <span>(Fuente: Censo DANE 2018)</span>
      </section>
      <section className="container mt-4 text-center">
        <h1>
          Ubicaciones
        </h1>
        <img src='img/info.jpeg' alt='Ubicaciones' className='w-100'/>
      </section>
    </div>
  )
}

export default Landing;
