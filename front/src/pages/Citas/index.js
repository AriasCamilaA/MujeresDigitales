import { useEffect, useState } from 'react';
import { showAlert, reporteExcel } from '../../Utilities';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import apiService from '../../services';

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [manzanas, setManzanas] = useState([]);
  const [servicios, setServicios] = useState([]);

  // Estados para el formulario de creación y edición de citas
  const [modalTitle, setModalTitle] = useState('');
  const [modalOption, setModalOption] = useState('');

  const [id_cita, setId_cita] = useState('');
  const [dia_cita, setDia_cita] = useState('');
  const [hora_cita, setHora_cita] = useState('');
  const [codigo_servicio, setCodigo_servicio] = useState('');
  const [id_manzana_fk, setId_manzana_fk] = useState('');
  const [id_servicio_fk, setId_servicio_fk] = useState('');

  useEffect(() => {
    listarCitas();
    apiService.getManzanas()
      .then((response) => {
        setManzanas(response);
      })
      .catch((error) => {
        console.error('Error al cargar las manzanas:', error);
    });
    apiService.getServicios()
      .then((response) => {
        setServicios(response);
      })
      .catch((error) => {
        console.error('Error al cargar los servicios:', error);
    });
  }, []);

  const listarCitas = () => {
    apiService.getCitas()
      .then((response) => {
        setCitas(response);
      })
      .catch((error) => {
        console.error('Error al cargar las citas:', error);
      });
  };


  const limpiarCampos = () => {
    setId_cita("");
    setDia_cita("");
    setHora_cita("");
    setCodigo_servicio("");
    setId_manzana_fk("");
    setId_servicio_fk("");
}

  const openModal = (opcion, _id_cita, _dia_cita, _hora_cita, _codigo_servicio, _id_manzana_fk, _id_servicio_fk) => {
    limpiarCampos()
    if (opcion === 1) {
      setModalTitle('Nueva Cita');
      setModalOption(1);
    } else if (opcion === 2) {
      setModalTitle(`Editar Cita ID: ${_id_cita}`);
      setModalOption(2);
      setId_cita(_id_cita);
      setDia_cita(_dia_cita);
      setHora_cita(_hora_cita);
      setCodigo_servicio(_codigo_servicio);
      setId_manzana_fk(_id_manzana_fk);
      setId_servicio_fk(_id_servicio_fk);
    }
  };

  const validar = (op) => {
    if (dia_cita.toString().trim() === "") {
        showAlert("warning", "Falta completar los datos", "Debe llenar el día");
    } else 
    if (hora_cita.toString().trim() === "") {
        showAlert("warning", "Falta completar los datos", "Debe llenar la hora");
    } else 
    if (codigo_servicio.toString().trim() === "") {
        showAlert("warning", "Falta completar los datos", "Debe llenar el código");
    } else 
    if (id_manzana_fk.toString().trim() === "") {
        showAlert("warning", "Falta completar los datos", "Debe llenar la manzana");
    } else 
    if (id_servicio_fk.toString().trim() === "") {
        showAlert("warning", "Falta completar los datos", "Debe llenar el servicio");
    } else {
        const manzana = {
            id_cita:id_cita,
            dia_cita:dia_cita,
            hora_cita:hora_cita,
            codigo_servicio:codigo_servicio,
            id_manzana_fk:id_manzana_fk,
            id_servicio_fk:id_servicio_fk,
        }
        if (op===1) {
            registrarCita(manzana);
        } else if (op===2) {
            modificarCita(manzana);
        }
        limpiarCampos();
    }
};


const registrarCita = (_cita) => {
  try {
      apiService.registrarCita(_cita)
          .then(() => {
              showAlert('success', 'Cita creada correctamente');
              listarCitas();
              document.getElementById('btn_cerrar').click();
          })
          .catch((e) => {
              showAlert('error', 'No se pudo crear la Cita');
              console.error(e);
          });
  } catch (error) {
      console.error('No se pudo crear la cita ' + error);
  }
}

const modificarCita = (_cita) => {
  try {
      apiService.editarCita(_cita)
          .then(() => {
              showAlert('success', 'Cita actualizada correctamente');
              listarCitas();
              document.getElementById('btn_cerrar').click();
          })
          .catch((e) => {
              showAlert('error', 'No se pudo actualizar la cita');
              console.error(e);
          });
  } catch (error) {
      console.error('No se pudo actualizar la cita ' + error);
  }
}

const eliminarCita = (_id_cita) => {
  const cita = { id_cita: _id_cita, estado: 1 };
  const MySwal = withReactContent(Swal);
  MySwal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la cita. ¿Quieres continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
  }).then((result) => {
      if (result.isConfirmed) {
          try {
              apiService.editarCita(cita)
                  .then(() => {
                      showAlert('success', 'Cita eliminada correctamente');
                      listarCitas();
                      document.getElementById('btn_cerrar').click();
                  })
                  .catch((e) => {
                      showAlert('error', 'No se pudo eliminar la cita');
                      console.error(e);
                  });
          } catch (error) {
              console.error('No se pudo eliminar la cita ' + error);
          }
      }
  });
}
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between py-3">
          <h1>Citas</h1>
          <div className="d-flex gap-3">
            <button className="btn_verde" onClick={() => reporteExcel('Citas')}>
              <i className="fa-solid fa-file-excel pe-2"></i>
              Reporte
            </button>
            <button
              className="btn_outline_moradoOscuro p-1"
              data-bs-toggle="modal"
              data-bs-target="#nuevoEditarCita"
              onClick={() => openModal(1)}
            >
              + Nueva Cita
            </button>
          </div>
        </div>
        <div className="table-responsive border_verde rounded bg_gris">
        <table className="table table-hover">
                    <thead>
                        <tr className='border_moradoOscuro'>
                            <th className="text-center" scope="col">Código</th>
                            <th className="text-center" scope="col">Día</th>
                            <th className="text-center" scope="col">Hora</th>
                            <th className="text-center" scope="col">Mazana</th>
                            <th className="text-center" scope="col">Dirección</th>
                            <th className="text-center" scope="col">Servicio</th>
                            <th className="text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {citas.map((i) => {
                        if (i.estado === 0) {
                            return (
                                <tr key={i.id_cita}>
                                    <td>{i.codigo_servicio}</td>
                                    <td>{i.dia_cita}</td>
                                    <td>{i.hora_cita}</td>
                                    <td>{i.manzana.nombre_manzana}</td>
                                    <td>{i.manzana.direccion}</td>
                                    <td>{i.servicio.nombre_servicio}</td>
                                    <td className='d-flex gap-2 justify-content-center'>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => openModal(
                                                2,
                                                i.id_cita,
                                                i.dia_cita,
                                                i.hora_cita,
                                                i.codigo_servicio,
                                                i.id_manzana_fk,
                                                i.id_servicio_fk,
                                            )}
                                            data-bs-toggle="modal"
                                            data-bs-target="#nuevoEditarCita"
                                        >
                                            <i className='fa-solid fa-edit btnEditar color_blanco'></i>
                                        </button>
                                        <button className='btn btn-danger' onClick={() => eliminarCita(i.id_cita)}>
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

        {/* Modal Nuevo y Editar */}
        <div className="modal fade" id="nuevoEditarCita" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg_moradoOscuro color_blanco">
                <h5 className="modal-title" id="modalTitleId">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={limpiarCampos}></button>
              </div>
              <div className="modal-body">
                    <div className="text-center">
                        <div className="d-flex gap-2 inputsContainer">
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                            Manzana:
                            </span>
                            <select
                            className="form-select"
                            value={id_manzana_fk}
                            onChange={(e) => setId_manzana_fk(e.target.value)}
                            >
                            <option value="" disabled>
                                Seleccione una manzana
                            </option>
                            {manzanas.map((manzana) => (
                                <option key={manzana.id_manzana} value={manzana.id_manzana}>
                                {manzana.nombre_manzana}
                                </option>
                            ))}
                            </select>
                        </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                            Servicio:
                            </span>
                            <select
                            className="form-select"
                            value={id_servicio_fk}
                            onChange={(e) => setId_servicio_fk(e.target.value)}
                            >
                            <option value="" disabled>
                                Seleccione un servicio
                            </option>
                            {servicios.map((servicio) => (
                                <option key={servicio.id_servicio} value={servicio.id_servicio}>
                                {servicio.nombre_servicio}
                                </option>
                            ))}
                            </select>
                        </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                            Día de la cita:
                            </span>
                            <input
                            type="date"
                            className="form-control"
                            value={dia_cita}
                            onChange={(e) => setDia_cita(e.target.value)}
                            required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                            Hora de la cita:
                            </span>
                            <input
                            type="time"
                            className="form-control"
                            value={hora_cita}
                            onChange={(e) => setHora_cita(e.target.value)}
                            required
                            />
                        </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                            Código de servicio:
                            </span>
                            <input
                            type="number"
                            className="form-control"
                            placeholder="Código de servicio"
                            value={codigo_servicio}
                            onChange={(e) => setCodigo_servicio(e.target.value)}
                            required
                            />
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
      </div>
    </>
  );
};

export default Citas;
