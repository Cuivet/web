import { basePATH } from "./config";

export var complementaryStudiyTypeService = {
    findAll : findAll
}

async function findAll() {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/complementary-study-type/all`,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
    })
        .then((response) => {
            return response.data;
        })
}