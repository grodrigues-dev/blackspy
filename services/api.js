import axios from 'axios';

const BASE_URL = 'https://blackspy.azurewebsites.net';

export function realizarLogin(body) {
    const response = axios.post(`${BASE_URL}/api/usuarios/auth`, body).catch(e => {
        return Promise.reject(e);
    });
    return response;
}

export function getServicos(token) {
    const response = axios.get(`${BASE_URL}/api/servico/buscarTodos`, {
        headers: {
            Authorization: token
        }
    }).catch(e => {
        return Promise.reject(e);
    });
    return response;
}

