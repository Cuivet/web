import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu} from "antd";
import { HomeOutlined, MenuOutlined, UnorderedListOutlined, LoginOutlined } from '@ant-design/icons';

import './MenuSider.scss';

export default function MenuSider(props){
    console.log(props);
    const {menuCollapsed} = props;
    const {Sider}= Layout;
    // const getItem = () => {

    // }

    // const items = [
    //     admin{
    //         key:'1',
    //         to:'/menu',
    //         icon: <HomeOutlined/>,
    //         text: 'Home',
    //     },

    // ]

    return (
        <Sider trigger={null} collapsible className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]} > 
                <Menu.Item key="1" >
                    <Link to={"/menu"} className='admin-sider__item' >
                        <HomeOutlined />
                        <span className="nav-text"> Inicio</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" >
                    <Link to={"/login"}  className='admin-sider__item'>
                        <LoginOutlined />
                        <span className="nav-text"> Login</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3"  >
                    <Link to={"/admin"} className='admin-sider__item'>
                        <UnorderedListOutlined />
                        <span className="nav-text"> Consulta</span>
                    </Link>
                </Menu.Item>
            </Menu>

        </Sider>
    );
}