import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import apiService from "../services";

export function showAlert(i, title, text){
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:title,
        text:text,
        icon:i
    });
}

export const reporteExcel = (_modelo)=>{
    try {
        apiService.getReporte(_modelo)
            .then(()=>{
                showAlert('success', "Reporte Generado con exito")
            }).catch((e)=>{
                showAlert('error', "No se pudo generar el reporte")
                console.error(e);
            })
        } catch (error) {
            console.error("NO EXCEL");
        }
}