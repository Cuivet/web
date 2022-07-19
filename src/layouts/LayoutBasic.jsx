import React from "react";
import { Layout } from "antd";


export default function LayoutBasic(props){
    const {children}=props;
    const {Content, Footer} = Layout;
    return (
        <Layout>
            <Layout>
                <Content>{children}</Content>
                <Footer>Footer: CUIVET</Footer>
            </Layout>
        </Layout>

    );
} 

