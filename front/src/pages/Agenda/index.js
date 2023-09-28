import { useEffect, useState } from 'react';
import { showAlert, reporteExcel } from '../../Utilities';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import apiService from '../../services';

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [agenda, setAgenda] = useState([]);

  // Estados para el formulario de creación y edición de citas
  const [modalTitle, setModalTitle] = useState('');
  const [modalOption, setModalOption] = useState('');

  const [id_agenda, setId_agenda] = useState('');
  const [id_cita_fk, setId_cita_fk] = useState('');
  const [id_persona_fk, setId_persona_fk] = useState('');

  useEffect(() => {
    listarAgenda();
    apiService.getCitas()
      .then((response) => {
        setCitas(response);
      })
      .catch((error) => {
        console.error('Error al cargar las citas:', error);
    });
    apiService.getPersonas()
      .then((response) => {
        setPersonas(response);
      })
      .catch((error) => {
        console.error('Error al cargar las personas:', error);
    });
  }, []);

  const listarAgenda = () => {
    apiService.getAgenda()
      .then((response) => {
        setAgenda(response);
      })
      .catch((error) => {
        console.error('Error al cargar la Agenda:', error);
      });
  };


  const limpiarCampos = () => {
    setId_agenda("");
    setId_cita_fk("");
    setId_persona_fk("");
}

  const openModal = (opcion, _id_agenda, _id_cita_fk, _id_persona_fk) => {
    limpiarCampos()
    if (opcion === 1) {
      setModalTitle('Nuevo Agendamiento');
      setModalOption(1);
    } else if (opcion === 2) {
      setModalTitle(`Editar Agendamiento`);
      setModalOption(2);
      setId_agenda(_id_agenda);
      setId_cita_fk(_id_cita_fk);
      setId_persona_fk(_id_persona_fk);
    }
  };

  const validar = (op) => {
    if (id_cita_fk.toString().trim() === "") {
        showAlert("warning", "Falta completar los datos", "Debe seleccionar una cita");
    } else 
    if (id_persona_fk.toString().trim() === "") {
        showAlert("warning", "Falta completar los datos", "Debe seleccionar la persona");
    } else {
        const cita = {
            id_agenda:id_agenda,
            id_persona_fk:id_persona_fk,
            id_cita_fk:id_cita_fk,
        }
        if (op===1) {
            registrarAgenda(cita);
        } else if (op===2) {
            modificarAgenda(cita);
        }
        limpiarCampos();
    }
};


const registrarAgenda = (_cita) => {
  try {
      apiService.registrarAgenda(_cita)
          .then(() => {
              showAlert('success', 'Agendamiento asignado');
              listarAgenda();
              document.getElementById('btn_cerrar').click();
          })
          .catch((e) => {
              showAlert('error', 'No se pudo agendar');
              console.error(e);
          });
  } catch (error) {
      console.error('No se pudo Agendar ' + error);
  }
}

const modificarAgenda = (_cita) => {
  try {
      apiService.editarAgenda(_cita)
          .then(() => {
              showAlert('success', 'Agenda actualizada correctamente');
              listarAgenda();
              document.getElementById('btn_cerrar').click();
          })
          .catch((e) => {
              showAlert('error', 'No se pudo actualizar la agenda');
              console.error(e);
          });
  } catch (error) {
      console.error('No se pudo actualizar la agenda ' + error);
  }
}

const eliminarAgenda = (_id_agenda) => {
  const cita = { id_agenda: _id_agenda, estado: 1 };
  const MySwal = withReactContent(Swal);
  MySwal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el agendamiento. ¿Quieres continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
  }).then((result) => {
      if (result.isConfirmed) {
          try {
              apiService.editarAgenda(cita)
                  .then(() => {
                      showAlert('success', 'Agendamiento eliminada correctamente');
                      listarAgenda();
                      document.getElementById('btn_cerrar').click();
                  })
                  .catch((e) => {
                      showAlert('error', 'No se pudo eliminar el Agendamiento');
                      console.error(e);
                  });
          } catch (error) {
              console.error('No se pudo eliminar el Agendamiento ' + error);
          }
      }
  });
}
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between py-3">
          <h1>Agenda</h1>
          <div className="d-flex gap-3">
            <button className="btn_verde" onClick={() => reporteExcel('Agenda')}>
              <i className="fa-solid fa-file-excel pe-2"></i>
              Reporte
            </button>
            <button
              className="btn_outline_moradoOscuro p-1"
              data-bs-toggle="modal"
              data-bs-target="#nuevoEditaAgenda"
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
                            <th className="text-center" scope="col">Persona</th>
                            <th className="text-center" scope="col">Manzana</th>
                            <th className="text-center" scope="col">Dirección</th>
                            <th className="text-center" scope="col">Fecha</th>
                            <th className="text-center" scope="col">Hora</th>
                            <th className="text-center" scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {agenda.map((i) => {
                        if (i.estado === 0) {
                            return (
                                <tr key={i.id_agenda}>
                                    <td>{i.persona.nombres_persona} {i.persona.apellidos_persona}</td>
                                    <td>{i.cita.manzana.nombre_manzana}</td>
                                    <td>{i.cita.manzana.direccion}</td>
                                    <td>{i.cita.dia_cita}</td>
                                    <td>{i.cita.hora_cita}</td>
                                    <td className='d-flex gap-2 justify-content-center'>
                                        <button
                                            className='btn btn-warning'
                                            onClick={() => openModal(
                                                2,
                                                i.id_agenda,
                                                i.id_cita_fk,
                                                i.id_persona_fk,
                                            )}
                                            data-bs-toggle="modal"
                                            data-bs-target="#nuevoEditaAgenda"
                                        >
                                            <i className='fa-solid fa-edit btnEditar color_blanco'></i>
                                        </button>
                                        <button className='btn btn-danger' onClick={() => eliminarAgenda(i.id_agenda)}>
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
        <div className="modal fade" id="nuevoEditaAgenda" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
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
                                    Persona:
                                </span>
                                <select
                                className="form-select"
                                value={id_persona_fk}
                                onChange={(e) => setId_persona_fk(e.target.value)}
                                >
                                <option value="" disabled>
                                    Seleccione una persona
                                </option>
                                {personas.map((i) => (
                                    <option key={i.id_persona} value={i.id_persona}>
                                    {i.nombres_persona} {i.apellidos_persona}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <div className="d-flex gap-2 inputsContainer">
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    Agendamiento:
                                </span>
                                <select
                                className="form-select"
                                value={id_cita_fk}
                                onChange={(e) => setId_cita_fk(e.target.value)}
                                >
                                <option value="" disabled>
                                    Seleccione uno ...
                                </option>
                                {citas.map((i) => (
                                    <option key={i.id_cita} value={i.id_cita}>
                                    {i.manzana.nombre_manzana} | {i.manzana.direccion} | {i.servicio.nombre_servicio} | {i.dia_cita} | {i.hora_cita}
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
      </div>
    </>
  );
};

export default Citas;
