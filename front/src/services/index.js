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

    registrarUsuario : async (usuario) => {
        try {
            console.log(usuario);
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
    
    registrarPersona : async (persona) => {
        try {
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

}

export default apiService;