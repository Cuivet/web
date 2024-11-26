import { basePATH } from "./config";

export var raceService = {
    findAll: findAll,
    findByRaceId : findByRaceId
}

async function findAll() {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/race/all`,
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

async function findByRaceId(raceId) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/race/all`,
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

