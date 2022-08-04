import { Col, Divider, Row, Typography } from "antd";
import React from "react";
import Home from "../components/Home";

const {Title} = Typography;

export default function Landing(){
    return (
            <Row justify="center">
                <Col span={24}>
                    <Title className="landing__title">CUIVET<Divider className="landing__divider"></Divider></Title>
                    <Home></Home>
                </Col>
            </Row>

         );
};