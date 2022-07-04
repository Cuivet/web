import React, {useState} from "react";
import { Layout } from "antd";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider/MenuSider";
import AdminSignIn from '../pages/Admin/SignIn/SignIn';

import "./LayoutsAdmin.scss";
import { Navigate, Route } from "react-router-dom";
import Admin from "../pages/Admin";

export default function LayoutAdmin(props){
    const { children } = props;
    const { Header, Content, Footer } = Layout;
    const [menuCollapsed, setMenuCollapsed] = useState(true);

    const user = null;
    if(!user){
        return(
            <Navigate to="/admin/login" replace={true} />
        );
        
    }
    console.log(props);
    
    return (
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed}/>
            <Layout className="layout-admin">
                <Header className="layout-admin__header">
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                </Header>
                <Content className="layout-admin__content">
                    {children}
                </Content>
                <Footer className="layout-admin__footer">Juan Frattin</Footer>
            </Layout> 
        </Layout>

    );
}
