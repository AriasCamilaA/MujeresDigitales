import axios from "axios";

const url = 'http://127.0.0.1:8000/api/';

const apiService = {
    getTiposDocumentos : async () => {
        try {
            const url_tipos_documentos = url + "tipo_documento/";
            const response = await axios.get(url_tipos_documentos);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: TIPOS DOCUMENTOS: "+error);
            throw error;
        }
        
    },
    getRoles : async () => {
        try {
            const url_roles = url + "Roles/";
            const response = await axios.get(url_roles);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: ROLES: "+error);
            throw error;
        }
        
    },

    registrarUsuario : async (usuario) => {
        try {
            usuario.estato = 0;
            const url_registrarUsuario = url + "usuarias/";
            const response = await axios.post(url_registrarUsuario, usuario);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR USUARIO: "+error);
            throw error;
        }
        
    },

    editarUsuario : async (usuario) => {
        try {
            const id = usuario.id_usuaria;
            const url_registrarUsuario = url + "usuarias/"+id+"/";
            const response = await axios.put(url_registrarUsuario, usuario);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: ACTUALIZAR USUARIO: "+error);
            throw error;
        }
        
    },
    
    getPersonas : async () => {
        try {
            const url_personas = url + "personas/";
            const response = await axios.get(url_personas);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: USUARIOS: "+error);
            throw error;
        }
        
    },

    registrarPersona : async (persona) => {
        try {
            persona.estado = 0;
            const url_registrarPersona = url + "personas/";
            const response = await axios.post(url_registrarPersona, persona);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR USUARIO: "+error);
            throw error;
        }
        
    },

    editarPersona : async (persona) => {
        try {
            const id = persona.id_persona;
            const url_registrarUsuario = url + "personas/"+id+"/";
            const response = await axios.put(url_registrarUsuario, persona);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: ACTUALIZAR PERSONA: "+error);
            throw error;
        }
        
    },

    getMunicipios : async () => {
        try {
            const url_municipios = url + "municipios/";
            const response = await axios.get(url_municipios);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: MUNICIPIOS: "+error);
            throw error;
        }
        
    },
    
    registrarMunicipio : async (municipio) => {
        try {
            municipio.estado = 0;
            const url_municipios = url + "municipios/";
            const response = await axios.post(url_municipios, municipio);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR MUNICIPIO: "+error);
            throw error;
        }
        
    },

    editarMunicipio : async (municipio) => {
        try {
            const id = municipio.id_municipio;
            const url_municipios = url + "municipios/"+id+"/";
            const response = await axios.put(url_municipios, municipio);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: ACTUALIZAR PERSONA: "+error);
            throw error;
        }
        
    },
    getCategoriasServicios : async () => {
        try {
            const url_servicios = url + "categorias_servicios/";
            const response = await axios.get(url_servicios);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: CATEGORÍA SERVICIOS: "+error);
            throw error;
        }
        
    },
    
    registrarCategoriaServicio : async (categoriaServicio) => {
        try {
            categoriaServicio.estado = 0;
            const url_servicios = url + "categorias_servicios/";
            const response = await axios.post(url_servicios, categoriaServicio);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR CATEGORÍA SERVICIO: "+error);
            throw error;
        }
        
    },

    editarCategoriaServicio : async (categoriaServicio) => {
        try {
            const id = categoriaServicio.id_categoria;
            const url_municipios = url + "categorias_servicios/"+id+"/";
            const response = await axios.put(url_municipios, categoriaServicio);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: ACTUALIZAR CATEGORÍA SERVICIO: "+error);
            throw error;
        }
        
    },

    getTiposServicios : async () => {
        try {
            const url_servicios = url + "tipos_servicios/";
            const response = await axios.get(url_servicios);
            const data = response.data;
            // console.log(data)
            return data;
        } catch (error) {
            console.error("API ERROR: TIPO SERVICIOS: "+error);
            throw error;
        }
        
    },
    
    registrarTipoServicio : async (tipoServicio) => {
        try {
            tipoServicio.estado = 0;
            const url_servicios = url + "tipos_servicios/";
            const response = await axios.post(url_servicios, tipoServicio);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR TIPO SERVICIO: "+error);
            throw error;
        }
        
    },

    editarTipoServicio : async (tipoServicio) => {
        try {
            const id = tipoServicio.id_tipo_servicio;
            const url_municipios = url + "tipos_servicios/"+id+"/";
            const response = await axios.put(url_municipios, tipoServicio);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: ACTUALIZAR TIPO SERVICIO: "+error);
            throw error;
        }
        
    },


}

export default apiService;