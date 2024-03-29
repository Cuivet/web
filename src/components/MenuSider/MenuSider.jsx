import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Layout, Menu} from "antd";
import Icon, { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import PetsIcon from '@mui/icons-material/Pets';
import ScienceIcon from '@mui/icons-material/Science';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import FolderOpenOutlined from '@mui/icons-material/FolderOpenOutlined';
import './MenuSider.scss';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import {getAllByRegentId} from '../../services/vet.service';

export default function MenuSider(props){
   
    const {menuCollapsed} = props;
    const {Sider}= Layout;
    var tutor = false;
    var veterinary = false;
    var vetOwner = false;
    const [regent, setRegent] = useState(false);
    const [isInit, setIsInit] = useState(false);
    const profile = JSON.parse(sessionStorage.getItem('profile')) ;

    if(profile === undefined){
        tutor = false;
        vetOwner = false;
        veterinary = false;
    }; 

    if(profile.tutor != null){
        tutor= true;
    };

    if(profile.veterinary != null){
        veterinary = true;
    };

    if(profile.vetOwner != null){
        vetOwner = true;
    }; 
    
    if(!isInit){
        if (veterinary){
            getAllByRegentId(profile.veterinary.id)
            .then(res => {
                if (res.length !== 0) {
                    setRegent(true);
                };
            });
        };
        setIsInit(true);
    };

    return (
        <Sider trigger={null} collapsible className="admin-sider" collapsed={menuCollapsed} 
            style={{ 
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                zIndex:5
            }}>
            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}> 
                
                <Menu.Item key="menu">
                    <Link to={"/menu"} className='admin-sider__item'>
                        <HomeOutlined/>
                        <span className="nav-text"> Inicio </span>
                    </Link>
                </Menu.Item>

                { tutor ?   
                    <>
                        <Menu.Item key="tutorStudies">
                            <Link to={"/studies"} className='admin-sider__item'>                      
                                <Icon component={''}><ScienceIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Estudios </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="tutorPets">
                            <Link to={"/pets"} className='admin-sider__item'>                      
                                <Icon component={''}><PetsIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Mis Mascotas </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="tutorVeterinariesAssociations">
                            <Link to={"/veterinaries-associations"} className='admin-sider__item'>                      
                                <Icon component={''}><MedicalServicesOutlinedIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Veterinarios Asociados </span>
                            </Link>
                        </Menu.Item>
                    </> 
                : null}

                { veterinary ?
                    <>
                        <Menu.Item key="ClinicalRecordMenu">
                            <Link to={"/clinical-record-menu"} className='admin-sider__item'>                      
                                <Icon><ContentPasteOutlinedIcon /></Icon>
                                <span className="nav-text"> Ficha Clínica </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="veterinaryStudies">
                            <Link to={"/studies"} className='admin-sider__item'>                      
                                <Icon component={''}><ScienceIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Estudios </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="veterinaryClinicalRecordManagement">
                            <Link to={"/clinical-records-management"} className='admin-sider__item'>                      
                                <Icon component={''}><FolderOpenOutlined fontSize="small" /></Icon>
                                <span className="nav-text"> Historiales Clínicos </span>
                            </Link>
                        </Menu.Item>

                        { regent ?
                        <Menu.Item key="veterinaryVeterinariesManagement">
                            <Link to={"/veterinaries-management"} className='admin-sider__item'>                      
                                <Icon component={''}><PeopleAltOutlinedIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Gestión de Veterinarios </span>
                            </Link>
                        </Menu.Item>
                        : null }

                        <Menu.Item key="veterinaryPetsManagement">
                            <Link to={"/pets-management"} className='admin-sider__item'>                      
                                <Icon component={''}><PetsIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Mis Pacientes </span>
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="veterinaryVetsManagement">
                            <Link to={"/vets-associations"} className='admin-sider__item'>                      
                                <Icon component={''}><PersonPinCircleOutlinedIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Clínicas Asociadas </span>
                            </Link>
                        </Menu.Item>
                    </>
                : null }

                { vetOwner ? 
                    <>
                        <Menu.Item key="vetOwnerVeterinariesManagement">
                            <Link to={"/veterinaries-management"} className='admin-sider__item'>                      
                                <Icon component={''}><MedicalServicesOutlinedIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Mis Veterinarios </span>
                            </Link>
                        </Menu.Item>
                        
                        <Menu.Item key="vetOwnerVets">
                            <Link to={"/vets"} className='admin-sider__item'>                      
                                <Icon component={''}><PersonPinCircleOutlinedIcon fontSize="small" /></Icon>
                                <span className="nav-text"> Mis Clínicas </span>
                            </Link>
                        </Menu.Item>   
                    </> 
                : null}

                <Menu.Item key="user">
                    <Link to={"/settings/user"} className='admin-sider__item'>            
                        <SettingOutlined/>
                        <span className="nav-text"> Mi Cuenta </span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}