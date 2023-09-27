import { useEffect, useState } from 'react';
import { showAlert } from '../../Utilities';
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import apiService from "../../services";

const CategoriasServicios = () => {
    const [categoriasServicios, setCategoriasServicios] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [modalOption, setModalOption] = useState("");
    const [id_categoria, setId_categoria] = useState("");
    const [nombre_categoria, setNombre_categoria] = useState("");

    useEffect(() => {
        listarCategoriasServicios();
    }, []);

    const listarCategoriasServicios = () => {
        try {
            apiService.getCategoriasServicios()
                .then((response) => {
                    setCategoriasServicios(response);
                })
                .catch((e) => {
                    console.error(e);
                });
        } catch (error) {
            console.error("No se pueden cargar las Categorias de Servicios");
        }
    }

    const limpiarCampos = () => {
        setId_categoria("");
        setNombre_categoria("");
    }

    const openModal = (op, _id_categoria, _nombre_categoria) => {
        limpiarCampos();
        if (op === 1) {
            setModalTitle("Nueva Categoría de Servicio")
            setModalOption(1);
        } else if (op === 2) {
            setModalTitle("Editar Categoría de Servicio");
            setModalOption(2);
            setId_categoria(_id_categoria);
            setNombre_categoria(_nombre_categoria);
        }
    }

    const validar = (op) => {
        if (nombre_categoria.toString().trim() === "") {
            showAlert("warning", "Falta completar los datos", "Debe llenar el nombre de la categoría");
        } else {
            const categoria = {
                id_categoria: id_categoria,
                nombre_categoria: nombre_categoria,
            }
            if (op === 1) {
                registrarCategoriaServicio(categoria);
            } else if (op === 2) {
                editarCategoriaServicio(categoria);
            }
            limpiarCampos();
        }
    };

    const registrarCategoriaServicio = (_categoria) => {
        try {
            apiService.registrarCategoriaServicio(_categoria)
                .then(() => {
                    showAlert("success", "Categoría de Servicio creada correctamente");
                    listarCategoriasServicios();
                    document.getElementById("btn_cerrar").click();
                })
                .catch((e) => {
                    showAlert("error", "No se pudo crear la Categoría de Servicio");
                    console.error(e);
                });
        } catch (error) {
            console.error("No se pudo crear la Categoría de Servicio " + error);
        }
    }

    const editarCategoriaServicio = (_categoria) => {
        try {
            apiService.editarCategoriaServicio(_categoria)
                .then(() => {
                    showAlert("success", "Categoría de Servicio actualizada correctamente");
                    listarCategoriasServicios();
                    document.getElementById("btn_cerrar").click();
                })
                .catch((e) => {
                    showAlert("error", "No se pudo actualizar la Categoría de Servicio");
                    console.error(e);
                });
        } catch (error) {
            console.error("No se pudo actualizar la Categoría de Servicio " + error);
        }
    }

    const eliminarCategoriaServicio = (_id_categoria) => {
        const categoria_Servicio = { id_categoria: _id_categoria, estado: 1 };
        // Mostrar una confirmación con SweetAlert2
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará la categoría de servicio. ¿Quieres continuar?',
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
                    apiService.editarCategoriaServicio(categoria_Servicio)
                        .then(() => {
                            showAlert("success", "Categoría de Servicio eliminada correctamente");
                            listarCategoriasServicios();
                            document.getElementById("btn_cerrar").click();
                        })
                        .catch((e) => {
                            showAlert("error", "No se pudo eliminar la Categoría de Servicio");
                            console.error(e);
                        });
                } catch (error) {
                    console.error("No se pudo eliminar la Categoría de Servicio " + error);
                }
            }
        });
    }




    return (
        <>
            <div className="container ListCategoriasServicios">
                <div className="d-flex justify-content-between py-3">
                    <h1>Categorías de Servicios</h1>
                    <button
                        className="btn_outline_moradoOscuro "
                        data-bs-toggle="modal"
                        data-bs-target="#nuevoEditarCategoriaServicio"
                        onClick={() => openModal(1)}
                    >
                        + Nueva Categoría
                    </button>
                </div>
                <div className="table-responsive border_verde rounded bg_gris">
                    <table className="table table-hover">
                        <thead>
                            <tr className='border_moradoOscuro'>
                                <th className="text-center" scope="col">Nombre de la Categoría</th>
                                <th className="text-center" scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoriasServicios.map((categoria) => {
                                if(categoria.estado==0){
                                    return (
                                        <tr key={categoria.id_categoria}>
                                            <td>{categoria.nombre_categoria}</td>
                                            <td className='d-flex gap-2 justify-content-center'>
                                                <button
                                                    className='btn btn-warning'
                                                    onClick={() => openModal(2, categoria.id_categoria, categoria.nombre_categoria)}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#nuevoEditarCategoriaServicio"
                                                >
                                                    <i className='fa-solid fa-edit btnEditar color_blanco'></i>
                                                </button>
                                                <button className='btn btn-danger' onClick={() => eliminarCategoriaServicio(categoria.id_categoria)}>
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

            <div className="modal fade" id="nuevoEditarCategoriaServicio" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
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
                                            Nombre de la Categoría:
                                        </span>
                                        <input type="text" className="form-control" placeholder="Nombre de la categoría" value={nombre_categoria} onChange={(e) => setNombre_categoria(e.target.value)} required />
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

export default CategoriasServicios;
