import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import CardMenu from "../../components/CardMenu";
import huella from "../../assets/img/jpg/Huella1.jpg";
import atencion from "../../assets/img/jpg/AtencionClinica.jpg";
import calendario from "../../assets/img/jpg/calendario.jpg";
import valorar from "../../assets/img/jpg/valorar.jpg";
import clinica from "../../assets/img/jpg/clinica.jpg";
import visitsReports from "../../assets/img/jpg/reportes.jpg";

import '../Settings/UserSettings/UserSettings.scss';

const {Title} = Typography;

export default function MenuWeb(){

    const profile = JSON.parse(sessionStorage.getItem('profile')) ;

    const veterinary = {
        module:['Ficha Clínica','Calendario','Mascotas asociadas', 'Reportes'],
        description:['Iniciar ficha clínica para la Mascota','Visualizá próximos eventos','Visualizá las mascotas asociadas','Visualizá tus reportes'],
        disabled:[false,true],
        img:[atencion,calendario,huella,visitsReports],
        routes:['/clinical-record-menu','/calendar','/pets-management','/vetQualification','/reports']
    };

    const tutor = {
        module:['Mis Mascotas','Calendario','Calificar Veterinarios','Historial Clínico',],
        description:['Visualizá tus Mascotas registradas','Visualizá próximos eventos','Registrá una calificación a tus Veterinarios asociados','Visualizá el Historial Clínico de tus Mascotas',],
        disabled:[false,true],
        img:[huella,calendario,valorar,atencion],
        routes:['/pets','/calendar','/qualification','/admin']
    };

    const vetOwner = {
        module:['Mis Clínicas Veterinarias','Calendario',],
        description:['Visualizá los datos de tu/s Veterinaria/s','Visualizá próximos eventos',],
        disabled:[false,true],
        img:[clinica,calendario,],
        routes:['/vets','/calendar']
    };

    function cantMod(){
        //definir modulos comunes en todos los perfiles, calendar por ejemplo
        let cards = {
            module: [],
            description:[],
            disabled: [false,true],
            img: [],
            routes:[]
        };
        // let flag = false;
        if(profile.tutor != null){
            cards.module.push(tutor.module);
            cards.description.push(tutor.description);
            cards.img.push(tutor.img);
            cards.routes.push(tutor.routes);
        }
        if(profile.veterinary != null){
            cards.module.push(veterinary.module);
            cards.description.push(veterinary.description);
            cards.img.push(veterinary.img);
            cards.routes.push(veterinary.routes);
        }
        if(profile.vetOwner!= null){
            cards.module.push(vetOwner.module);
            cards.description.push(vetOwner.description);
            cards.img.push(vetOwner.img);
            cards.routes.push(vetOwner.routes);
        }
        return cards;
    }

    //fijo 4 modulos por fila 
    function Mod(){
        const renderModules = [];
        for(let i = 0; i < cantMod().module[0].length; i++ ){
            renderModules.push(
                <Col xs={{span: 24 }} lg={{span: 6 }}>
                    <CardMenu kei={i}
                    route={cantMod().routes[0][i]}
                    text={cantMod().module[0][i]}
                    description={cantMod().description[0][i]}
                    disabled={cantMod().disabled[0]}
                    img={cantMod().img[0][i]}></CardMenu>
                </Col>
            )
        };               
        return renderModules;
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