import { basePATH } from "./config";

export function registerVet(data){
    var axios = require('axios');
    return axios({
        method: "post",
        url: `${basePATH}/vet/`,
        data: data,
        timeout: 1000 * 5, // Wait for 5 seconds
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
}

export function getVetsByVetOwnerId(vetOwnerId) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/vet/allByVetOwnerId/${vetOwnerId}`,
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