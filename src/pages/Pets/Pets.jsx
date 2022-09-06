import { Col, Row, Button, Drawer, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import paw from "../../assets/img/png/paw.png";
import { PlusCircleOutlined } from '@ant-design/icons';
import RegisterPetForm from '../../components/RegisterPetForm';
import CardPet from '../../components/CardPet';
import { getPetsByTutorId } from '../../services/pet.service';
import './Pets.scss';

const { Title } = Typography;

export default function Pets(){

    const [pets,setPets] = useState([]);
    
    const profile = JSON.parse(sessionStorage.getItem('profile'));

    if (!pets.length) {
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

        if (pets.length) {
            pets.forEach(pet => {
                renderPetList.push(
                    <Col xs={{ span: 24}} lg={{ span: 6 }}>
                        <CardPet item={pet.id }title={pet.name} img={paw} description={getAgeContent(pet.birth)}></CardPet>
                    </Col>
                )
            });
        }
        return renderPetList;
    };

    function getAgeContent(birth){
        var today = new Date();
        var birthDate = new Date(birth);
        var age = today.getFullYear() - birthDate.getFullYear();    
        return age+" anios";
    }

    return (
        <div>
        <Row >
            <Col span={24} offset={""}>
                <Title className='pets__title'>
                Mascotas 
                {/* <Affix offsetTop={80}> */}
                    <Tooltip title="Agregar mascota" placement='right'>
                        <Button type='link' className="pets__button-add" size='large' onClick={showDrawer} icon={<PlusCircleOutlined  />} />
                    </Tooltip>
                {/* </Affix> */}
                </Title>
            </Col>
        </Row>
        
        
        <Drawer
            title="Registrar nueva mascota"
          
            onClose={onClose}
            visible={visible}
            bodyStyle={{
            paddingBottom: 80,
            }}
        ><RegisterPetForm /></Drawer>

        <Row gutter={16} >
            <Pet></Pet>
        </Row> 
        </div>
    );
};

