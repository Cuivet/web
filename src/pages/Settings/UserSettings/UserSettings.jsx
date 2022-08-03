import React from "react";
import {Layout, Row, Col, Descriptions,Typography, Button, Tooltip  } from "antd";
import {EditOutlined  } from "@ant-design/icons";

import './UserSettings.scss'

const {Title} = Typography;

export default function UserSettings(){
    const user = {
        name: "Juan",
        lastname: "Frattin",
        phone: "456789",
        dni: "24356789",
        address: "adsadadmsalndlnasld"
    };
    const label = ['Nombre','Apellido','Teléfono','DNI','Dirección'];
    // console.log(user);

    function Items(){
        console.clear();   
        console.log(user)     
        const item = [];
        let sum = 0;
        for(var i of Object.keys(user)){
           
            console.log(i + " : "+ user[i]);
            // console.log(Object.keys(user));
            item.push(                        
                <Descriptions bordered>
                    <Descriptions.Item key={sum} label={label[sum]} span={3} className="description-item">{user[i]}</Descriptions.Item>
                </Descriptions>
                
            );  
            sum = sum + 1;            
        };              
        return item;
    };

    return (
        <>
        <Row>
            <Col span={18} offset={3}>
                <Title className="description-item__title">Información del Usuario <Tooltip title='Editar' placement="top" color={'#5B2569'}>
                    <Button type="link" className="description-item__button" icon={<EditOutlined /> }/>
                </Tooltip></Title>
                
            </Col>
        </Row>
        <Row>
            <Col span={18} offset={3}>                
                    <Items></Items>
            </Col>
        </Row>
        </>
        
    )
};
