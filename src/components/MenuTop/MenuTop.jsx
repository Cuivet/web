import { Badge, Button, Tooltip } from "antd";
import AvatarUser from "../AvatarUser/AvatarUser";
import { Link } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from "@ant-design/icons";
import React from "react";
import CUIVET_logo from '../../assets/img/png/logo2.png';
import User from '../../assets/img/png/tutorUsuario.png'

import './MenuTop.scss'

export default function MenuTop(props){
    // console.log(props);
    const {menuCollapsed, setMenuCollapsed} = props;

    const users = [User, null];

    const logOut = e =>{
        sessionStorage.clear();
    };

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo"
                src={CUIVET_logo} 
                alt="Juan Frattin"
                />
                <Button type="link" icon={menuCollapsed? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
                    onClick={() => setMenuCollapsed(!menuCollapsed)}>
                    
                </Button>
            </div>
            <h3 className="menu-top__center">CUIVET</h3>
            <div className="menu-top__right">
                <Badge dot className="badge">
                    <AvatarUser icon={users[0]} preview={true}></AvatarUser>
                </Badge>
               
                <Tooltip title='Cerrar sesión' placement="left" color={'#5B2569'}>
                    <Link to='/login'>
                        <Button type="link" to='/login' onClick={logOut} icon={<LogoutOutlined /> }/>
                    </Link>
                </Tooltip>
            </div>
        </div>
    )
}