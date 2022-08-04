import React, {useState} from "react";
import { Layout } from "antd";

import "./LayoutBasic.scss"

export default function LayoutBasic(props){

    const {children}=props;
    const {Content, Footer, Header} = Layout;
    const [menuCollapsed, setMenuCollapsed] = useState(true);

    return (
        <Layout>
            <Layout className="layout-basic">
                {/* <Header className="layout-basic__header">
                </Header> */}
                <Content className="layout-basic__content">
                    {children}
                </Content>

            </Layout>
        </Layout>

    );
} 

