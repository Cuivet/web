import { basePATH } from "./config";

export function registerTemporalAssociation(data){
    var axios = require('axios');
    return axios({
        method: "post",
        url: `${basePATH}/pet-association/registerTemporalAssociation`,
        data: data,
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
            return err; //podriamos hacer que falle voluntariamente si llega un 'errorMessage:' asi usamos el catch (VER DESPUES)
        });
}