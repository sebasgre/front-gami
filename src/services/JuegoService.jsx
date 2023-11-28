import axios from 'axios';
import { API_URL } from '../navigation/Constants';

export const GetListaJuegos = () => {
    return new Promise((resolve, reject) => {
    axios.get(API_URL+"/api/juegos/",{
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

export const DeleteJuegos = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(API_URL+"/api/juegos/"+id+"/",{
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

export const GetJuegos = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL+"/api/juegos/"+id+"/",{
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

export const PostJuegos = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(API_URL+"/api/juegos/",data,{
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

export const PatchJuegos = (id,data) => {
    const formData = new FormData();
    if (data.foto !== undefined) {
        formData.append("foto", data.foto);
    }
    return new Promise((resolve, reject) => {
        axios.patch(API_URL+"/api/juegos/"+id+"/",data,{
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

export const UpdateJuegos = (id,data) => {
    return new Promise((resolve, reject) => {
        axios.put(API_URL+"/api/juegos/"+id+"/",data,{
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

