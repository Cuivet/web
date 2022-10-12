import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import CardMenu from "../../components/CardMenu";
import clipboard from "../../assets/img/jpg/clipboard.jpg";
import huella from "../../assets/img/jpg/Huella1.jpg";
import atencion from "../../assets/img/jpg/AtencionClinica.jpg";
import calendario from "../../assets/img/jpg/calendario.jpg";
import valorar from "../../assets/img/jpg/valorar.jpg";
import clinica from "../../assets/img/jpg/clinica.jpg";
import '../Settings/UserSettings/UserSettings.scss';
import {Link} from "react-router-dom";

const {Title} = Typography;

export default function MenuWeb(){

    const profile = JSON.parse(sessionStorage.getItem('profile')) ;
    // console.log(profile);
    
    const vet = ['Atención Clínica','Calendario','Ficha Clínica'];
    const tutor = ['Mis Mascotas','Calendario','Valorar Veterinarios','Historial Clínico'];
    const vetOwner = ['Veterinaria','Calendario'];
    // const test = "Hola";

    function cantMod(){
        //definir modulos comunes en todos los perfiles
        let mod_text = [];
        // let flag = false;
        if(profile.tutor != null){
            mod_text.push(tutor);
        }
        if(profile.veterinary != null){
            mod_text.push(vet);
        }
        if(profile.vetOwner!= null){
            mod_text.push(vetOwner);
        }
        // console.log(mod_text); 
        return mod_text;
    }

    //completar con datos traidos de la base
    const modulesVet = {
        text:['Atención Clínica','Calendario','Ficha Clínica',],
        description:['Iniciar Atención Clínica a la Mascota','Visualizá próximos eventos','Ver esta, se repite para mi',],
        disabled:[false,true],
        img:[atencion,calendario,clipboard,],
        routes:['/admin','/admin','/admin'],
    }

    const modulesTut = {
        text:['Mis Mascotas','Calendario','Valorar Veterinarios','Historial Clínico',],
        description:['Visualizá tus Mascotas registradas','Visualizá próximos eventos','Registrá una reseña a tus Veterinarios asociados','Visualizá el Historial Clínico de tus Mascotas',],
        disabled:[false,true],
        img:[huella,calendario,valorar,atencion],
        routes:['/admin','/admin','/admin'],
    }

    const modulesVetOw = {
        text:['Veterinaria','Calendario',],
        description:['Visualizá los datos de tu/s Veterinaria/s','Visualizá próximos eventos',],
        disabled:[false,true],
        img:[clinica,calendario,],
    }

    //fijo 4 modulos por fila 
    function Mod(){
        const mod = [];
        for(let i = 0; i < cantMod()[0].length; i++ ){
            if(profile.veterinary){
                console.log(modulesVet.text[i]);
                mod.push(            
                    <Col xs={{ span: 24}} lg={{ span: 6 }}>
                        <CardMenu key={i} text={cantMod()[0][i]} description={modulesVet.description[i]} disabled={modulesVet.disabled[0]} img={modulesVet.img[i]}><Link to={modulesVet.routes[i]}>Hace click</Link></CardMenu>
                    </Col>
                ); 
            }
            if(profile.tutor){
                console.log(modulesTut.text[i]);
                mod.push(            
                    <Col xs={{ span: 24}} lg={{ span: 6 }}>
                        <CardMenu key={i} text={cantMod()[0][i]} description={modulesTut.description[i]} disabled={modulesTut.disabled[0]} img={modulesTut.img[i]}></CardMenu>
                    </Col>
                ); 
            }
            if(profile.vetOwner){
                console.log(modulesVetOw.text[i]);
                mod.push(            
                    <Col xs={{ span: 24}} lg={{ span: 6 }}>
                        <CardMenu key={i} text={cantMod()[0][i]} description={modulesVetOw.description[i]} disabled={modulesVetOw.disabled[0]} img={modulesVetOw.img[i]} ></CardMenu>
                    </Col>
                ); 
            }
        };               
        return mod;
    };

    return (
        <Row>
            <Col span={24}>
                <Title className="appTitle">Inicio</Title>
            </Col>
            <Divider></Divider>
            <Mod></Mod>
        </Row> 
        
    )
};