import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu} from "antd";
import { HomeOutlined, MenuOutlined, UnorderedListOutlined, LoginOutlined, SettingOutlined, QqOutlined } from '@ant-design/icons';

import './MenuSider.scss';
import MenuItem from "antd/lib/menu/MenuItem";

function getItem(label, key, to, icon, children, theme) {
    return {
      key,
      to,
      icon,
      children,
      label,
      theme,
    };
  }

export default function MenuSider(props){
    console.log(props);
    const {menuCollapsed} = props;
    const {Sider}= Layout;
    // const getItem = () => {

    // }

    // const items = [
    //     getItem('Inicio',"/menu",'1', <HomeOutlined/>),
    //     getItem()
    // //     admin{
    // //         key:'1',
    // //         to:'/menu',
    // //         icon: <HomeOutlined/>,
    // //         text: 'Home',
    // //     },

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
                <Menu.Item key="4"  >
                    <Link to={"/register-pet"} className='admin-sider__item'>
                        <QqOutlined />
                        <span className="nav-text"> Mascotas </span>
                    </Link>
                </Menu.Item>
                <Menu.SubMenu key={'sub1'} className="admin-sider__submenu" 
                    title={<> <SettingOutlined /><span className="nav-text">Configuración</span> </>}>
                    <Menu.Item key={"4"}>
                        <Link to={"/settings/user"} className='admin-sider__submenu-item'>                        
                            <span className="nav-text"> Cuenta</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={"5"}>
                        <Link to={"/"} className='admin-sider__submenu-item'>                        
                            <span className="nav-text"> Veterinaria</span>
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>

        </Sider>
    );
}