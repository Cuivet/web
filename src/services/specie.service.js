import { basePATH } from "./config";

export var specieService = {
    findAll: findAll
}

async function findAll() {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/specie/all`,
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
