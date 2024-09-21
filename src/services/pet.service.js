import { basePATH } from "./config";

export function registerPet(data){
    var axios = require('axios');
    return axios({
        method: "post",
        url: `${basePATH}/pet/register`,
        data: data,
        timeout: 1000 * 5, // Wait for 5 seconds
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
}

export function getPetsByTutorId(tutorId) {
    var axios = require('axios');
    console.log(sessionStorage.getItem('token'));
    return axios({
        method: "get",
        url: `${basePATH}/pet/allByTutorId/${tutorId}`,
        timeout: 1000 * 5, // Wait for 5 seconds
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
       
};


export function deletePet(petId) {
    var axios = require('axios');
    return axios({
        method: "delete",
        url: `${basePATH}/pet/${petId}`,
        timeout: 1000 * 5, // Wait for 5 seconds
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err;
        });
};

export function getPet(petId) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/pet/${petId}`,
        timeout: 1000 * 5, // Wait for 5 seconds
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token')
        }
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
  }