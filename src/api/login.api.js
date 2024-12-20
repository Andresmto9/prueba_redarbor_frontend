/**
 * Importación de la libreria axios para el consumo de servicios
 */
import axios from 'axios';

/**
 * Declaración de la URL base de consumo para los servicios
 */
const BASE_URL = 'http://localhost:5115/';

/**
 * Creación de la funcionalidad que realiza el consumo de todos los empleados existentes en el sistema
 * @returns Retorna el objeto de respuesta del consumo
 */
export const getEmpleado = (correo) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 1000,
        // headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.get(`/api/UsuariosModels/buscarPorEmail/${correo}`)
        .then(response => {
            return response;
        }).catch(function (error) {
            return Promise.reject(error);
        });

    return resp;
}