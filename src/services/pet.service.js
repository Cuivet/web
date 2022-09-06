import { basePATH } from "./config";

export function registerPet(data){
    var axios = require('axios');
    return axios({
        method: "post",
        url: `${basePATH}/pet/register`,
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

export function getPetsByTutorId(tutorId) {
    const url = `${basePATH}/pet/all/${tutorId}`;
    return fetch(url).then(response => {
        return response.json();
    }).catch((err) => {
        return err;
    });
};

export function deletePet(petId){
    const url = `${basePATH}/pet/${petId}` 
    const params ={
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
        },
    };
    fetch(url, params).then(response => {
      return response.json();
    }).catch((err) => {
        return err;
    });
};
