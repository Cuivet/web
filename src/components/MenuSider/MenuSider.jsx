import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu} from "antd";
import Icon, { HomeOutlined, SettingOutlined, SnippetsOutlined } from '@ant-design/icons';
import PetsIcon from '@mui/icons-material/Pets';
import ScienceIcon from '@mui/icons-material/Science';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import './MenuSider.scss';

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
  
    return (
        <Sider trigger={null} collapsible className="admin-sider" collapsed={menuCollapsed}>
            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}> 
                
                <Menu.Item key="1">
                    <Link to={"/menu"} className='admin-sider__item'>
                        <HomeOutlined/>
                        <span className="nav-text"> Inicio </span>
                    </Link>
                </Menu.Item>

                { tutor ?   
                    <>
                        <Menu.Item key="2">
                            <Link to={"/admin"} className='admin-sider__item'>                      
                                <Icon component={''}><ScienceIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Estudios </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="3">
                            <Link to={"/pets"} className='admin-sider__item'>                      
                                <Icon component={''}><PetsIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Mis mascotas </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="4">
                            <Link to={"/veterinaries-associations"} className='admin-sider__item'>                      
                                <Icon component={''}><MedicalServicesOutlinedIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Veterinarios Asociados </span>
                            </Link>
                        </Menu.Item>
                    </> 
                    : null}

                { veterinary ?
                    <>
                        <Menu.Item key="5">
                            <Link to={"/admin"} className='admin-sider__item'>                      
                                <SnippetsOutlined/>
                                <span className="nav-text"> Consultas </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="6">
                            <Link to={"/admin"} className='admin-sider__item'>                      
                                <Icon component={''}><ScienceIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Estudios </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="7">
                            <Link to={"/pets-management"} className='admin-sider__item'>                      
                                <Icon component={''}><PetsIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Mis Pacientes </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="8">
                            <Link to={"/vets-associations"} className='admin-sider__item'>                      
                                <Icon component={''}><PersonPinCircleOutlinedIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Veterinarias Asociadas </span>
                            </Link>
                        </Menu.Item>
                    </>
                    : null }

                { vetOwner ? 
                    <>
                        <Menu.Item key="9">
                            <Link to={"/veterinaries-management"} className='admin-sider__item'>                      
                                <Icon component={''}><MedicalServicesOutlinedIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Mis Veterinarios </span>
                            </Link>
                        </Menu.Item>
                        
                        <Menu.Item key="10">
                            <Link to={"/vets"} className='admin-sider__item'>                      
                                <Icon component={''}><PersonPinCircleOutlinedIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Mis Clinicas </span>
                            </Link>
                        </Menu.Item>   
                    </> 
                    : null}

                <Menu.Item key="11">
                    <Link to={"/settings/user"} className='admin-sider__item'>            
                        <SettingOutlined/>
                        <span className="nav-text"> Perfil </span>
                    </Link>
                </Menu.Item>
            </Menu>

        </Sider>
    );
}