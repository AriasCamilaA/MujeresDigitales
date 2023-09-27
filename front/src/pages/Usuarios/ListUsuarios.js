import { useEffect, useState } from 'react';
import apiService from "../../services";

const ListUsuarios = () => {

    const [usuarios, setUsuarios] = useState([]);

    const listarUsuarios = () => {
        try {
            apiService.getPersonas()
                .then((data)=>{
                    setUsuarios(data);
                    console.log(usuarios)
                }).catch((e)=>{
                    console.error(e);
                })
        } catch (error) {
            console.error("No se pueden cargar los Usuarios");
        }
    }

    useEffect(()=>{
        listarUsuarios();
    },[]);

    return (
    <div className="container">
        <div className="d-flex justify-content-between">
            <h1>Usuarios</h1>
            <button className="btn_outline_moradoOscuro ">+ Nuevo</button>
        </div>
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Tipo Doc</th>
                        <th scope="col">Número</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((user)=>{
                            <tr>
                                {/* <th>{user.tipo_documento.nombre_documento}</th> */}
                                <td>{user.id_persona}</td>
                                <td>{user.nombres_persona} {user.apellidos_personas}</td>
                                {/* <td>{user.usuaria.email}</td> */}
                                <td>{user.telefono_persona}</td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
        
    </div>
  )
}

export default ListUsuarios
