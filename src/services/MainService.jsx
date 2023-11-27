import axios from 'axios';
import { API_URL } from '../navigation/Constants';

export const login = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(API_URL+"/api/token/",data,{
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
        });
}

export const buscador = (data) => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL+"/api/juegos/buscar-nombres/?q="+data.q,{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer "+localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response);
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
        });
}
