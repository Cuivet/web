import { basePATH } from "./config";

export var qualificationService = {
    findOneById: findOneById,
    findAllByTutorId: findAllByTutorId,
    // findAllByVeterinaryId: findAllByVeterinaryId,
    // registerClinicalRecord: registerClinicalRecord,
    // updateClinicalRecord: updateClinicalRecord
}

// async function findOneById(id) {
//     var axios = require('axios');
//     return axios({
//         method: "get",
//         url: `${basePATH}/qualification/findOneById/${id}`,
//         headers: {
//             "Content-Type": "application/json",
//             Accept: 'application/json',
//             "token": sessionStorage.getItem('token'),
//         }
//         })
//         .then((response) => {
//             return response.data;
//         })
// };

export function findOneById(id) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/qualification/${id}`,
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

export function findAllByTutorId(tutorId) {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/qualification/allByTutorId/${tutorId}`,
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


// export function registerQalification(data){
//     var axios = require('axios');
//     return axios({
//         method: "post",
//         url: `${basePATH}/pet/register`,
//         data: data,
//         timeout: 1000 * 5, // Wait for 5 seconds
//         headers: {
//             "Content-Type": "application/json",
//             Accept: 'application/json',
//             "token": sessionStorage.getItem('token'),
//         }
//         })
//         .then((response) => {
//             return response;
//         })
//         .catch((err) => {
//             return err;
//         });
// }

// export function getQualificationByVeterinaryId(veretinaryId) {
//     var axios = require('axios');
//     return axios({
//         method: "get",
//         url: `${basePATH}/pet/allByVeterinaryId/${veretinaryId}`,
//         timeout: 1000 * 5, // Wait for 5 seconds
//         headers: {
//             "Content-Type": "application/json",
//             Accept: 'application/json',
//             "token": sessionStorage.getItem('token'),
//         }
//         })
//         .then((response) => {
//             return response.data;
//         })
//         .catch((err) => {
//             return err;
//         });
// };


// export function deleteQualification(qualificationId) {
//     var axios = require('axios');
//     return axios({
//         method: "delete",
//         url: `${basePATH}/pet/${qualificationId}`,
//         timeout: 1000 * 5, // Wait for 5 seconds
//         headers: {
//             "Content-Type": "application/json",
//             Accept: 'application/json',
//             "token": sessionStorage.getItem('token'),
//         }
//         })
//         .then((response) => {
//             return response.data;
//         })
//         .catch((err) => {
//             return err;
//         });
// };

// export function getQualification(qualificationId) {
//     var axios = require('axios');
//     return axios({
//         method: "get",
//         url: `${basePATH}/qualification/${qualificationId}`,
//         timeout: 1000 * 5, // Wait for 5 seconds
//         headers: {
//             "Content-Type": "application/json",
//             Accept: 'application/json',
//             "token": sessionStorage.getItem('token')
//         }
//         })
//         .then((response) => {
//             return response;
//         })
//         .catch((err) => {
//             return err;
//         });
//   }