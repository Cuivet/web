import React from "react";
import { Layout, Tooltip, Button } from "antd";
import { Link } from "react-router-dom";
import CUIVET_logo from '../../assets/img/png/logo2.png'

import "./LayoutLanding.scss"

export default function LayoutLanding(props){

    const {children}=props;
    const {Content, Footer, Header} = Layout;

    return (
        <Layout>
            <Layout className="layout-landing">
                <Header className="layout-landing__header">
                    <img className="layout-landing__left-logo"
                        src={CUIVET_logo} 
                        alt="Juan Frattin"
                        />
                    <div className="layout-landing__right">
                        <Link to={'/login'}>
                            <Tooltip arrowPointAtCenter title='Ingresar' placement="left" color={'#5B2569'}>
                                <Button type="text" className="layout-landing__right-btn">Ingresar</Button>
                            </Tooltip>
                        </Link>
                                                
                    </div>
                </Header>
                <Content className="layout-landing__content">
                    {children}
                </Content>
                <Footer >CUIVET by Proyecto Final</Footer>

            </Layout>
        </Layout>

    );
} 

