import React, {useState, useEffect} from "react";
import { Select, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from "@ant-design/icons";
import CUIVET_logo from '../../assets/img/png/logo2.png';

import './MenuTop.scss'

export default function MenuTop(props){
    // console.log(props);
    const {menuCollapsed, setMenuCollapsed} = props;
    const [isVet, setIsVet]=useState(false);
    const profile = JSON.parse(sessionStorage.getItem('profile'));
    
    useEffect(()=>{
        if(profile.veterinary != null){
            setIsVet(true);
        };
    }, [profile.veterinary]);

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
                {
                    isVet ?
                    <Select placeholder='Siempre deberia estar seleccionada una opción' defaultValue='1' className="menu-top__right-select">
                    <Select.Option value='1'>Atención como Particular</Select.Option>
                    <Select.Option value='2'>Patitas del Sur</Select.Option>
                    <Select.Option value='3'>Mundo Animal</Select.Option>
                    </Select>
                    :
                    null
                }
            
                <Tooltip title='Cerrar sesión' placement="left" color={'#5B2569'}>
                    <Link to='/login'>
                        <Button type="link" to='/login' onClick={logOut} icon={<LogoutOutlined /> }/>
                    </Link>
                </Tooltip>
            </div>
        </div>
    )
}