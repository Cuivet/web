import React from "react";
import { Col, Divider, Row, Typography } from "antd";
import {CheckOutlined, EditOutlined} from "@ant-design/icons";

import './ShowUser.scss'

const {Title, Paragraph} =Typography;


export default function ShowUser(props){
    const {name, lastName, dni, phone,address, email} = props;
    return(
        <Row>
            <Col xs={{span: 24}} lg={{span:12, offset:6}}>
                {/* <Title level={4}>Nombre: </Title> */}
                <Divider orientation="left" plain>Nombre</Divider>
                <Paragraph 
                    className="show-item" 
                    type="secondary" 
                    level={5} 
                    editable={{
                        tooltip: `Editar Nombre`,
                        enterIcon: <EditOutlined />,
                        triggerType:['text']}}>{name}</Paragraph>
            </Col>
            <Col xs={{span: 24}} lg={{span:12, offset:6}}>
                <Divider orientation="left">Apellido</Divider>
                <Paragraph className="show-item" type="secondary" level={5} editable={{triggerType:['text','icon']}}>{lastName}</Paragraph>
            </Col>
            <Col xs={{span: 24}} lg={{span:12, offset:6}}>
                <Divider orientation="left">Telefono</Divider>
                <Paragraph className="show-item" type="secondary" level={5} editable={{triggerType:['text','icon']}}>{phone}</Paragraph>
            </Col>
            <Col xs={{span: 24}} lg={{span:12, offset:6}}>
                <Divider orientation="left">D.N.I.</Divider>
                <Paragraph className="show-item" type="secondary" level={5} editable={{triggerType:['text','icon']}}>{dni}</Paragraph>
            </Col>
            <Col xs={{span: 24}} lg={{span:12, offset:6}}>
                <Divider orientation="left">Direccion</Divider>
                <Paragraph className="show-item" type="secondary" level={5} editable={{triggerType:['text','icon']}}>{address}</Paragraph>
            </Col>
            <Col xs={{span: 24}} lg={{span:12, offset:6}}>
                <Divider orientation="left">Email</Divider>
                <Paragraph className="show-item" type="secondary" level={5} editable={{triggerType:['text','icon']}}>{email}</Paragraph>
            </Col>
        </Row>
    )
       
}