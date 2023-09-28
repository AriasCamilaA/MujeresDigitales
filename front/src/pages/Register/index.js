import { Link } from "react-router-dom";
import './Register.css';
import { useEffect, useState } from "react";
import apiService from "../../services";
import { showAlert } from "../../Utilities";

const Register = () => {
  // Estados para datos del modelo Usuarias
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para datos del modelo PERSONAS
  const [id_persona, setId_persona] = useState("");
  const [id_tipo_documento_fk, setId_tipo_documento_fk] = useState("1");
  const [id_usuaria, setId_usuaria] = useState("");
  const [nombres_persona, setNombres_persona] = useState("");
  const [apellidos_personas, setApellidos_personas] = useState("");
  const [telefono_persona, setTelefono_persona] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [id_servicios_preferencia_uno, setId_servicios_preferencia_uno] = useState("");
  const [id_servicios_preferencia_dos, setId_servicios_preferencia_dos] = useState("");

  // State para almacenar los tipos documento
  const [tiposDocumentos, setTiposDocumentos] = useState([]);
  // UseEffect para traer consumir el API y cargar los tipos de documentos
  useEffect(()=>{
    try {
      apiService.getTiposDocumentos()
        .then((response)=>{
          setTiposDocumentos(response);
        }).catch((e)=>{
          console.error(e);
        })
    } catch (error) {
      console.error("No se pudo acceder a los tipos de documentos"+error)
    }
  },[])

  // Función validar datos antes de enviar
  const validar = () => {
    if (email.trim() === "") {
      showAlert("warning", "Falta completar los datos", "Debe llenar el correo");
    } else if (password.trim() === "") {
      showAlert("warning", "Falta completar los datos", "Debe llenar la contraseña");
    } else if (id_persona.trim() === "") {
      showAlert("warning", "Falta completar los datos", "Debe llenar el número de identificación");
    } else if (id_tipo_documento_fk.trim() === "") {
      showAlert("warning", "Falta completar los datos", "Debe llenar el tipo de documento");
    } else if (nombres_persona.trim() === "") {
      showAlert("warning", "Falta completar los datos", "Debe llenar los nombres de la persona");
    } else if (apellidos_personas.trim() === "") {
      showAlert("warning", "Falta completar los datos", "Debe llenar los apellidos de la persona");
    } else if (telefono_persona.trim() === "") {
      showAlert("warning", "Falta completar los datos", "Debe llenar el teléfono de la persona");
    } else if (ciudad.trim() === "") {
      showAlert("warning", "Falta completar los datos", "Debe llenar la ciudad de la persona");
    } else if (direccion.trim() === "") {
      showAlert("warning", "Falta completar los datos", "Debe llenar la dirección");
    }else{
      const usuaria = {
        email:email,
        password:password,
        id_rol_fk:1,
      }
      const persona = {
        id_persona:id_persona,
        nombres_persona:nombres_persona,
        apellidos_personas:apellidos_personas,
        telefono_persona:telefono_persona,
        ciudad:ciudad,
        direccion:direccion,
        ocupacion: "Sin especificar",
        id_servicios_preferencia_uno: null,
        id_servicios_preferencia_dos: null,
        id_tipo_documento_fk:id_tipo_documento_fk,
        id_usuaria:null,
      }
      registrarUsuario(usuaria, persona);
      setEmail("");
      setId_persona("");
      setId_tipo_documento_fk("");
      setId_usuaria("");
      setNombres_persona("");
      setApellidos_personas("");
      setTelefono_persona("");
      setCiudad("");
      setDireccion("");
      setId_servicios_preferencia_uno("");
      setId_servicios_preferencia_dos("");
    }
    setPassword("");

  };

  
  // Función para registrar nuevo usuario
const registrarUsuario = (_usuaria, _persona) => {
  try {
    apiService.registrarUsuario(_usuaria)
      .then((data) => {
        // Asigna el ID de usuaria a la persona
        _persona.id_usuaria = data.id_usuaria;

        // Registra la persona después de obtener el ID de usuaria
        apiService.registrarPersona(_persona)
          .then(() => {
            showAlert("success", "Usuario creado correctamente");
          })
          .catch((e) => {
            showAlert("error", "No se pudo crear la persona");
            console.error(e);
          });
      })
      .catch((e) => {
        showAlert("error", "No se pudo crear el usuario");
        console.error(e);
      });
  } catch (error) {
    console.error("No se pudo crear Usuario "+ error)
  }
}
  // Component html
  return (
    <div className="Register">
    <div className="overlay"></div>
    <div className="card border_moradoOscuro w-75">
      <div className="card-header p-2 bg_moradoOscuro color_blanco">
        <h3 className="text-center mt-2">Registrarse</h3>
      </div>
      <div className="card-body">
        <div className="text-center">
          <div className="d-flex gap-2 inputsContainer">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-id-card pe-2"></i>
              </span>
              <select
                className="form-select"
                value={id_tipo_documento_fk}
                onChange={(e) => setId_tipo_documento_fk(e.target.value)}
              >
                <option value="" disabled>
                  Tipo de Documento
                </option>
                {/* recorremos los tipos documento que obtuvimos de la base de datos */}
                {tiposDocumentos.map((tipo) => (
                  <option key={tipo.id_tipo_documento} value={tipo.id_tipo_documento}>
                    {tipo.nombre_documento}
                  </option>
                ))}
              </select>
              {/* En cada input vamos obtniendo y modificando el estado relacionado al campo del módelo correspondiente */}
              <input type="number" className="form-control" placeholder="000000..." min="100000" maxLength={10} value={id_persona} onChange={(e)=>setId_persona(e.target.value)} required/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-phone pe-2"></i>
                Teléfono:
              </span>
              <input type="number" className="form-control" placeholder="1234567890" min="1000000000" maxLength={10} value={telefono_persona} onChange={(e)=>setTelefono_persona(e.target.value)} required/>
            </div>
          </div>
          <div className="d-flex gap-2 inputsContainer">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-user pe-2"></i>
                Nombres:
              </span>
              <input type="text" className="form-control" placeholder="Nombres" value={nombres_persona} onChange={(e)=>setNombres_persona(e.target.value)} required/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-user pe-2"></i>
                  Apellidos:
              </span>
              <input type="text" className="form-control" placeholder="Apellidos" value={apellidos_personas} onChange={(e)=>setApellidos_personas(e.target.value)} required/>
            </div>
          </div>
          <div className="d-flex gap-2 inputsContainer">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-envelope pe-2"></i>
                Correo: 
              </span>
              <input type="email" className="form-control" placeholder="micorreo@correo.com" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-lock pe-2"></i>
                Contraseña: 
              </span>
              <input type="password" className="form-control" placeholder="MiContraseña" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
          </div>
          <div className="d-flex gap-2 inputsContainer">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-compass pe-2"></i>
                Ciudad: 
              </span>
              <input type="text" className="form-control" placeholder="Ciudad" value={ciudad} onChange={(e)=>setCiudad(e.target.value)} required/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-solid fa-location-crosshairs pe-2"></i>
                Dirección: 
              </span>
              <input type="text" className="form-control" placeholder="Dirección" value={direccion} onChange={(e)=>setDireccion(e.target.value)} required/>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn_outline_moradoOscuro" onClick={()=>validar()}>Registrarse <i className="fas fa-sign-in-alt"></i></button>
          </div>
        </div>
      </div>
      <div className="card-footer text-center">
            ¿Ya tienes cuenta?, <Link to="/Login">Inicia Sesión</Link>
      </div>
    </div>
  </div>
  )
}

export default Register