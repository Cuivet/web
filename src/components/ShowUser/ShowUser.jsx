import React from "react";
import { Col, Divider, Row, Typography, Tooltip } from "antd";
import {CheckOutlined, EditOutlined} from "@ant-design/icons";

import './ShowUser.scss'

const {Title, Paragraph} =Typography;


export default function ShowUser(props){
    const {name, lastName, dni, phone,address, email} = props;
    return(
        <Row>

            <Col xs={{span: 24}}>
                {/* <Title level={4}>Nombre: </Title> */}
                <Divider orientation="left">Nombre</Divider>
                <Tooltip title="Haz click aquí para editar">
                <Paragraph className="show-item" type="secondary" level={5} editable={{triggerType:['text']}}>{name}</Paragraph>
                </Tooltip>
            </Col>
            <Col xs={{span: 24}}>
                <Divider orientation="left">Apellido</Divider>
                <Tooltip title="Haz click aquí para editar">
                <Paragraph className="show-item" type="secondary" level={5} editable={{triggerType:['text']}}>{lastName}</Paragraph>
                </Tooltip>
            </Col>
            <Col xs={{span: 24}}>
                <Divider orientation="left">Teléfono</Divider>
                <Tooltip title="Haz click aquí para editar">
                <Paragraph className="show-item" type="secondary" level={5} editable={{triggerType:['text']}}>{phone}</Paragraph>
                </Tooltip>
            </Col>
            <Col xs={{span: 24}}>
                <Divider orientation="left">DNI</Divider>
                <Tooltip title="Haz click aquí para editar">
                <Paragraph className="show-item" type="secondary" level={5} editable={{triggerType:['text']}}>{dni}</Paragraph>
                </Tooltip>
            </Col>
            <Col xs={{span: 24}}>
                <Divider orientation="left">Dirección</Divider>
                <Tooltip title="Haz click aquí para editar">
                <Paragraph className="show-item" type="secondary" level={5} editable={{triggerType:['text']}}>{address}</Paragraph>
                </Tooltip>
            </Col>
            <Col xs={{span: 24}}>
            <Divider orientation="left">Correo Electrónico</Divider>
                <Tooltip title="Haz click aquí para editar">
                <Paragraph className="show-item" type="secondary" level={5} editable={{triggerType:['text']}}>{email}</Paragraph>
                </Tooltip>
            </Col>
        </Row>
    )
       
}