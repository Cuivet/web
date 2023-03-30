import { basePATH } from "./config";

export function signUpApi(data){
    var axios = require('axios');
    return axios({
        method: "post",
        url: `${basePATH}/user/register`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json'
        }
        })
        .then((response) => {
            return response;
        })
}

export function confirmSignUp(data){
    var axios = require('axios');
    return axios({
        method: "post",
        url: `${basePATH}/user/confirmRegister`,
        data: data,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json'
        }
        })
        .then((response) => {
            return response;
        })
}

export function getProfile() {
    var axios = require('axios');
    return axios({
        method: "get",
        url: `${basePATH}/user/profile`,
        timeout: 1000 * 5, // Wait for 5 seconds
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
            "token": sessionStorage.getItem('token')
        }
        })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        });
  }