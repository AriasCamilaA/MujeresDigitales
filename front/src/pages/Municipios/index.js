import React, { useEffect, useState } from 'react';
import { showAlert } from '../../Utilities';
import { reporteExcel } from "../../Utilities";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import apiService from "../../services";
// import './index.css'

const ListMunicipios = () => {
    const [municipios, setMunicipios] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [modalOption, setModalOption] = useState("");

    const [id_municipio, setId_municipio] = useState("");
    const [codigo_municipio, setCodigo_municipio] = useState("");
    const [nombre_municipio, setNombre_municipio] = useState("");

    useEffect(() => {
        listarMunicipios();
    }, []);

    const listarMunicipios = () => {
        try {
            apiService.getMunicipios()
                .then((response) => {
                    setMunicipios(response);
                })
                .catch((e) => {
                    console.error(e);
                })
        } catch (error) {
            console.error("No se pueden cargar los municipios");
        }
    }

    const limpiarCampos = () => {
        setId_municipio("");
        setCodigo_municipio("");
        setNombre_municipio("");
    }

    const openModal = (op, _id_municipio,_codigo_municipio, _nombre_municipio) => {
        limpiarCampos();
        if (op === 1) {
            setModalTitle("Nuevo Municipio")
            setModalOption(1);
        } else if (op === 2) {
            setModalTitle("Actualizar Municipio " + _nombre_municipio);
            setModalOption(2);
            setId_municipio(_id_municipio);
            setCodigo_municipio(_codigo_municipio);
            setNombre_municipio(_nombre_municipio);
        }
    }

    const validar = (op) => {
        if (nombre_municipio.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el nombre del municipio");
        } else {
            const municipio = {
                id_municipio: id_municipio,
                codigo_municipio: codigo_municipio,
                nombre_municipio: nombre_municipio,
            }
            if (op === 1) {
                registrarMunicipio(municipio);
            } else if (op === 2) {
                modificarMunicipio(municipio);
            }
            limpiarCampos();
        }
    };

    const registrarMunicipio = (_municipio) => {
        try {
            apiService.registrarMunicipio(_municipio)
                .then(() => {
                    showAlert("success", "Municipio creado correctamente");
                    listarMunicipios();
                    document.getElementById("btn_cerrar").click();
                })
                .catch((e) => {
                    showAlert("error", "No se pudo crear el municipio");
                    console.error(e);
                });
        } catch (error) {
            console.error("No se pudo crear el municipio " + error)
        }
    }

    const modificarMunicipio = (_municipio) => {
        try {
            apiService.editarMunicipio(_municipio)
                .then(() => {
                    showAlert("success", "Municipio actualizado correctamente");
                    listarMunicipios();
                    document.getElementById("btn_cerrar").click();
                })
                .catch((e) => {
                    showAlert("error", "No se pudo actualizar el municipio");
                    console.error(e);
                });
        } catch (error) {
            console.error("No se pudo actualizar el municipio " + error)
        }
    }

    const eliminarMunicipio = (_id_municipio) => {
        const municipio = { id_municipio: _id_municipio, estado: 1 };

        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el municipio. ¿Quieres continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    apiService.editarMunicipio(municipio)
                        .then(() => {
                            showAlert("success", "Municipio eliminado correctamente");
                            listarMunicipios();
                            document.getElementById("btn_cerrar").click();
                        })
                        .catch((e) => {
                            showAlert("error", "No se pudo eliminar el municipio");
                            document.getElementById("btn_cerrar").click();
                            console.error(e);
                        });
                } catch (error) {
                    console.error("No se pudo eliminar el municipio " + error)
                }
            }
        });
    }

    return (
        <>
            <div className="container ListMunicipios">
                <div className="d-flex justify-content-between py-3">
                    <h1>Municipios</h1>
                    <div className='d-flex gap-2'>
                        <button className='btn_verde' onClick={()=>reporteExcel("Municipios")}>
                            <i className="fa-solid fa-file-excel pe-2"></i>
                            Reporte
                        </button>
                        <button
                            className="btn_outline_moradoOscuro "
                            data-bs-toggle="modal"
                            data-bs-target="#nuevoEditarMunicipio"
                            onClick={() => openModal(1)}
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
                                <th className="text-center" scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {municipios.map((municipio) => {
                                if(municipio.estado==0){
                                    return (
                                        <tr key={municipio.id_municipio}>
                                            <td>{municipio.codigo_municipio}</td>
                                            <td>{municipio.nombre_municipio}</td>
                                            <td className='d-flex gap-2 justify-content-center'>
                                                <button
                                                    className='btn btn-warning'
                                                    onClick={() => openModal(
                                                        2,
                                                        municipio.id_municipio,
                                                        municipio.codigo_municipio,
                                                        municipio.nombre_municipio
                                                    )}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#nuevoEditarMunicipio"
                                                >
                                                    <i className='fa-solid fa-edit btnEditar color_blanco'></i>
                                                </button>
                                                <button className='btn btn-danger' onClick={() => eliminarMunicipio(municipio.id_municipio)}>
                                                    <i className='fa-solid fa-trash color_blanco'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Nuevo y Editar */}
            <div className="modal fade" id="nuevoEditarMunicipio" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg_moradoOscuro color_blanco">
                            <h5 className="modal-title" id="modalTitleId">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => limpiarCampos()}></button>
                        </div>
                        <div className="modal-body">
                            <div className="text-center">
                                <div className="d-flex gap-2 inputsContainer">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-map-marker pe-2"></i>
                                            Código:
                                        </span>
                                        <input type="text" className="form-control" placeholder="Código del municipio" value={codigo_municipio} onChange={(e) => setCodigo_municipio(e.target.value)} required />
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            <i className="fa-solid fa-map-marker pe-2"></i>
                                            Nombre:
                                        </span>
                                        <input type="text" className="form-control" placeholder="Nombre del municipio" value={nombre_municipio} onChange={(e) => setNombre_municipio(e.target.value)} required />
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

export default ListMunicipios;

