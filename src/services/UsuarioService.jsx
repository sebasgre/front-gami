import axios from 'axios';
import { API_URL } from '../navigation/Constants';

export const getListaUsuarios = () => {
    return new Promise((resolve, reject) => {
    axios.get(API_URL+"/api/usuarios/",{
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

export const deleteUsuario = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(API_URL+"/api/usuarios/"+id+"/",{
            headers: {
                'Content-Type': 'application/json',
                "Authorization":  "Bearer "+localStorage.getItem('token')
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

export const getUsuario = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL+"/api/usuarios/"+id+"/",{
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

export const PostUser = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(API_URL+"/api/usuarios/",data,{
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

export const UpdateUser = (id,data) => {
    return new Promise((resolve, reject) => {
        axios.put(API_URL+"/api/usuarios/"+id+"/",data,{
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
