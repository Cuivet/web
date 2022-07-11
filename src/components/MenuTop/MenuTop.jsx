import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from "@ant-design/icons";
import React from "react";
import CUIVET_logo from '../../assets/img/png/logo.png';

import './MenuTop.scss'

export default function MenuTop(props){
    console.log(props);
    const {menuCollapsed, setMenuCollapsed} = props;
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
                <Button type="link" icon={<PoweroffOutlined />} />
            </div>
        </div>
    )
}