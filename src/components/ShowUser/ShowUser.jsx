import React from "react";
import { Col,  Row, Typography, Tooltip } from "antd";

import './ShowUser.scss'

const {Title, Paragraph} =Typography;


export default function ShowUser(props){
    const {name, lastName, dni, phone, address, email} = props;
    return(
        <Row>
            <Col xs={{span: 24}}>
                <Row>
                    <Col xs={{span: 24}}md={{span: 2}}>
                        <Title level={5}>Nombre:</Title>
                    </Col>
                    <Col  xs={{span: 24}}md={{span: 22}}>
                    <Tooltip title="Haz click aquí para editar">
                        <Title level={5}><Paragraph className="show-item" type="secondary" level={3} editable={{triggerType:['text']}} >{name}</Paragraph></Title>
                    </Tooltip>
                    </Col>
                </Row>
            </Col>
            <Col xs={{span: 24}}>
                <Row>
                    <Col xs={{span: 24}}md={{span: 2}}>
                        <Title level={5}>Apellido:</Title>
                    </Col>
                    <Col  xs={{span: 24}}md={{span: 22}}>
                    <Tooltip title="Haz click aquí para editar">
                        <Title level={5}><Paragraph className="show-item" type="secondary" level={3} editable={{triggerType:['text']}} >{lastName}</Paragraph></Title>
                    </Tooltip>
                    </Col>
                </Row>
            </Col>
            <Col xs={{span: 24}}>
            <Row>
                    <Col xs={{span: 24}}md={{span: 2}}>
                        <Title level={5}>Teléfono:</Title>
                    </Col>
                    <Col  xs={{span: 24}}md={{span: 22}}>
                    <Tooltip title="Haz click aquí para editar">
                        <Title level={5}><Paragraph className="show-item" type="secondary" level={3} editable={{triggerType:['text']}} >{phone}</Paragraph></Title>
                    </Tooltip>
                    </Col>
                </Row>
            </Col>
            <Col xs={{span: 24}}>
            <Row>
                    <Col xs={{span: 24}}md={{span: 2}}>
                        <Title level={5}>DNI:</Title>
                    </Col>
                    <Col  xs={{span: 24}}md={{span: 22}}>
                    <Tooltip title="Haz click aquí para editar">
                        <Title level={5}><Paragraph className="show-item" type="secondary" level={3} editable={{triggerType:['text']}} >{dni}</Paragraph></Title>
                    </Tooltip>
                    </Col>
                </Row>
            </Col>
            <Col xs={{span: 24}}>
            <Row>
                    <Col xs={{span: 24}}md={{span: 2}}>
                        <Title level={5}>Dirección:</Title>
                    </Col>
                    <Col  xs={{span: 24}}md={{span: 22}}>
                    <Tooltip title="Haz click aquí para editar">
                        <Title level={5}><Paragraph className="show-item" type="secondary" level={3} editable={{triggerType:['text']}} >{address}</Paragraph></Title>
                    </Tooltip>
                    </Col>
                </Row>
            </Col>
            <Col xs={{span: 24}}>
            <Row>
                    <Col xs={{span: 24}}md={{span: 4}}>
                        <Title level={5}>Correo Electrónico:</Title>
                    </Col>
                    <Col  xs={{span: 24}}md={{span: 20}}>
                    <Tooltip title="Haz click aquí para editar">
                        <Title level={5}><Paragraph className="show-item" type="secondary" level={3} editable={{triggerType:['text']}} >{email}</Paragraph></Title>
                    </Tooltip>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
       
}