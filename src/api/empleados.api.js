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
export const getEmpleados = () => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 1000,
        // headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.get('/api/UsuariosModels/')
        .then(response => {
            return response;
        }).catch(function (error) {
           return error;
        });

    return resp;
}

/**
 * Creación de la funcionalidad que realiza el consumo para la creación de un empleado
 * @param {JSON} arrEmple Recibe por parametro el array del empleado a crear
 * @returns Retorna el objeto de respuesta del consumo
 */
export const setEmpleados = (arrEmple) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 1000,
        // headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.post('/api/UsuariosModels/', arrEmple)
        .then(response => {
            return response;
        }).catch(function (error) {
           return error;
        });

    return resp;
}

/**
 * Creación de la funcionalidad que realiza el consumo para consultar los datos de un empleado especifico
 * @param {int} id Recibe por parametro el ID del empleado a consultar
 * @returns Retorna el objeto de respuesta del consumo
 */
export const getEmpleadosID = (id) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 1000,
        // headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.get(`/api/UsuariosModels/${id}`)
        .then(response => {
            return response;
        }).catch(function (error) {
           return error;
        });

    return resp;
}

/**
 * Creación de la funcionalidad que realiza el consumo para actualizar el empleado segun su ID
 * @param {JSON} arrEmple Recibe por parametro el array de datos del empleado que se va actualizar
 * @param {int} id Recibe por parametro el ID del empleado que se va a actualizar
 * @returns Retorna el objeto de respuesta del consumo
 */
export const updateEmpleado = (arrEmple, id) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 1000,
        // headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.put(`/api/UsuariosModels/${id}`, arrEmple)
        .then(response => {
            return response;
        }).catch(function (error) {
           return error;
        });

    return resp;
}

/**
 * Creación de la funcionalidad que realiza el consumo para eliminar el empleado segun su ID
 * @param {int} id Recibe por parametro el ID del empleado que se va a aliminar
 * @returns Retorna el objeto de respuesta del consumo
 */
export const deleteEmpleado = (id) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 1000,
        // headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.delete(`/api/UsuariosModels/${id}`)
        .then(response => {
            return response;
        }).catch(function (error) {
           return error;
        });

    return resp;
}

/**
 * Creación de la funcionalidad que realiza el consumo para eliminar multiples empleados segun sus ID's
 * @param {JSON} arrEmpleID Recibe por parametro los ID's de los empleados que se van a eliminar
 * @returns Retorna el objeto de respuesta del consumo
 */
export const deleteMultiEmpleados = (arrEmpleID) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json'
        },
        // headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.delete(`/api/UsuariosModels/`, {
            data: arrEmpleID 
        })
        .then(response => {
            return response;
        }).catch(function (error) {
           return error;
        });

    return resp;
}

