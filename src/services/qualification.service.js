import { basePATH } from "./config";
import axios from 'axios';

export var qualificationService = {
    findOneById: findOneById,
    findAllByClinicalRecordId: findAllByClinicalRecordId,
    findAllByTutorId:findAllByTutorId, 
    save:save
    // findAllByVeterinaryId: findAllByVeterinaryId,
    // registerClinicalRecord: registerClinicalRecord,
    // updateClinicalRecord: updateClinicalRecord
}


export function findOneById(id) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/qualification/${id}`,
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

export function findAllByClinicalRecordId(clinicalRecordId) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/qualification/allByClinicalRecordId/${clinicalRecordId}`,
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

export function findAllByTutorId(tutorId) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/qualification/allByTutorId/${tutorId}`,
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
// export function save(qualification) {
//     var axios = require('axios');
//     return axios({
//         method: "post",
//         url: `${basePATH}/qualification/save/${qualification}`,
//         timeout: 1000 * 5, // Wait for 5 seconds
//         headers: {
//             "Content-Type": "application/json",
//             Accept: 'application/json',
//             "token": sessionStorage.getItem('token'),
//         }
//         })
//         .then((response) => {
//             return response.data;
//         })
//         .catch((err) => {
//             return err;
//         });
// };

export function save(qualification) {
    return axios({
        method: "post",
        url: `${basePATH}/qualification/save`, // Solo la URL del endpoint
        timeout: 1000 * 5, // Espera 5 segundos
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        },
        data: JSON.stringify(qualification) // Enviar el objeto qualification en el cuerpo
    })
    .then((response) => {
        return response.data;
    })
    .catch((err) => {
        return err;
    });
}