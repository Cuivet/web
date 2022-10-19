import { basePATH } from "./config";

export var clinicalRecordService = {
    findAllByVeterinaryId: findAllByVeterinaryId
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