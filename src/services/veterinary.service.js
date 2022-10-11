import { basePATH } from "./config";

export function getVeterinaryDataByMP(mp) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/veterinary/VeterinaryDataByMP/${mp}`,
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