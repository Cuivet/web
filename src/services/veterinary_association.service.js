import { basePATH } from "./config";

export var veterinaryAssociationService = {
    registerTemporalAssociation: registerTemporalAssociation,
    getTemporalAssociationByCode: getTemporalAssociationByCode,
    // register: register,
    // getAllByTutorId: getAllByTutorId,
    // getAllByVeterinaryId: getAllByVeterinaryId
}

async function registerTemporalAssociation(data){
    var axios = require('axios');
    return axios({
        method: "post",
        url: `${basePATH}/veterinary-association/registerTemporalAssociation`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        });
}

async function getTemporalAssociationByCode(code){
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/veterinary-association/temporalAssociationByCode/${code}`,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token'),
        }
        })
        .then((response) => {
            return response.data;
        });
}

// async function register(petAssociations){
//     var axios = require('axios');
//     return axios({
//         method: "post",
//         url: `${basePATH}/pet-association/register`,
//         data: petAssociations,
//         headers: {
//             "Content-Type": "application/json",
//             Accept: 'application/json',
//             "token": sessionStorage.getItem('token'),
//         }
//         })
//         .then((response) => {
//             return response.data;
//         });
// }

// async function getAllByTutorId(tutorId){
//     var axios = require('axios');
//     return axios({
//         method: "get",
//         url: `${basePATH}/pet-association/allByTutorId/${tutorId}`,
//         headers: {
//             "Content-Type": "application/json",
//             Accept: 'application/json',
//             "token": sessionStorage.getItem('token'),
//         }
//         })
//         .then((response) => {
//             return response.data;
//         });
// }

// async function getAllByVeterinaryId(veterinaryId){
//     var axios = require('axios');
//     return axios({
//         method: "get",
//         url: `${basePATH}/pet-association/allByVeterinaryId/${veterinaryId}`,
//         headers: {
//             "Content-Type": "application/json",
//             Accept: 'application/json',
//             "token": sessionStorage.getItem('token'),
//         }
//         })
//         .then((response) => {
//             return response.data;
//         });
// }

