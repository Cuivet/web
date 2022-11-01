import { basePATH } from "./config";
 
export var personService = {
    update: update
}
 
async function update(person) {
    var axios = require('axios');
    return axios({
        method: "put",
        url: `${basePATH}/person`,
        data: person,
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
