import React from "react";
import {Row, Col, Typography} from 'antd'

import '../UserSettings/UserSettings.scss'
const {Title}= Typography;
export default function VetClinicSettings(){
    return (
        <Row>
            <Col xs={{ span: 24}} lg={{ span:12 ,offset:6 }}>
                <Title className="description-item__title">Mis Clinicas Veterinarias</Title>
            </Col>
        </Row>
    );
}