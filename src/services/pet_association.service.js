import { basePATH } from "./config";

export function registerTemporalAssociation(data){
    var axios = require('axios');
    return axios({
        method: "post",
        url: `${basePATH}/pet-association/registerTemporalAssociation`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        });
}

export function getTemporalAssociationByCode(code){
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/pet-association/temporalAssociationByCode/${code}`,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        });
}

export function register(petAssociations){
    var axios = require('axios');
    return axios({
        method: "post",
        url: `${basePATH}/pet-association/register`,
        data: petAssociations,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        });
}

export function getAllByTutorId(tutorId){
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/pet-association/allByTutorId/${tutorId}`,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        });
}

export function getAllByVeterinaryId(veterinaryId){
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/pet-association/allByVeterinaryId/${veterinaryId}`,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        });
}

export function getAllByVetId(vetId){
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/pet-association/allByVetId/${vetId}`,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        });
}

export function deleteAssociationById(id) {
    var axios = require('axios');
    return axios({
        method: "delete",
        url: `${basePATH}/pet-association/${id}`,
        timeout: 1000 * 60,
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



