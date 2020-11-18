import axios from 'axios';

const BASE_URL = 'https://blackspy-1605579865330.azurewebsites.net';

export function login(body) {
    return axios.post(`${BASE_URL}/api/usuarios/auth`, body).then(({data}) => {
        data
    }).catch(e => {
        e
    })
}