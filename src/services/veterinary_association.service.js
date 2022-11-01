import { basePATH } from "./config";

export var veterinaryAssociationService = {
    registerTemporalAssociation: registerTemporalAssociation,
    getTemporalAssociationByCode: getTemporalAssociationByCode,
    register: register,
    getAllByVeterinaryId: getAllByVeterinaryId,
    getAllDataByRegentOrVeterinary: getAllDataByRegentOrVeterinary,
    getAllCoVeterinariesDataByRegent: getAllCoVeterinariesDataByRegent
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

async function register(veterinaryAssociations){
    var axios = require('axios');
    return axios({
        method: "post",
        url: `${basePATH}/veterinary-association/register`,
        data: veterinaryAssociations,
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

async function getAllByVeterinaryId(veterinaryId){
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/veterinary-association/allByVeterinaryId/${veterinaryId}`,
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

async function getAllDataByRegentOrVeterinary(veterinaryId){
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/veterinary-association/allDataByRegentOrVeterinary/${veterinaryId}`,
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

async function getAllCoVeterinariesDataByRegent(veterinaryId){
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/veterinary-association/allCoVeterinariesDataByRegent/${veterinaryId}`,
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