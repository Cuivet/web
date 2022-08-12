import React from "react";
import {Layout, Row, Col, Descriptions,Typography, Button, Tooltip  } from "antd";
import RegisterPetForm from "../../components/RegisterPetForm";



import './RegisterPet.scss'

export default function RegisterPet(){
    const {Content} = Layout;
    const {Title} = Typography;

    return (
        <Layout className="register-pet">
            <Content className="register-pet__content">
                <Title className="register-pet__content__title">Registrar Mascota </Title>
                    <RegisterPetForm/>
            </Content>
        </Layout>        
    );
}

