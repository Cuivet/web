import { Card, Col, Row, Button } from 'antd';
import React from 'react';
import paw from "../../assets/img/png/paw.png";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './Pets.scss';
import { Link } from "react-router-dom";



export default function Pets(){

    // //completar con mascotas traidas de la base
    const pets = {
        text:['Balú', 'Koda', 'Timoteo','Hooper', 'Tina', 'Malú','Lima', 'Duki'],
        description:['Ésta es una mascota'],
        disabled:[false,true],
        img:[<img alt="mascota" src={paw}></img>],
    }

    const cantPets = 8;

    function Pet(){
        const pet = [];
        for(let i = 0; i < cantPets; i++ ){
            pet.push(            
                <Col span={6}>
                    <Card title={pets.text[i]} bordered={true} cover={pets.img[0]} className="pet-card" hoverable disabled={pets.disabled[0]}
                    actions={[
                        <EditOutlined key="edit" />,
                        <DeleteOutlined key="delete" className='pet-card__actions'/>,
                    ]}
                    >Ésta es una mascota</Card>
                </Col>
            );      
        };
        return pet;
    };

    return (
        <div>
        <Button icon={<PlusCircleOutlined />} size="large" className="pets__add-button" href={"/register-pet"}> Añadir Mascota
            <Link to={"/register-pet"}/>
        </Button>
        <Row gutter={16} >
            <Pet></Pet>
        </Row> 
        </div>

    );
};

