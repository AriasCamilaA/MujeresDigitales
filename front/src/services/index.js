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

    getRegistrarUsuario : async (usuario) => {
        try {
            const url_registrarUsuario = url + "usuarias/";
            const response = await axios.post(url_registrarUsuario, usuario);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("API ERROR: REGISTRAR USUARIO: "+error);
            throw error;
        }
        
    },
    
    getRegistrarPersona : async (persona) => {
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
    

}

export default apiService;