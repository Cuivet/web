import { basePATH } from "./config";

export function registerPet(data){
    const url = `${basePATH}/pet/register` 
    const params ={
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type":"application/json",
        },
    };
    fetch(url, params)
    .then(response => {
      return response.json();
      //console.log(response);
    })    
};

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
