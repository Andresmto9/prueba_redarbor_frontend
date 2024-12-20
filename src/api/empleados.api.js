import axios from 'axios';

const BASE_URL = 'http://localhost:5115/';

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

export const updateEmpleado = (arrEmple, ID) => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 1000,
        // headers: {'Authorization': `Token ${Cookies.get('cookie_token')}`}
    });

    const resp = instance.put(`/api/UsuariosModels/${ID}`, arrEmple)
        .then(response => {
            return response;
        }).catch(function (error) {
            return error;
        });

    return resp;
}

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

export const deleteMultiEmpleados = (arrEmpleID) => {
    console.log(arrEmpleID)
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

