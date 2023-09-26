import { Link } from "react-router-dom";
import './Login.css';

const Login = () => {
    return (
      <div className="containerLogin d-flex justify-content-center align-items-center h-100">
      <div className="overlay"></div>
              <div className="card border_moradoOscuro w-50">
                <div className="card-header p-2 bg_moradoOscuro color_blanco">
                  <h3 className="text-center">Iniciar Sesión</h3>
                </div>
                <div className="card-body">
                  <form className="text-center">
                  <div class="input-group mb-3">
                    <span class="input-group-text">
                      <i className="fa-solid fa-user pe-2"></i>
                      Nombre:
                    </span>
                    <input type="text" class="form-control" placeholder="Ingrese Nombre"/>
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">
                      <i className="fa-solid fa-lock pe-2"></i>
                      Contraseña: 
                    </span>
                    <input type="password" class="form-control" placeholder="Ingrese contraseña"/>
                  </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn_outline_moradoOscuro">Iniciar Sesión <i className="fas fa-sign-in-alt"></i></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
      );
}

export default Login
