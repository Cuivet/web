import React,{useState} from "react";
import {Row, Col, Typography, Tooltip, Button, Drawer, Space} from 'antd';
import{PlusCircleOutlined} from '@ant-design/icons';
import clinic from '../../../assets/img/jpg/clinic.jpg';

import '../UserSettings/UserSettings.scss'
import CardPet from "../../../components/CardPet";
const {Title}= Typography;
export default function VetClinicSettings(){
    const clinic ={
        id:12313123,
        name:'Boderau',
        address:'Av. Boderau 1231'
    };
    //para el drawer
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    }; 
    const onClose = () => {
        setVisible(false);
    }; 
    const [clinics, setClinics]=useState([]);

    if (!clinics.length){
        //metodo de carga de las clinicas
    };
    
    function VetClinic(){
        const renderVetClinicList = [];
        if (clinics.length){
            clinics.forEach(clinic => {
                renderVetClinicList.push(
                    <Col xs={{ span: 24}} lg={{ span: 6 }}>
                        <CardPet item={clinic.id }title={clinic.name} img={clinic} description={clinic.address}></CardPet>
                    </Col>)
            });
        };
        
    };
    return (
        <>
            <Row>
                <Col xs={{ span: 24}} lg={{ span:12 ,offset:6 }}>
                    <Title className="description-item__title">
                        Mis Clinicas Veterinarias
                        <Tooltip title="Agregar clinica veterinaria" placement='right'>
                            <Button type='link' className="pets__button-add" size='large' onClick={showDrawer} icon={<PlusCircleOutlined  />} />
                        </Tooltip>
                        </Title>
                </Col>
            </Row>
            <Drawer
            title="Registrar nueva clinica veterinaria"
          
            onClose={onClose}
            visible={visible}
            bodyStyle={{
            paddingBottom: 80,
            }}
        ></Drawer>
        <Row>
            <VetClinic></VetClinic>
        </Row>
        </>
        
        
    );
}