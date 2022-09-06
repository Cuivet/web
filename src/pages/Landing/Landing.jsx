import { Col, Divider, Row, Typography, Layout, Button, offset } from "antd";
import React from "react";
//import Home from "../../components/Home";
import CUIVET_logo from '../../assets/img/png/logo2.png'
import fondo from '../../assets/img/png/fondo3.jpg'
import {Link} from "react-router-dom";

import "./Landing.scss"

const { Title } = Typography;

export default function Landing() {
    const { Content, Footer, Header } = Layout;
    return (
        <div>
            <section>
                <img className="fondo"
                    src={fondo} 
                    alt="fondo"/>
                <Row>
                    <Col span={3}>
                        <img className="logo"
                            src={CUIVET_logo}
                            alt="logo"
                        />
                    </Col>
                    <Col offset={19} span={2}>
                        <Link to={'/login'}>
                            <Button className="btn">Ingresar</Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <h1 className="title">CUIVET</h1>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <h1 className="Secondary-title">Tu mascota se lo merece!</h1>
                    </Col>
                </Row>
            </section>
            {/* <section>
                <Row>
                    <Col span={24}>
                        <h1> aca va algo pero no se que hola </h1>
                    </Col>
                </Row>
            </section> */}
        </div>

    );
};