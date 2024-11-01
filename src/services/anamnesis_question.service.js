import { basePATH } from "./config";

export var anamnesisQuestionService = {
    findAll: findAll
}

async function findAll() {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/anamnesis-question/all`,
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
