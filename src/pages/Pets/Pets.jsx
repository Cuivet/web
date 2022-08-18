import { Card, Col, Row, Button, Drawer, Space, Tooltip } from 'antd';
import React, {useState} from 'react';
import paw from "../../assets/img/png/paw.png";
import pet1 from "../../assets/img/png/pet2.png";
import pet2 from "../../assets/img/png/pet3.png"
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import RegisterPetForm from '../../components/RegisterPetForm';
import CardPet from '../../components/CardPet';
import User from '../../assets/img/png/tutorUsuario.png'

import './Pets.scss';

export default function Pets(){

    //completar con mascotas traidas de la base
    //una mascota puede tener muchos avatares (varios usuarios) [[],[]]
    const pets = {
        text:['Balú', 'Koda', 'Timoteo','Hooper', 'Tina', 'Malú','Lima', 'Duki'],
        description:['Ésta es una mascota'],
        disabled:[false,true],
        img:[paw,pet1, pet2,paw,pet1, pet2,paw,pet1, pet2],
        avatar: [User, [null,User,User], [null,User], [null,User], [null,User], [null,User], [null,User], null]
    }

    const pets2 = [];
    //para el drawer
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
      }; 
      const onClose = () => {
        setVisible(false);
      };   

    const cantPets = 8;

    function Pet(){
        const pet = [];
        //VER ESTO
        // pets2.array.forEach(pet => {
            
        // });
        
        // pets2.array.forEach(element => {
        //     console.log(element.text);
        // });
        
        for(let i = 0; i < pets.text.length; i++ ){
            pet.push(            
                <Col xs={{ span: 24}} lg={{ span: 6 }}>
                    <CardPet key={i} title={pets.text[i]} img={pets.img[i]} description={'prueba'} avatar={pets.avatar[i]}></CardPet>
                    {/* <Card title={pets.text[i]} bordered={true} cover={pets.img[0]} className="pet-card" hoverable disabled={pets.disabled[0]}
                    actions={[
                        <EditOutlined key="edit" />,
                        <DeleteOutlined key="delete" className='pets-card__actions'/>,
                    ]}
                    >Ésta es una mascota</Card> */}

                </Col>
            );      
        };
        return pet;
    };

    return (
        <div>
        {/* <Button icon={<PlusCircleOutlined />} size="large" className="pets__add-button" href={"/register-pet"}> Añadir Mascota
            <Link to={"/register-pet"}/>
        </Button> */}
        <Tooltip title="Nueva mascota" placement='right'>
            <Button className="pets__button-add" size='large' onClick={showDrawer} icon={<PlusOutlined />} />
        </Tooltip>
        
        <Drawer
            title="Registrar nueva mascota"
          
            onClose={onClose}
            visible={visible}
            bodyStyle={{
            paddingBottom: 80,
            }}
            extra={
            <Space>
                <Button className='pets__button-cancel' onClick={onClose}>Cancelar</Button>
                {/* <Button className="pets__button-register" onClick={onClose} >
                    Registrar
                </Button> */}
            </Space>
            }
        ><RegisterPetForm /></Drawer>

        <Row gutter={16} >
            <Pet></Pet>
        </Row> 
        </div>

    );
};

