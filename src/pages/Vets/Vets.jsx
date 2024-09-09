import React, { useState } from 'react';
import { getVetsByVetOwnerId } from '../../services/vet.service';
import {Row, Col, Typography, Tooltip, Button, Drawer, Divider} from 'antd';
import{PlusCircleOutlined} from '@ant-design/icons';
import clinica from '../../assets/img/jpg/clinica.jpg';
import CardPet from "../../components/CardPet";
import RegisterVetForm from "../../components/RegisterVetForm/RegisterVetForm";

const {Title}= Typography;

export default function Vets(){
    const [isInit, setIsInit] = useState(false);
    const [vets, setVets] = useState([]);
    const [visible, setVisible] = useState(false);
    const profile = JSON.parse(sessionStorage.getItem('profile'));

    if (!isInit) {
        setIsInit(true);
        getVetsByVetOwnerId(profile.vetOwner.id)
        .then(response => {
            setVets(response);
        });
    }
    
    const showDrawer = () => {
        setVisible(true);
    }; 

    const onClose = () => {
        setVisible(false);
    }; 
    
    function Vet(){
        const renderVetList = [];
        if (vets.length) {
            vets.forEach(vet => {
                renderVetList.push(                     
                    <CardPet key={vet.vet.id} item={vet.vet.id} title={vet.vet.name} popTitle={"¿Está seguro que desea borrar la clínica?"} img={vet.vet.photo ? vet.vet.photo : clinica} description={vet.vet.address}></CardPet>
                )
            });
        };
        return renderVetList;
    };

    return (
        <>   
            <Row>
                <Col span={22}>
                    <Title className="appTitle">
                        Mis Clínicas Veterinarias                        
                        </Title>
                </Col>
                <Col span={2}>
                    <Tooltip title="Agregar clínica veterinaria" placement='right'>
                        <Button type='link' className="appButton" size='large' onClick={showDrawer} icon={<PlusCircleOutlined/>}/>
                    </Tooltip>
                </Col>
            </Row>
            <Divider></Divider>
            <Drawer title="Registrar nueva clínica veterinaria"          
                    onClose={onClose}
                    visible={visible}
                    bodyStyle={{
                    paddingBottom: 80}}>
                <RegisterVetForm>
                </RegisterVetForm>
            </Drawer>
            {vets.length ? (
                <Row>
                <Vet></Vet>
                </Row>
            ) : <> Aún no tienes clínicas veterinarias registradas </>
            }
        </>
    );
};

