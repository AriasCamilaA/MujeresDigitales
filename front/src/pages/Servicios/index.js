import { useEffect, useState } from 'react';
import { showAlert } from '../../Utilities';
import { Link } from 'react-router-dom';
import { reporteExcel } from "../../Utilities";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import apiService from "../../services";


const Servicios = () => {
    const [servicios, setServicios] = useState([]);

    const [categoriasServicios, setCategoriasServicios] = useState([]);
    const [tiposServicios, setTiposServicios] = useState([]);

    // states relacionados al Modal
    const [modalTitle, setModalTitle] = useState("");
    const [modalOption, setModalOption] = useState("");

    const [id_servicio, setId_servicio] = useState("");
    const [codigo_servicio, setCodigo_servicio] = useState("");
    const [nombre_servicio, setNombre_servicio] = useState("");
    const [descripcion_servicio, setDescripcion_servicio] = useState("");
    const [id_categoria_fk, setId_categoria_fk] = useState("");
    const [id_tipo_servicio_fk, setId_tipo_servicio_fk] = useState("");
    
    // Al cargar la página consumimos el API 
    useEffect(()=>{
        listarServicios();
        try {
            apiService.getCategoriasServicios()
                .then((response)=>{
                    setCategoriasServicios(response);
                }).catch((e)=>{
                console.error(e);
                })
            } catch (error) {
            console.error("No se pudo acceder a Las Categorias de servicios"+error)
        };
        
        try {
            apiService.getTiposServicios()
                .then((response)=>{
                    setTiposServicios(response);
                }).catch((e)=>{
                console.error(e);
                })
            } catch (error) {
            console.error("No se pudo acceder a los Los servicios"+error)
        };
    },[]);

    const listarServicios = () => {
        try {
            apiService.getServicios().then((response) => {
                setServicios(response);
            }).catch((e) => {
                console.error(e);
            });
        } catch (error) {
            console.error('No se pueden cargar los servicios');
        }
    }

    const limpiarCampos = () => {
        setId_servicio("");
        setCodigo_servicio("");
        setNombre_servicio("");
        setDescripcion_servicio("");
        setId_categoria_fk("");
        setId_tipo_servicio_fk("");
    }
    
    const openModal = (
        op, 
        _id_servicio,
        _codigo_servicio,
        _nombre_servicio,
        _descripcion_servicio,
        _id_categoria_fk,
        _id_tipo_servicio_fk
    ) => {
        limpiarCampos();
        if (op===1) {
            setModalTitle("Nuevo Servicio")
            setModalOption(1);
        } else if (op==2) {
            setModalTitle("Actualizar Servicio "+ _nombre_servicio);
            setModalOption(2);
            setId_servicio(_id_servicio);
            setCodigo_servicio(_codigo_servicio);
            setNombre_servicio(_nombre_servicio);
            setDescripcion_servicio(_descripcion_servicio);
            setId_categoria_fk(_id_categoria_fk);
            setId_tipo_servicio_fk(_id_tipo_servicio_fk);
        }
    }

    // Función validar datos antes de enviar
    const validar = (op) => {
        if (codigo_servicio.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el código");
        } else 
        if (nombre_servicio.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el Nombre");
        } else 
        if (descripcion_servicio.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar la descripción");
        } else 
        if (id_categoria_fk.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el la categoría");
        } else 
        if (id_tipo_servicio_fk.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el tipo de servicio");
        } else {
            const servicio = {
                id_servicio:id_servicio,
                codigo_servicio:codigo_servicio,
                nombre_servicio:nombre_servicio,
                descripcion_servicio:descripcion_servicio,
                id_categoria_fk:id_categoria_fk,
                id_tipo_servicio_fk:id_tipo_servicio_fk,
            }
            if (op===1) {
                registrarServicio(servicio);
            } else if (op===2) {
                modificarServicio(servicio);
            }
            limpiarCampos();
        }
    };

    const registrarServicio = (_servicio) => {
        try {
            apiService.registrarServicio(_servicio)
                .then(() => {
                    showAlert('success', 'Servicio creado correctamente');
                    listarServicios();
                    document.getElementById('btn_cerrar').click();
                })
                .catch((e) => {
                    showAlert('error', 'No se pudo crear el servicio');
                    console.error(e);
                });
        } catch (error) {
            console.error('No se pudo crear el servicio ' + error);
        }
    }

    const modificarServicio = (_servicio) => {
        try {
            apiService.editarServicio(_servicio)
                .then(() => {
                    showAlert('success', 'Servicio actualizada correctamente');
                    listarServicios();
                    document.getElementById('btn_cerrar').click();
                })
                .catch((e) => {
                    showAlert('error', 'No se pudo actualizar la el servicio');
                    console.error(e);
                });
        } catch (error) {
            console.error('No se pudo actualizar el servicio ' + error);
        }
    }

    const eliminarServicio = (_id_servicio) => {
        const servicio = { id_servicio: _id_servicio, estado: 1 };
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el tipo de servicio. ¿Quieres continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    apiService.editarServicio(servicio)
                        .then(() => {
                            showAlert('success', 'Servicio eliminada correctamente');
                            listarServicios();
                            document.getElementById('btn_cerrar').click();
                        })
                        .catch((e) => {
                            showAlert('error', 'No se pudo eliminar el servicio');
                            console.error(e);
                        });
                } catch (error) {
                    console.error('No se pudo eliminar el servicio ' + error);
                }
            }
        });
    }
    return (
    <>
        <div className="container ListUsuarios">
            <div className="d-flex justify-content-between py-3">
                <h1>Servicios</h1>
                <div className='d-flex gap-2'>
                    <button className='btn_verde' onClick={()=>reporteExcel("Servicios")}>
                        <i className="fa-solid fa-file-excel pe-2"></i>
                        Reporte
                    </button>
                    <Link className='btn_outline_moradoOscuro p-2' to="/CategoriasServicios">Categorias</Link>
                    <Link className='btn_outline_moradoOscuro p-2' to="/TiposServicios">Tipos</Link>
                    <button 
                        className="btn_outline_moradoOscuro p-1" 
                        data-bs-toggle="modal" 
                        data-bs-target="#nuevoEditarServicio"
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
                            <th className="text-center" scope="col">Categoría</th>
                            <th className="text-center" scope="col">Tipo</th>
                            <th className="text-center" scope="col">Nombre</th>
                            <th className="text-center" scope="col">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                    {servicios.map((i) => {
                        if (i.estado === 0) {
                            return (
                                <tr key={i.categoria.nombre_categoria}>
                                    <td>{i.tipo_servicio.nombre_tipo_servicio}</td>
                                    <td>{i.nombre_servicio}</td>
                                    <td>{i.descripcion_servicio}</td>
                                    <td className='d-flex gap-2 justify-content-center'>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => openModal(
                                                2,
                                                i.id_servicio,
                                                i.codigo_servicio,
                                                i.nombre_servicio,
                                                i.descripcion_servicio,
                                                i.id_categoria_fk,
                                                i.id_tipo_servicio_fk,
                                            )}
                                            data-bs-toggle="modal"
                                            data-bs-target="#nuevoEditarServicio"
                                        >
                                            <i className='fa-solid fa-edit btnEditar color_blanco'></i>
                                        </button>
                                        <button className='btn btn-danger' onClick={() => eliminarServicio(i.id_servicio)}>
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
        <div className="modal fade" id="nuevoEditarServicio" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
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
                                    <i className="fa-solid fa-user pe-2"></i>
                                    Código:
                                </span>
                                <input type="text" className="form-control" placeholder="Códgo" value={codigo_servicio} onChange={(e)=>setCodigo_servicio(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-user pe-2"></i>
                                    Nombre:
                                </span>
                                <input type="text" className="form-control" placeholder="Nombres" value={nombre_servicio} onChange={(e)=>setNombre_servicio(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-user pe-2"></i>
                                    Descripción:
                                </span>
                                <input type="textarea" className="form-control" placeholder="Descripción" value={descripcion_servicio} onChange={(e)=>setDescripcion_servicio(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                            <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="fa-solid fa-id-card pe-2"></i>
                            </span>
                            <select
                                className="form-select"
                                value={id_categoria_fk}
                                onChange={(e) => setId_categoria_fk(e.target.value)}
                            >
                                <option value="" disabled>
                                    Categoria
                                </option>
                                {categoriasServicios.map((i) =>{
                                    if(i.estado==0){
                                        return(
                                            <option key={i.id_categoria} value={i.id_categoria}>
                                                {i.nombre_categoria}
                                            </option>
                                        );
                                    }
                                })}
                            </select>
                            </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                            <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="fa-solid fa-id-card pe-2"></i>
                            </span>
                            <select
                                className="form-select"
                                value={id_tipo_servicio_fk}
                                onChange={(e) => setId_tipo_servicio_fk(e.target.value)}
                            >
                                <option value="" disabled>
                                    Tipo Servicio
                                </option>
                                {tiposServicios.map((i) =>{
                                    if(i.estado==0){
                                        return(
                                            <option key={i.id_tipo_servicio} value={i.id_tipo_servicio}>
                                                {i.nombre_tipo_servicio}
                                            </option>
                                        );
                                    }
                                })}
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

export default Servicios
