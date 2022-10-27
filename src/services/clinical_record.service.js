import { basePATH } from "./config";

export var clinicalRecordService = {
    findAllByVeterinaryId: findAllByVeterinaryId,
    updateClinicalRecord: updateClinicalRecord
}

async function findAllByVeterinaryId(veterinaryId) {
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