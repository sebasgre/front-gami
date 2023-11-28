import axios from 'axios';
import { API_URL } from '../navigation/Constants';

export const GetListaGeneros = () => {
    return new Promise((resolve, reject) => {
    axios.get(API_URL+"/api/generos/",{
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


export const DeleteGeneros = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(API_URL+"/api/generos/"+id+"/",{
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

export const GetGeneros = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL+"/api/generos/"+id+"/",{
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

export const PostGeneros = (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("imagen", data.imagen);
    return new Promise((resolve, reject) => {
        axios.post(API_URL+"/api/generos/",formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
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

export const UpdateGeneros = (id,data) => {
    const formData = new FormData();

    formData.append("nombre", data.nombre);
    if (data.imagen !== undefined) {
        formData.append("imagen", data.imagen);
    }
    return new Promise((resolve, reject) => {
        axios.put(API_URL+"/api/generos/"+id+"/",formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
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

