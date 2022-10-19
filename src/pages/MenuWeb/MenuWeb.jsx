import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import CardMenu from "../../components/CardMenu";
import clipboard from "../../assets/img/jpg/clipboard.jpg";
import '../Settings/UserSettings/UserSettings.scss';

const {Title} = Typography;

export default function MenuWeb(){

    const profile = JSON.parse(sessionStorage.getItem('profile')) ;
    
    //verificar nombres de los modulos
    const veterinary = {
        module: ['Consulta','Calendario','Ficha Clinica'],
        description: [''],
        img: [clipboard],
        routes:['/admin','/calendar','/admin']
    };
    const tutor = {
        module:  ['Mascotas','Calendario','Valorar','Historial Clinico'],
        description: [''],
        img: [clipboard],
        routes:['/pets','/calendar','/value','/admin']
    };
    const vetOwner = {
        module: ['Veterinaria','Calendario'],
        description: [''],        
        img: [clipboard],
        routes:['/vets','/calendar']
    };

    function cantMod(){
        //definir modulos comunes en todos los perfiles, calendar por ejemplo
        let cards = {
            module: [],
            description:['Modulo del sistema'],
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
                <Col xs={{ span: 24}} lg={{ span: 6 }}>
                    <CardMenu key={i} 
                    route={cantMod().routes[0][i]} 
                    text={cantMod().module[0][i]} 
                    description={cantMod().description[0]} 
                    disabled={cantMod().disabled[0]} 
                    img={cantMod().img[0]} ></CardMenu>
                </Col>
            ); 
        }                
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