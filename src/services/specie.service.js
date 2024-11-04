import { basePATH } from "./config";

export var specieService = {
    findAll: findAll,
    findSpeciesAndRaces:findSpeciesAndRaces
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

async function findSpeciesAndRaces() {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/specie/SpeciesAndRaces`,
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

