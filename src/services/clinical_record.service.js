import { basePATH } from "./config";

export var clinicalRecordService = {
    findOneById: findOneById,
    findAllByVeterinaryId: findAllByVeterinaryId,
    registerClinicalRecord: registerClinicalRecord,
    updateClinicalRecord: updateClinicalRecord
}

async function findOneById(id) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/clinical-record/${id}`,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        })
};

export async function findAllByVeterinaryId(veterinaryId) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/clinical-record/allByVeterinaryId/${veterinaryId}`,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        })
};

async function registerClinicalRecord(clinicalRecord) {
    var axios = require('axios');
    return axios({
        method: "post",
        url: `${basePATH}/clinical-record`,
        data: clinicalRecord,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        })
};

async function updateClinicalRecord(data) {
    var axios = require('axios');
    return axios({
        method: "put",
        url: `${basePATH}/clinical-record/`,
        data: data,
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
};