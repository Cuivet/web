import { Col, Row, Button, Drawer, Tooltip, Typography, Divider } from 'antd';
import React, { useState } from 'react';
import paw from "../../assets/img/png/paw.png";
import { PlusCircleOutlined } from '@ant-design/icons';
import RegisterPetForm from '../../components/RegisterPetForm';
import CardPet from '../../components/CardPet';
import { getPetsByTutorId } from '../../services/pet.service';
import './Pets.scss';

const { Title } = Typography;

export default function Pets(){
    const [isInit,setIsInit] = useState(false);
    const [pets,setPets] = useState([]);
    const profile = JSON.parse(sessionStorage.getItem('profile'));

    if (!isInit) {
        setIsInit(true);
        getPetsByTutorId(profile.tutor.id).then(response => {
            setPets(response);
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

    function Pet(){
        const renderPetList = [];
        pets.forEach(pet => {
            renderPetList.push(
                <CardPet item={pet.id} title={pet.name} popTitle={"¿Está seguro que desea borrar la mascota?" } img={paw} description={getAgeContent(pet.birth)}></CardPet>
            )
        });
        return renderPetList;
    };

    function getAgeContent(birth){
        var today = new Date();
        var birthDate = new Date(birth);
        var years = today.getFullYear() - birthDate.getFullYear();    
        if(years > 0){
            if (years === 1) {
                return years+" año";
            }
            return years+" años";
        }else {
            var months = today.getMonth() - birthDate.getMonth();
            if (months ===1){
                return months + " mes"

            }
            return months + " meses"
        }
    }

    const registeredPet = () => {
        setIsInit(false);
        setVisible(false);
    };

    return (
        <>
            <Row align="middle">
                <Col span={23}>
                    <Title className='appTitle'>Mis Mascotas</Title>
                </Col>
                <Col span={1}>
                    <Tooltip title="Asociar Veterinario" placement='right'>
                    <Button type='link' className="appButton" size='large' onClick={showDrawer} icon={<PlusCircleOutlined/>}/>
                    </Tooltip>
                </Col>
            </Row>

            <Divider></Divider>
            
            <Drawer title="Registrar nueva mascota" onClose={onClose} visible={visible} bodyStyle={{paddingBottom: 80}}>
                        <RegisterPetForm registeredPet={registeredPet}/>
            </Drawer>

            {pets.length ? 
            <Row>
                <Pet></Pet>
            </Row> 
            : null}
        </>
    );
};

