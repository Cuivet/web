import { basePATH } from "./config";

export function getTutorDataByDni(dni) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/tutor//tutorDataByDni/${dni}`,
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