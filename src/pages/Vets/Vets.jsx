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
                         <CardPet item={vet.id }title={vet.name} popTitle={"¿Está seguro que desea borrar la clinica?"} img={redcross} description={vet.address}></CardPet>
                   
                )});
         };
         return renderVetList;
         
     };

    return (
        <>   
            <Row>
                <Col span={23}>
                    <Title className="appTitle">
                        Mis Clinicas Veterinarias                        
                        </Title>
                </Col>
                <Col span={1}>
                    <Tooltip title="Agregar clinica veterinaria" placement='right'>
                        <Button type='link' className="appButton" size='large' onClick={showDrawer} icon={<PlusCircleOutlined/>}/>
                    </Tooltip>
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

