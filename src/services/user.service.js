import { basePATH } from "./config";

export function signUpApi(data){
    const url = `${basePATH}/user/register` 

    const params ={
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type":"application/json"
        }
    };
    console.log(data);

    fetch(url, params)
    .then(response =>{
        console.log(response);
        return response.json();
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