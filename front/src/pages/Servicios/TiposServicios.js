import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import apiService from '../../services';
import { showAlert } from '../../Utilities';

const TiposServicios = () => {
    const [tiposServicios, setTiposServicios] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
    const [modalOption, setModalOption] = useState('');
    const [id_tipo_servicio, setIdTipoServicio] = useState('');
    const [nombre_tipo_servicio, setNombreTipoServicio] = useState('');

    useEffect(() => {
        listarTiposServicios();
    }, []);

    const listarTiposServicios = () => {
        try {
            apiService.getTiposServicios().then((response) => {
                setTiposServicios(response);
            }).catch((e) => {
                console.error(e);
            });
        } catch (error) {
            console.error('No se pueden cargar los tipos de servicios');
        }
    }

    const limpiarCampos = () => {
        setIdTipoServicio('');
        setNombreTipoServicio('');
    }

    const openModal = (op, _id_tipo_servicio, _nombre_tipo_servicio) => {
        limpiarCampos();
        if (op === 1) {
            setModalTitle('Nueva Categoría de Servicio');
            setModalOption(1);
        } else if (op === 2) {
            setModalTitle('Editar Categoría de Servicio');
            setModalOption(2);
            setIdTipoServicio(_id_tipo_servicio);
            setNombreTipoServicio(_nombre_tipo_servicio);
        }
    }

    const validar = (op) => {
        if (nombre_tipo_servicio.trim() === '') {
            showAlert('warning', 'Falta completar los datos', 'Debe llenar el nombre del tipo de servicio');
        } else {
            const tipoServicio = {
                id_tipo_servicio: id_tipo_servicio,
                nombre_tipo_servicio: nombre_tipo_servicio,
            };
            if (op === 1) {
                registrarTipoServicio(tipoServicio);
                limpiarCampos();
            } else if (op === 2) {
                modificarTipoServicio(tipoServicio);
            }
        }
    };

    const registrarTipoServicio = (_tipoServicio) => {
        try {
            apiService.registrarTipoServicio(_tipoServicio)
                .then(() => {
                    showAlert('success', 'Categoría de servicio creada correctamente');
                    listarTiposServicios();
                    document.getElementById('btn_cerrar').click();
                })
                .catch((e) => {
                    showAlert('error', 'No se pudo crear la categoría de servicio');
                    console.error(e);
                });
        } catch (error) {
            console.error('No se pudo crear la categoría de servicio ' + error);
        }
    }

    const modificarTipoServicio = (_tipoServicio) => {
        try {
            apiService.editarTipoServicio(_tipoServicio)
                .then(() => {
                    showAlert('success', 'Categoría de servicio actualizada correctamente');
                    listarTiposServicios();
                    document.getElementById('btn_cerrar').click();
                })
                .catch((e) => {
                    showAlert('error', 'No se pudo actualizar la categoría de servicio');
                    console.error(e);
                });
        } catch (error) {
            console.error('No se pudo actualizar la categoría de servicio ' + error);
        }
    }

    const eliminarTipoServicio = (id_tipo_servicio) => {
        const tipo_servicio = { id_tipo_servicio: id_tipo_servicio, estado: 1 };
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
                    apiService.editarTipoServicio(tipo_servicio)
                        .then(() => {
                            showAlert('success', 'Categoría de servicio eliminada correctamente');
                            listarTiposServicios();
                            document.getElementById('btn_cerrar').click();
                        })
                        .catch((e) => {
                            showAlert('error', 'No se pudo eliminar la categoría de servicio');
                            console.error(e);
                        });
                } catch (error) {
                    console.error('No se pudo eliminar la categoría de servicio ' + error);
                }
            }
        });
    }

    return (
        <>
            <div className="container ListTiposServicios">
                <div className="d-flex justify-content-between py-3">
                    <h1>Tipos de Servicios</h1>
                    <button
                        className="btn_outline_moradoOscuro "
                        data-bs-toggle="modal"
                        data-bs-target="#nuevoEditarTipoServicio"
                        onClick={() => openModal(1)}
                    >
                        + Nueva Categoría
                    </button>
                </div>
                <div className="table-responsive border rounded bg-light">
                    <table className="table table-hover">
                        <thead>
                            <tr className="bg-primary text-white">
                                <th className='text-center' scope="col">Nombre</th>
                                <th className='text-center' scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tiposServicios.map((tipoServicio) => {
                                if(tipoServicio.estado==0){
                                    return (
                                        <tr key={tipoServicio.id_tipo_servicio}>
                                            <td>{tipoServicio.nombre_tipo_servicio}</td>
                                            <td className='d-flex gap-3 justify-content-center'>
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={() => openModal(2, tipoServicio.id_tipo_servicio, tipoServicio.nombre_tipo_servicio)}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#nuevoEditarTipoServicio"
                                                >
                                                    <i className='fa-solid fa-edit btnEditar color_blanco'></i>
                                                </button>
                                                <button className="btn btn-danger" onClick={() => eliminarTipoServicio(tipoServicio.id_tipo_servicio)}>
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

            {/* Modal Editar y Nuevo */}
            <div className="modal fade" id="nuevoEditarTipoServicio" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
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
                                            <i className="fa-solid fa-list pe-2"></i>
                                            Nombre del tipo:
                                        </span>
                                        <input type="text" className="form-control" placeholder="Tipo de Servicio" value={nombre_tipo_servicio} onChange={(e) => setNombreTipoServicio(e.target.value)} required />
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
    );
}

export default TiposServicios;
