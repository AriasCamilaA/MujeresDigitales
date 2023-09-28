import './Mapa.css';

const Mapa = () => {

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
        <h1 className='my-3'>Manzanas del cuidado en Bogotá</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31816.336992129403!2d-74.11000890162656!3d4.586462195609456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smanzanas%20del%20cuidado!5e0!3m2!1ses-419!2sco!4v1695873362327!5m2!1ses-419!2sco" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
};

export default Mapa;
