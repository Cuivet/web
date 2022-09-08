import React, { useState } from 'react';
import { getVetsByVetOwnerId, registerVet } from '../../services/vet.service';
import { Button } from 'antd';

export default function Vets(){
    const [isInit, setIsInit] = useState(false);
    const [vets, setVets] = useState([]);
    const [work, setWork] = useState(false);
    const profile = JSON.parse(sessionStorage.getItem('profile'));

    if (!isInit) {
        setIsInit(true);
        getVetsByVetOwnerId(profile.vetOwner.id)
            .then(response => {
                setVets(response);
            });
    }

    function Vet(){
        const renderVetList = [];
        if (vets.length) {
            vets.forEach(vet => {
                renderVetList.push(
                    <div>
                        <p1>{vet.name}</p1> <br></br>
                        <p1>{vet.phone}</p1> <br></br>
                        <p1>{vet.address}</p1> <br></br>
                        <p1>{vet.photo}</p1> <br></br>
                        <p1>{vet.vetOwnerId}</p1> <br></br>
                    </div>
                )
            });
        }
        return renderVetList;
    };

    function registerMockVet(){
        const newVet = {
            name: "Nueva Vet",
            phone: "351",
            address: "Recta Nueva",
            photo: "november.com",
            vetOwnerId: profile.vetOwner.id
        }
        registerVet(newVet)
            .then( res => {
                setWork(true);
            });
    };

    return (
        <>   
            Estamos en la vista para crear veterinarias
            <Vet></Vet>
            <Button type="primary" onClick={registerMockVet}>Registrar nuevo veterinaria</Button>
            {work ? 
                <div> Usuario Registrado! </div>
                : null}
        </>
    );
};

