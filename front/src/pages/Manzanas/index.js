import { useEffect, useState } from 'react';
import { showAlert } from '../../Utilities';
import { reporteExcel } from "../../Utilities";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import apiService from "../../services";

const Manzanas = () => {
    const [municipios, setMunicipios] = useState([]);
    const [manzanas, setManzanas] = useState([]);

    // states relacionados al Modal
    const [modalTitle, setModalTitle] = useState("");
    const [modalOption, setModalOption] = useState("");

    const [id_manzana, setId_manzana] = useState("");
    const [codigo_manzana, setCodigo_manzana] = useState("");
    const [nombre_manzana, setNombre_manzana] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [direccion, setDireccion] = useState("");
    const [id_municipio_fk, setId_municipio_fk] = useState("");
    
    // Al cargar la página consumimos el API 
    useEffect(()=>{
        listarManzanas();
        try {
            apiService.getMunicipios()
                .then((response)=>{
                    setMunicipios(response);
                }).catch((e)=>{
                console.error(e);
                })
            } catch (error) {
            console.error("No se pudo acceder a los municipios"+error)
        };
    },[]);

    const listarManzanas = () => {
        try {
            apiService.getManzanas().then((response) => {
                setManzanas(response);
            }).catch((e) => {
                console.error(e);
            });
        } catch (error) {
            console.error('No se pueden cargar las manzanas');
        }
    }

    const limpiarCampos = () => {
        setId_manzana("");
        setCodigo_manzana("");
        setNombre_manzana("");
        setLocalidad("");
        setDireccion("");
        setId_municipio_fk("");
    }
    
    const openModal = (
        op, 
        _id_manzana,
        _codigo_manzana,
        _nombre_manzana,
        _localidad,
        _direccion,
        _id_municipio_fk
    ) => {
        limpiarCampos();
        if (op===1) {
            setModalTitle("Nueva Manzana")
            setModalOption(1);
        } else if (op==2) {
            setModalTitle("Actualizar Manzana "+ _nombre_manzana);
            setModalOption(2);
            setId_manzana(_id_manzana);
            setCodigo_manzana(_codigo_manzana);
            setNombre_manzana(_nombre_manzana);
            setLocalidad(_localidad);
            setDireccion(_direccion);
            setId_municipio_fk(_id_municipio_fk);
        }
    }

    // Función validar datos antes de enviar
    const validar = (op) => {
        if (codigo_manzana.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el código");
        } else 
        if (nombre_manzana.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el Nombre");
        } else 
        if (localidad.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar la localidad");
        } else 
        if (direccion.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el la dirección");
        } else 
        if (id_municipio_fk.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el municipio");
        } else {
            const manzana = {
                id_manzana:id_manzana,
                codigo_manzana:codigo_manzana,
                nombre_manzana:nombre_manzana,
                localidad:localidad,
                direccion:direccion,
                id_municipio_fk:id_municipio_fk,
            }
            if (op===1) {
                registrarManzana(manzana);
            } else if (op===2) {
                modificarManzana(manzana);
            }
            limpiarCampos();
        }
    };

    const registrarManzana = (_manzana) => {
        try {
            apiService.registrarManzana(_manzana)
                .then(() => {
                    showAlert('success', 'Manzana creada correctamente');
                    listarManzanas();
                    document.getElementById('btn_cerrar').click();
                })
                .catch((e) => {
                    showAlert('error', 'No se pudo crear la manzana');
                    console.error(e);
                });
        } catch (error) {
            console.error('No se pudo crear la manzana ' + error);
        }
    }

    const modificarManzana = (_manzana) => {
        try {
            apiService.editarManzana(_manzana)
                .then(() => {
                    showAlert('success', 'Manzana actualizada correctamente');
                    listarManzanas();
                    document.getElementById('btn_cerrar').click();
                })
                .catch((e) => {
                    showAlert('error', 'No se pudo actualizar la manzana');
                    console.error(e);
                });
        } catch (error) {
            console.error('No se pudo actualizar la manzana ' + error);
        }
    }

    const eliminarManzana = (_id_manzana) => {
        const manzana = { id_manzana: _id_manzana, estado: 1 };
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
                    apiService.editarManzana(manzana)
                        .then(() => {
                            showAlert('success', 'Manzana eliminada correctamente');
                            listarManzanas();
                            document.getElementById('btn_cerrar').click();
                        })
                        .catch((e) => {
                            showAlert('error', 'No se pudo eliminar la manzana');
                            console.error(e);
                        });
                } catch (error) {
                    console.error('No se pudo eliminar la Manzana ' + error);
                }
            }
        });
    }
    return (
    <>
        <div className="container ListUsuarios">
            <div className="d-flex justify-content-between py-3">
                <h1>Manzanas</h1>
                <div className='d-flex gap-3'>
                    <button className='btn_verde' onClick={()=>reporteExcel("Manzanas")}>
                        <i className="fa-solid fa-file-excel pe-2"></i>
                        Reporte
                    </button>
                    <button 
                        className="btn_outline_moradoOscuro p-1" 
                        data-bs-toggle="modal" 
                        data-bs-target="#nuevoEditarManzana"
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
                            <th className="text-center" scope="col">Código</th>
                            <th className="text-center" scope="col">Nombre</th>
                            <th className="text-center" scope="col">Municipio</th>
                            <th className="text-center" scope="col">Localidad</th>
                            <th className="text-center" scope="col">Dirección</th>
                            <th className="text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {manzanas.map((i) => {
                        if (i.estado === 0) {
                            return (
                                <tr key={i.id_manzana}>
                                    <td>{i.codigo_manzana}</td>
                                    <td>{i.nombre_manzana}</td>
                                    <td>{i.municipio.nombre_municipio}</td>
                                    <td>{i.localidad}</td>
                                    <td>{i.direccion}</td>
                                    <td className='d-flex gap-2 justify-content-center'>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => openModal(
                                                2,
                                                i.id_manzana,
                                                i.codigo_manzana,
                                                i.nombre_manzana,
                                                i.localidad,
                                                i.direccion,
                                                i.id_municipio_fk,
                                            )}
                                            data-bs-toggle="modal"
                                            data-bs-target="#nuevoEditarManzana"
                                        >
                                            <i className='fa-solid fa-edit btnEditar color_blanco'></i>
                                        </button>
                                        <button className='btn btn-danger' onClick={() => eliminarManzana(i.id_manzana)}>
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
        <div className="modal fade" id="nuevoEditarManzana" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
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
                                <input type="text" className="form-control" placeholder="Código" value={codigo_manzana} onChange={(e)=>setCodigo_manzana(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-user pe-2"></i>
                                    Nombre:
                                </span>
                                <input type="textarea" className="form-control" placeholder="Nombres" value={nombre_manzana} onChange={(e)=>setNombre_manzana(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-user pe-2"></i>
                                    Localidad:
                                </span>
                                <input type="text" className="form-control" placeholder="Localidad" value={localidad} onChange={(e)=>setLocalidad(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-user pe-2"></i>
                                    Dirección:
                                </span>
                                <input type="textarea" className="form-control" placeholder="Dirección" value={direccion} onChange={(e)=>setDireccion(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                            <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="fa-solid fa-id-card pe-2"></i>
                            </span>
                            <select
                                className="form-select"
                                value={id_municipio_fk}
                                onChange={(e) => setId_municipio_fk(e.target.value)}
                            >
                                <option value="" disabled>
                                    Municipio
                                </option>
                                {municipios.map((i) =>{
                                    if(i.estado==0){
                                        return(
                                            <option key={i.id_municipio} value={i.id_municipio}>
                                                {i.nombre_municipio}
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

export default Manzanas
