import { basePATH } from "./config";

export var qualificationService = {
    findOneById: findOneById,
    findAllByClinicalRecordId: findAllByClinicalRecordId,
    findAllByTutorId:findAllByTutorId
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

