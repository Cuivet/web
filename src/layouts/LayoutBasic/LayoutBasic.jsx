import React from "react";
import { Layout } from "antd";

import "./LayoutBasic.scss"

export default function LayoutBasic(props){

    const {children}=props;
    const {Content} = Layout;

    return (
        <Layout>
            <Layout className="layout-basic">
                <Content className="layout-basic__content">
                    {children}
                </Content>
            </Layout>
        </Layout>

    );
} 

