import { useEffect, useState } from 'react';
import { showAlert } from '../../Utilities';
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import apiService from "../../services";
import { reporteExcel } from "../../Utilities";
import './index.css'

const ListUsuarios = () => {
    // state para almacenar usuarios
    const [usuarios, setUsuarios] = useState([]);
    // State para almacenar los tipos documento
    const [tiposDocumentos, setTiposDocumentos] = useState([]);
    // State para almacenar los Roles
    const [roles, setRoles] = useState([]);

    // states relacionados al Modal
    const [modalTitle, setModalTitle] = useState("");
    const [modalOption, setModalOption] = useState("");

    // Estados para datos del modelo USUARIAS
    const [id_usuaria, setId_usuaria] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id_rol_fk, setId_rol_fk] = useState("2");

    // Estados para datos del modelo PERSONAS
    const [id_persona, setId_persona] = useState("");
    const [id_tipo_documento_fk, setId_tipo_documento_fk] = useState("1");
    const [nombres_persona, setNombres_persona] = useState("");
    const [apellidos_personas, setApellidos_personas] = useState("");
    const [telefono_persona, setTelefono_persona] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [direccion, setDireccion] = useState("");
    const [ocupacion, setOcupacion] = useState("");
    const [id_servicios_preferencia_uno, setId_servicios_preferencia_uno] = useState("");
    const [id_servicios_preferencia_dos, setId_servicios_preferencia_dos] = useState("");
    
    // Al cargar la página consumimos el API 
    useEffect(()=>{
        listarUsuarios();
        // Traer tipos de documentos
        try {
            apiService.getTiposDocumentos()
                .then((response)=>{
                setTiposDocumentos(response);
                }).catch((e)=>{
                console.error(e);
                })
            } catch (error) {
            console.error("No se pudo acceder a los tipos de documentos"+error)
        };
        // Traer Roles
        try {
            apiService.getRoles()
                .then((response)=>{
                    setRoles(response);
                }).catch((e)=>{
                console.error(e);
                })
            } catch (error) {
            console.error("No se pudo acceder a los tipos de documentos"+error)
        };
    },[]);

    // Función para consumir API y traer los datos de los usuarios
    const listarUsuarios = () => {
        try {
            apiService.getPersonas()
                .then((response)=>{
                    setUsuarios(response);
                }).catch((e)=>{
                    console.error(e);
                })
            } catch (error) {
                console.error("No se pueden cargar los Usuarios");
            }
    }

    const limpiarCampos = () => {
        setId_usuaria("");
        setEmail("");
        setId_persona("");
        setId_tipo_documento_fk("1");
        setId_usuaria("");
        setNombres_persona("");
        setApellidos_personas("");
        setTelefono_persona("");
        setCiudad("");
        setDireccion("");
        setTelefono_persona("");
        setId_rol_fk("2");
        setPassword("");
    }
    
    const openModal = (
        op, 
        _id_usuaria,
        _email,
        _password,
        _id_persona,
        _id_tipo_documento_fk,
        _nombres_persona,
        _apellidos_personas,
        _telefono_persona,
        _ciudad,
        _direccion,
        _id_rol_fk
    ) => {
        limpiarCampos();
        if (op===1) {
            setModalTitle("Nuevo Usuario")
            setModalOption(1);
        } else if (op==2) {
            setModalTitle("Actualizar Usuario "+ _nombres_persona);
            setModalOption(2);
            setId_usuaria(_id_usuaria);
            setEmail(_email);
            setPassword(_password);
            setId_persona(_id_persona);
            setId_tipo_documento_fk(_id_tipo_documento_fk);
            setNombres_persona(_nombres_persona);
            setApellidos_personas(_apellidos_personas);
            setTelefono_persona(_telefono_persona);
            setCiudad(_ciudad);
            setDireccion(_direccion);
            setId_rol_fk(_id_rol_fk)
        }
    }

    // Función validar datos antes de enviar
    const validar = (op) => {
        if (email.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el correo");
        } else if (password.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar la contraseña");
        } else if (id_persona.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el número de identificación");
        } else if (id_tipo_documento_fk.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el tipo de documento");
        } else if (nombres_persona.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar los nombres de la persona");
        } else if (apellidos_personas.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar los apellidos de la persona");
        } else if (telefono_persona.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el teléfono de la persona");
        } else if (ciudad.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar la ciudad de la persona");
        } else if (direccion.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar la dirección");
        }else if (id_rol_fk.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el rol");
        }else {
            const usuaria = {
                id_usuaria: id_usuaria,
                email:email,
                password:password,
                id_rol_fk:id_rol_fk,
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
                id_usuaria:id_usuaria,
            }
            if (op===1) {
                registrarUsuario(usuaria, persona);
            } else if (op===2) {
                modificarUsuario(usuaria, persona);
            }
            limpiarCampos();
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
                    listarUsuarios();
                    document.getElementById("btn_cerrar").click();
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

    // Función para registrar nuevo usuario
    const modificarUsuario = (_usuaria, _persona) => {
    try {
        apiService.editarUsuario(_usuaria)
        .then(() => {
            apiService.editarPersona(_persona)
            .then(() => {
                showAlert("success", "Usuario actualizado correctamente");
                listarUsuarios();
                document.getElementById("btn_cerrar").click();
            })
            .catch((e) => {
                showAlert("error", "No se pudo actualizar la persona");
                document.getElementById("btn_cerrar").click();
                console.error(e);
            });
        })
        .catch((e) => {
            showAlert("error", "No se pudo Actualizar el usuario");
            console.error(e);
        });
    } catch (error) {
        console.error("No se pudo Actualizar Usuario "+ error)
    }
    }

// Función para eliminar (cambiar estado) a el Usuario
const eliminarUsuario = (_id_usuaria, _id_persona) => {
    const _usuario = { id_usuaria: _id_usuaria, estado: 1 };
    const _persona = { id_persona: _id_persona, estado: 1 };

    // Mostrar una confirmación con SweetAlert2
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el usuario. ¿Quieres continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, realizar la eliminación
            try {
                apiService.editarUsuario(_usuario)
                    .then(() => {
                        apiService.editarPersona(_persona)
                            .then(() => {
                                showAlert("success", "Usuario eliminado correctamente");
                                listarUsuarios();
                                document.getElementById("btn_cerrar").click();
                            })
                            .catch((e) => {
                                showAlert("error", "No se pudo eliminar la persona");
                                document.getElementById("btn_cerrar").click();
                                console.error(e);
                            });
                    })
                    .catch((e) => {
                        showAlert("error", "No se pudo eliminar el usuario");
                        console.error(e);
                    });
            } catch (error) {
                console.error("No se pudo eliminar Usuario " + error)
            }
        }
    });
}
    return (
    <>
        <div className="container ListUsuarios">
            <div className="d-flex justify-content-between py-3">
                <h1>Usuarios</h1>
                <div>
                    <button className='btn_verde' onClick={()=>reporteExcel("Personas")}>
                        <i className="fa-solid fa-file-excel pe-2"></i>
                        Reporte
                    </button>
                    <button 
                        className="btn_outline_moradoOscuro p-1 " 
                        data-bs-toggle="modal" 
                        data-bs-target="#nuevoEditarUsuario"
                        onClick={()=>openModal(1)}
                    >
                        + Nuevo
                    </button>
                </div>
            </div>
            <div className="table-responsive border_verde rounded bg_gris">
                <table className="table table-hover">
                    <thead>
                        <tr className='border_moradoOscuro'>
                            <th className="text-center" scope="col">Tipo Doc</th>
                            <th className="text-center" scope="col">Número</th>
                            <th className="text-center" scope="col">Nombres</th>
                            <th className="text-center" scope="col">Correo</th>
                            <th className="text-center" scope="col">Teléfono</th>
                            <th className="text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((i) => {
                        if (i.estado === 0) {
                            return (
                                <tr key={i.id_persona}>
                                    <td>{i.tipo_documento.nombre_documento ? i.tipo_documento.nombre_documento : ""}</td>
                                    <td>{i.id_persona}</td>
                                    <td>{i.nombres_persona} {i.apellidos_personas}</td>
                                    <td>{i.usuaria.email ? i.usuaria.email : ""}</td>
                                    <td>{i.telefono_persona}</td>
                                    <td className='d-flex gap-2 justify-content-center'>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => openModal(
                                                2,
                                                i.usuaria.id_usuaria,
                                                i.usuaria.email,
                                                i.usuaria.password,
                                                i.id_persona,
                                                i.id_tipo_documento_fk,
                                                i.nombres_persona,
                                                i.apellidos_personas,
                                                i.telefono_persona,
                                                i.ciudad,
                                                i.direccion,
                                                i.usuaria.id_rol_fk
                                            )}
                                            data-bs-toggle="modal"
                                            data-bs-target="#nuevoEditarUsuario"
                                        >
                                            <i className='fa-solid fa-edit btnEditar color_blanco'></i>
                                        </button>
                                        <button className='btn btn-danger' onClick={() => eliminarUsuario(i.usuaria.id_usuaria, i.id_persona)}>
                                            <i className='fa-solid fa-trash color_blanco'></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        } else {
                            return null;
                        }
                    })}



                    </tbody>
                </table>
            </div>
            
        </div>

        {/* Modal Nuevo y Editar */}
        <div className="modal fade" id="nuevoEditarUsuario" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header bg_moradoOscuro color_blanco">
                        <h5 className="modal-title" id="modalTitleId">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>limpiarCampos()}></button>
                    </div>
                    <div className="modal-body">
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
                            <input type="number" disabled={modalOption === 2} className="form-control" placeholder="000000..." min="100000" maxLength={10} value={id_persona} onChange={(e)=>setId_persona(e.target.value)} required/>
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
                            <input disabled={modalOption === 2}  type="password" className="form-control" placeholder="MiContraseña" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
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
                        <div className="d-flex gap-2 inputsContainer">
                            <div className="input-group mb-3">
                            <span className="input-group-text">
                            <i className="fa-solid fa-genderless pe-2"></i>
                            </span>
                            <select
                                className="form-select"
                                value={id_rol_fk}
                                onChange={(e) => setId_rol_fk(e.target.value)}
                            >
                                <option value="" disabled>
                                    Rol
                                </option>
                                {/* recorremos los datos que obtuvimos de la base de datos */}
                                {roles.map((i) => (
                                <option key={i.id_rol} value={i.id_rol}>
                                    {i.nombre_rol}
                                </option>
                                ))}
                            </select>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn_naranja" data-bs-dismiss="modal" id='btn_cerrar'>Cancelar</button>
                        <button type="button" className="btn btn_verde" onClick={() => validar(modalOption)}>Guardar</button></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ListUsuarios
