import React, { useState } from 'react';
import { getVetsByVetOwnerId } from '../../services/vet.service';
import {Row, Col, Typography, Tooltip, Button, Drawer, Divider} from 'antd';
import{PlusCircleOutlined} from '@ant-design/icons';
// import clinic from '../../assets/img/jpg/clinic.jpg';
import redcross from '../../assets/img/jpg/red-cross.jpg';
// import '../UserSettings/UserSettings.scss'
import CardPet from "../../components/CardPet";
import RegisterVetForm from "../../components/RegisterVetForm/RegisterVetForm";

const {Title}= Typography;

export default function Vets(){
    const [isInit, setIsInit] = useState(false);
    const [vets, setVets] = useState([]);
    // const [work, setWork] = useState(false);
    const profile = JSON.parse(sessionStorage.getItem('profile'));

    if (!isInit) {
        setIsInit(true);
        getVetsByVetOwnerId(profile.vetOwner.id)
            .then(response => {
                setVets(response);
            });
    }

    // function registerMockVet(){
    //     const newVet = {
    //         name: "Nueva Vet",
    //         phone: "351",
    //         address: "Recta Nueva",
    //         photo: "november.com",
    //         vetOwnerId: profile.vetOwner.id
    //     }
    //     registerVet(newVet)
    //         .then( res => {
    //             setWork(true);
    //         });
    // };
    
     //para el drawer
     const [visible, setVisible] = useState(false);
     const showDrawer = () => {
         setVisible(true);
     }; 
     const onClose = () => {
         setVisible(false);
     }; 

     
     function Vet(){
         const renderVetList = [];
         if (vets.length){
             vets.forEach(vet => {
                renderVetList.push(                     
                         <CardPet item={vet.id }title={vet.name} img={redcross} description={vet.address}></CardPet>
                   
                )});
         };
         return renderVetList;
         
     };

    return (
        <>   
            {/* Estamos en la vista para crear veterinarias
            <Vet></Vet>
            <Button type="primary" onClick={registerMockVet}>Registrar nuevo veterinaria</Button>
            {work ? 
                <div> Usuario Registrado! </div>
                : null} */}

            <Row>
                <Col span={24}>
                    <Title className="appTitle">
                        Mis Clinicas Veterinarias
                        <Tooltip title="Agregar clinica veterinaria" placement='right'>
                            <Button type='link' className="pets__button-add" size='large' onClick={showDrawer} icon={<PlusCircleOutlined  />} />
                        </Tooltip>
                        </Title>
                </Col>
            </Row>
            <Divider></Divider>
            <Drawer
            title="Registrar nueva clinica veterinaria"          
            onClose={onClose}
            visible={visible}
            bodyStyle={{
            paddingBottom: 80,
            }}
        ><RegisterVetForm></RegisterVetForm></Drawer>
        <Row>
            <Vet></Vet>
        </Row>
        </>
    );
};

