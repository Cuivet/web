import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Layout, Menu} from "antd";
import Icon, { HomeOutlined, MenuOutlined, UnorderedListOutlined, LoginOutlined, SettingOutlined, QqOutlined } from '@ant-design/icons';
import PetsIcon from '@mui/icons-material/Pets';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

// import createSvgIcon from '@material-ui';

import './MenuSider.scss';


function getItem(label, key, link, icon, children, theme) {
    return {
      key,
      link,
      icon,
      children,
      label,
      theme,
    };
  }

export default function MenuSider(props){
   
    const {menuCollapsed} = props;
    const {Sider}= Layout;
    var tutor = false;
    var veterinary = false;
    var vetOwner = false;

    const profile = JSON.parse(sessionStorage.getItem('profile')) ;

    if(profile.tutor != null){
        tutor= true;
    };
    if(profile.veterinary != null){
        veterinary = true;
    };
    if(profile.vetOwner != null){
        vetOwner = true;
    };
   if(profile === undefined){
        tutor = false;
        vetOwner = false;
        veterinary = false;
    };

    //como hacer el ruteo pasandolo por items
    const items = [
        getItem('Inicio','1', <Link to={"/menu"}></Link>, <HomeOutlined/>),
        getItem('Consulta','3', <Link to={'/test'}  className='admin-sider__item'></Link>,<UnorderedListOutlined />),
        getItem('Mascotas','4',  <PetsIcon fontSize="small" />, <Link to={'/register-pet'}  className='admin-sider__item'></Link>),
        getItem('Configuracion','/test2','sub1', <SettingOutlined />,[
            getItem('Usuario','/settings/user','5'),
            getItem('Veterinario','/settings/vet','6'),
            
        ])
    ];
    // const menu = {
    //     label:['Inicio', 'Consulta','Mascotas', 'Configuracion', 'Usuario'],
    //     route: ["/menu","/test","/register-pet","/settings","/settings/user"],
    //     icon: [<HomeOutlined/>, <UnorderedListOutlined />, <PetsIcon fontSize="small" />, <SettingOutlined />],
    //     key: ['1','2','3','sub1','4','5']
    // }
  
    return (
        <Sider trigger={null} collapsible className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]} > 
                {/* <Test></Test> */}
                
                <Menu.Item key="1" >
                    <Link to={"/menu"} className='admin-sider__item' >
                        <HomeOutlined />
                        <span className="nav-text"> Inicio</span>
                    </Link>
                </Menu.Item>
                { veterinary ? <>
                    <Menu.Item key="3"  >
                        <Link to={"/admin"} className='admin-sider__item'>
                            <UnorderedListOutlined />
                            <span className="nav-text"> Consulta</span>
                        </Link>
                    </Menu.Item>
                </>: null}                
                { tutor ? <>
                        <Menu.Item key="4"  >
                            <Link to={"/pets"} className='admin-sider__item'>                      
                                <Icon component={''}><PetsIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Mascotas </span>
                            </Link>
                        </Menu.Item>
                    </> : null}
                <Menu.SubMenu key={'sub1'} className="admin-sider__submenu" 
                    title={<> <SettingOutlined /><span className="nav-text">Configuración</span> </>}>
                    <Menu.Item key={"5"}>
                        <Link to={"/settings/user"} className='admin-sider__submenu-item'>                        
                            <span className="nav-text"> Cuenta</span>
                        </Link>
                    </Menu.Item>
                    {vetOwner ? <> <Menu.Item key={"6"}>
                        <Link to={"/"} className='admin-sider__submenu-item'>                        
                            <span className="nav-text"> Veterinaria</span>
                        </Link>
                    </Menu.Item>                    
                    </> : null}
                    
                </Menu.SubMenu>
            </Menu>

        </Sider>
    );
}