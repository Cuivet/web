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